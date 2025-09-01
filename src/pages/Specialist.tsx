import axios from "axios";
import { use, useEffect, useState } from "react";
import {ToastContainer , toast } from "react-toastify";
import {Ban , SquarePen , Trash} from "lucide-react";



export default function Specialist(){
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




    const [specialties , setSpecialties] = useState([])
    const [showForm , setShowForm] = useState(false)
    const [formData , setFormData] = useState({name:""})

    const getSpecialties = async ()=> {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/specialties")
            setSpecialties(response.data)
        } catch (error) {
            console.log("خطا در جمع آوری لیست");
            
        }
    }
    
    const addspecialties = async () => {
        try {await axios.post("https://nowruzi.top/api/Clinic/specialties", formData);
        setShowForm(false);
        setFormData({
            name: "",
        });
        toast.success("تخصص اضافه شد");
        getSpecialties();
        } catch (error) {
        toast.error(error.response.data);
        console.log("خطا در افزودن تخصص", error.response.data);
        }
    }
    useEffect(() => {
    getSpecialties();
    }, []);
    const deleteSpecialties = async (id) => {
        try {
            await axios.delete(`https://nowruzi.top/api/Clinic/specialties/${id}`)
            getSpecialties()
            toast.success("تخصص با موفقیت حذف شد")
        } catch (error) {
            toast.error(error.response.data)
            console.log("خطا" , error.response.data);
            
        }
    }



    // editpart
        const [editspecie , setEditspecies] = useState(null)
        const [editform, setEditform] = useState({
            name:""
        });

        const editspecies = async(speci:any) => {
        setEditspecies(speci);
        setEditform({
            name: speci.name || "" ,
        })

        }

    const closeEdit = () => {
        setEditspecies(null)
    }

    const changeEdit = (e: any) => {
    const { name, value } = e.target;
    setEditform((prev:any) => ({ ...prev, [name]: value }));
    };

    const saveEdit = async() => {
        try {
            await axios.put(`https://nowruzi.top/api/Clinic/specialties/${editspecie.id}`, editform)
            toast.success("ویرایش با موفقیت انجام شد")
            closeEdit()
            getSpecialties()
            
        } catch (error) {
            toast.error(error.response.data)
            console.log("خطا در ویرایش" ,error.response.data );
            
        }

    }

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
           
        <div className="relative max-w-3xl mx-auto ">
                <div className={`p-6 space-y-8  text-right " ${!isLoggedIn ? "blur-sm pointer-events-none" : ""} ` } dir="rtl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">لیست تخصص‌ها</h1>
                        <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                        افزودن تخصص +
                        </button>
                    </div>
                    {/* header patient form */}
                    {showForm && (
                        <div className="bg-gray-100  p-4 rounded-lg mb-4 flex justify-between  ">
                            <div className="grid grid-cols-1">
                                <input
                                type="text"
                                className="border p-2 rounded"
                                value={formData.name}
                                placeholder="نام تخصص"
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                />
                            </div>
                            <div className=" flex gap-2  ">
                                <button
                                type="submit"
                                onClick={addspecialties}
                                className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-7 py-2 rounded-lg"
                                >
                                ثبت
                                </button>
                                <button
                                onClick={() => setShowForm(false)}
                                className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                                >
                                انصراف
                                </button>
                            </div>
                        </div>
                    )}

                    {/* table  */}
                    <div className="bg-white rounded-lg shadow">
                        <table className="w-full text-black-500 text-sm ">
                        <thead className="bg-green-400">
                            <tr>
                            <th className="px-4 py-3 text-center">#</th>
                            <th className="px-4 py-3 text-center">نام تخصص</th>
                            <th className="px-4 py-3 text-center">تعداد دکتر</th>
                            <th className="px-4 py-3 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {specialties.map((special: any, index:any) => (
                            <tr key={special.id} className=" hover:bg-gray-100">
                                <td className="px-4 py-3 text-center">{index + 1}</td>
                                <td className="px-4 py-3 text-center">{special.name}</td>
                                <td className="px-4 py-3 text-center">
                                {special.doctorsCount}
                                </td>
                                <td className="px-4 py-3 flex gap-2 text-center justify-center  space-x-2 rtl:space-x-reverse">
                                    <button
                                        onClick={() => editspecies(special)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <SquarePen/>
                                    </button>
                                    <button
                                        onClick={() => deleteSpecialties(special.id)}
                                        className="text-red-500 hover:text-red-600 "
                                    >
                                        <Trash/>
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
                {editspecie && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    
                        <div className="bg-white backdrop-blur-sm rounded-lg p-6 w-full max-w-md rtl text-right">
                            <h2 className="text-xl font-bold mb-4">ویرایش تخصص</h2>
                        
                            <div className="grid grid-cols-1 gap-3 w-full" dir="rtl">
                                
                                
                                  
                                <select
                                
                                    name="name"
                                    value={editform.name}
                                    onChange={changeEdit}
                                    className="border p-2 rounded mb-2 w-full"

                                    >
                                    
                                    {specialties.map((sp: any) => (
                                    <option key={sp.id} defaultValue={sp.id} >{sp.name}</option>
                                    ))}
                                    </select>       
                                   
                              
                            </div>
                            <div className="flex justify-end space-x-2 rtl:space-x-reverse grid grid-cols-2">
                                <button
                                    onClick={closeEdit}
                                    className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 text-white"
                                >
                                    لغو
                                </button>
                                <button
                                    onClick={saveEdit}
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    ذخیره
                                </button>
                            </div>
                        </div>       



                    </div>
                   
                )}

            </div>
        </>
      )
}