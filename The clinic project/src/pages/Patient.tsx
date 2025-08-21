import axios from "axios";
import { useEffect, useState } from "react"
import { toast } from "react-toastify";



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
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        nationalCode: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: 1,
        address: "",
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

    const addPatient = async () => {
        try {
        await axios.post("https://nowruzi.top/api/Clinic/patients", formData)
        setShowForm(false)
        setFormData({
            firstName: "",
            lastName: "",
            nationalCode: "",
            phoneNumber: "",
            dateOfBirth: "",
            gender: 1,
            address: "",}
        )
        toast.success("بیمار با موفقیت اضافه شد")
        getPatients()
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
            console.log("حطا در جست جو" , error);
            
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
                            <div className="grid grid-cols-3 gap-3">
                                <input placeholder="نام"
                                        value={formData.firstName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, firstName: e.target.value })
                                        } 
                                        className="border rounded p-2"/>
                                <input placeholder="نام خانوادگی"
                                        value={formData.lastName}
                                        onChange={(e) =>
                                            setFormData({ ...formData, lastName: e.target.value })
                                        } 
                                        className="border rounded p-2"/>
                                <input placeholder="کد ملی"
                                        value={formData.nationalCode}
                                        onChange={(e) =>
                                            setFormData({ ...formData, nationalCode: e.target.value })
                                        } 
                                        className="border rounded p-2"/>
                                <input placeholder="شماره تماس"
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phoneNumber: e.target.value })
                                        } 
                                        className="border rounded p-2"/>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={formData.dateOfBirth}
                                        onChange={(e) =>
                                        setFormData({ ...formData, dateOfBirth: e.target.value })
                                        }
                                        className="border rounded p-2  w-full placeholder-transparent peer"
                                        placeholder="تاریخ تولد"
                                    />
                                    <label className="absolute right-9 top-2.5 text-gray-500 text-sm pointer-events-none transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                        تاریخ تولد
                                    </label>
                                </div>


                                <select
                                    value={formData.gender}
                                    onChange={(e) =>
                                        setFormData({ ...formData, gender: Number(e.target.value) })
                                    }
                                    className="border p-2 rounded"
                                    >
                                    <option value={1}>مرد</option>
                                    <option value={2}>زن</option>
                                    </select>
                                <textarea
                                placeholder="آدرس"
                                value={formData.address}
                                onChange={(e) =>
                                    setFormData({ ...formData, address: e.target.value })
                                }
                                className="border p-2 rounded col-span-2"
                                />
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