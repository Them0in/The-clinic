import axios from "axios";
import {useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import {ToastContainer , toast } from "react-toastify/unstyled";



export default function Doctors(){
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




    const [docs , setDocs] = useState([])
    const [searchTerm, setSearchTerm] = useState("");
    const [showForm, setShowForm] = useState(false);
    
    const [speci , setSpeci] = useState([])


    const [formData, setFormData] = useState({
        specialtyId: 0,
        firstName: "",
        lastName: "",
        medicalLicenseNumber: "ML00",
        phoneNumber: "09",
        gender: 1,
    });
    

    const getDocs = async () => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/doctors")
            setDocs(response.data)
        } catch (error) {
            console.log("خطا در بارگزاری دکترها" , error);
            
        }
    }

    const searchDocs = async (prms: any) => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/doctors/search",
            {
            params: {
                SearchTerm: prms,
            },
            })
            setDocs(response.data)
        } catch (error) {
            console.log("خطا در یافتن دکترها" , error);
            
        }
        
    }


    const addDocs = async () => {
        try {
            await axios.post("https://nowruzi.top/api/Clinic/doctors", formData)
            setShowForm(false)
            setFormData({
                specialtyId: 0,
                firstName: "",
                lastName: "",
                medicalLicenseNumber: "ML00",
                phoneNumber: "09",
                gender: 1,}
            )
            getDocs()
            toast.success("دکتر با موفقیت اضافه شد")

        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data);
            
        }

    }
    
    useEffect(() => {
    if (searchTerm.trim() === "") {
        getDocs();
        } else {
        searchDocs(searchTerm);
        }
    }, [searchTerm]);

    const deleteDocs = async(id:number) => {
        try {
        await axios.delete(`https://nowruzi.top/api/Clinic/doctors/${id}`);
        getDocs();
        toast.success("بیمار با موفقیت حذف شد");
        } catch (error) {
        toast.error(error.response.data);
        console.log( "خطا در حذف" , error.response.data);
        }
    }

    const getSpeci = async () => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/specialties")
            setSpeci(response.data)
        } catch (error) {
            
        }

    }
    useEffect(() => {
        getSpeci();
    }, []);

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
                                <input placeholder="شماره نظام پزشکی"
                                        value={formData.medicalLicenseNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, medicalLicenseNumber: e.target.value })
                                        } 
                                        className="border rounded p-2"/>
                                <input placeholder="شماره تماس"
                                        value={formData.phoneNumber}
                                        onChange={(e) =>
                                            setFormData({ ...formData, phoneNumber: e.target.value })
                                        } 
                                        className="border rounded p-2"/>
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
                                <select
                                    value={formData.gender}
                                    onChange={(e) =>
                                        setFormData({ ...formData, specialtyId: Number(e.target.value) })
                                    }
                                    className="border p-2 rounded"
                                    >
                                    <option value={0}>انتخاب تخصص</option>
                                    {speci.map((sp: any) => (
                                    <option key={sp.id} value={sp.id}>
                                        {sp.name}
                                    </option>
                                    ))}
                                </select>    
                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={ addDocs}
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
                        placeholder="جست و جوی دکتر مورد نظر"
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
                            <th className="px-4 py-3 text-center">#</th>
                            <th className="px-4 py-3 text-center">نام کامل</th>
                            <th className="px-4 py-3 text-center">شماره تماس</th>
                            <th className="px-4 py-3 text-center">تخصص</th>  
                            <th className="px-4 py-3 text-center">تعداد نوبت </th>                       
                            <th className="px-4 py-3 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {docs.map((docies: any, index: number) => (
                            <tr key={docies.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3 text-center">{index + 1}</td>
                                <td className="px-4 py-3 text-center">{docies.fullName}</td>
                                <td className="px-4 py-3 text-center">{docies.phoneNumber}</td>
                                <td className="px-4 py-3 text-center">{docies.specialty.name}</td>
                                <td className="px-4 py-3 text-center">{docies.schedulesCount}</td>
                                
                                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                                {/* <button
                                    onClick={() => handleEdit(patient)}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                                >
                                    ویرایش
                                </button> */}
                                <button
                                    onClick={() => deleteDocs(docies.id)}
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