import axios from "axios";
import { useEffect, useState } from "react"
import { ToastContainer , toast } from "react-toastify";
import { useForm } from "react-hook-form";



export default function Patient(){
    const [isLoggedIn, setIsLoggedIn] = useState(false);
     const checkLoginStatus = () => {
        const userId = localStorage.getItem("userId");
        const fullName = localStorage.getItem("fullName");
        if (userId && fullName) {
        setIsLoggedIn(true);
        } else {
        setIsLoggedIn(false);
        }
    };

    useEffect(() => {
    checkLoginStatus();
    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("loginStatusChanged", checkLoginStatus);
    return () => {
        window.removeEventListener("storage", checkLoginStatus);
        window.removeEventListener("loginStatusChanged", checkLoginStatus);
    };
    }, []);

    const [showForm, setShowForm] = useState(false);


     const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        } = useForm({
            defaultValues: {
            firstName: "",
            lastName: "",
            nationalCode: "",
            phoneNumber: "",
            dateOfBirth: "",
            gender: 1,
            address: "",
            },
        });

    const [searchTerm, setSearchTerm] = useState("");

    const [patients, setPatients] = useState([]);
    // const [editingPatient, setEditingPatient] = useState(null);

    const getPatients = async () => {
        try {
        const response = await axios.get("https://nowruzi.top/api/Clinic/patients");
        setPatients(response.data)
        } catch (error) {
            console.log("خطا در گرفتن بیماران" , error);
            
        }
    }

    const addPatient = async (data:any) => {
        try {
        await axios.post("https://nowruzi.top/api/Clinic/patients", data)
        toast.success("بیمار با موفقیت اضافه شد")
        getPatients()
        reset()
        setShowForm(false);
        } catch (error) {
            console.log("خطا در اضافه کردن بیمار", error);
            
        }
    }
    const searchPatient = async (prms : any) => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/patients/search",
        {
          params: {
            SearchTerm: prms,
          },
        })
        setPatients(response.data)
        } catch (error) {
            console.log("خطا در جست جو" , error);
            
        }
    }

    useEffect(() => {
        if (searchTerm.trim() === "") {
            getPatients();
        }else {
            searchPatient(searchTerm)
        }
    })


    const patDelete = async (id: number) => {
        try {
        await axios.delete(`https://nowruzi.top/api/Clinic/patients/${id}`);
        getPatients();
        toast.success("بیمار با موفقیت حذف شد");
        } catch (error) {
        toast.error(error.response.data);
        console.log( "خطا در حذف" , error.response.data);
        }
    };


    return(
        <>
        <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
            <div className="relative max-w-6xl mx-auto ">
                <div className={`p-6 space-y-8  text-right " ${!isLoggedIn ? "blur-sm pointer-events-none" : ""} ` } dir="rtl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">لیست بیماران</h1>
                        <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                        + افزودن بیمار
                        </button>
                    </div>
                    {/* header patient form */}
                    {showForm && (
                        <div className="rounded-lg mb-3 p-3">
                            <form onSubmit={handleSubmit(addPatient)}>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="flex flex-col">
                                    <input
                                        placeholder="نام"
                                        {...register("firstName", { required: "نام الزامی است" })}
                                        className="border p-2 rounded"
                                    />
                                    {errors.firstName && (
                                        <span className="text-red-500 text-xs mt-1">
                                        {errors.firstName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        placeholder="نام خانوادگی"
                                        {...register("lastName", { required: "نام خانوادگی الزامی است" })}
                                        className="border p-2 rounded"
                                    />
                                    {errors.lastName && (
                                        <span className="text-red-500 text-xs mt-1">
                                        {errors.lastName.message}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <input
                                        placeholder="کد ملی"
                                        {...register("nationalCode", {
                                        required: "کد ملی الزامی است",
                                        minLength: { value: 10, message: "حداقل باید 10 کاراکتر باشد" },
                                        maxLength: { value: 10, message: "حداکثر باید 10 کاراکتر باشد" }
                                        
                                        })}
                                        className="border p-2 rounded"
                                    />
                                    {errors.nationalCode && (
                                        <span className="text-red-500 text-xs mt-1">
                                        {errors.nationalCode.message}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-col">  
                                    <input
                                        placeholder="شماره تماس"
                                        {...register("phoneNumber", {
                                        required: "شماره تماس الزامی است",
                                        minLength:{
                                            value:11,
                                            message: "حداقل باید 11 کاراکتر باشد",
                                        },
                                        
                                        pattern: {
                                            value: /^09\d{9}$/,
                                            message: "شماره باید با 09 شروع شود و 11 رقم باشد",
                                        },
                                        })}
                                        className="border p-2 rounded"
                                    />
                                    {errors.phoneNumber && (
                                        <span className="text-red-500"> {errors.phoneNumber.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        {...register("dateOfBirth", { required: "تاریخ تولد الزامی است" })}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder="تاریخ تولد"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                        تاریخ تولد
                                    </label>

                                    {errors.dateOfBirth && (
                                        <span className="text-red-500 text-sm">{errors.dateOfBirth.message}</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <select
                                        {...register("gender", { required: "انتخاب جنسیت الزامی است" })}
                                        className="border p-2 rounded"
                                    >
                                        <option value={1}>مرد</option>
                                        <option value={2}>زن</option>
                                    </select>
                                </div>
                                <div className="relative col-span-2">
                                    <textarea
                                        placeholder="آدرس"
                                        {...register("address", { required: "آدرس الزامی است" })}
                                        className="border p-2 rounded w-full peer"
                                    />

                                    {errors.address && (
                                        <span className="text-red-500 text-sm">{errors.address.message}</span>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={ addPatient}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                        >
                                        افزودن
                                        </button>
                                        <button
                                        onClick={() => setShowForm(false)}
                                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                                        >
                                        انصراف
                                    </button>
                                </div>   
                            </div>
                            </form>
                        </div>
                        
                    )}

                    {/* search*/}
                    <div className="mb-3    ">
                        <input
                        type="text"
                        placeholder="جست و جوی بیمار مورد نظر"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border border-gray-400 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-700"
                        />
                    </div>

                    {/* table  */}
                    <div className="bg-white rounded-lg shadow">
                        <table className="w-full text-black-500 text-sm ">
                        <thead className="bg-green-400">
                            <tr>
                            <th className="px-4 py-3 text-right">#</th>
                            <th className="px-4 py-3 text-right">نام کامل</th>
                            <th className="px-4 py-3 text-right">کد ملی</th>
                            <th className="px-4 py-3 text-right">شماره تماس</th>                         
                            <th className="px-4 py-3 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients.map((patient: any, index: number) => (
                            <tr key={patient.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3">{index + 1}</td>
                                <td className="px-4 py-3">{patient.fullName}</td>
                                <td className="px-4 py-3">{patient.nationalCode}</td>
                                <td className="px-4 py-3">{patient.phoneNumber}</td>
                                
                                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                                {/* <button
                                    onClick={() => handleEdit(patient)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    ویرایش
                                </button> */}
                                <button
                                    onClick={() => patDelete(patient.id)}
                                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                                >
                                    حذف
                                </button>
                                </td>
                            </tr>
                            ))}

                        </tbody>
                        </table>
                    </div>
                </div>
                {/* Overlay when not logged in */}
                {!isLoggedIn && (
                    <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 text-center">
                        <h2 className="text-xl font-bold mb-2">⚠️ باید ابتدا وارد شوید</h2>
                        <p className="text-gray-600">لطفاً از منوی بالا وارد حساب کاربری خود شوید</p>
                    </div>
                    </div>
                )}
            </div>
        </>
    )
}