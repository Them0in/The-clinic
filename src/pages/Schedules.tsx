import axios from "axios";
import {useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import {ToastContainer , toast } from "react-toastify/unstyled";
import { Check, X , SquarePen , Trash} from "lucide-react";


export default function Schedules(){
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
    const [sch , setSch] = useState([])
    const [showForm, setShowForm] = useState(false);
    
    const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    reset: resetForm,
    formState: { errors: errorsForm },
    } = useForm({
    defaultValues: {
        doctorId: 0,
        day: "",
        startTime: "",
        endTime: "",
    },
    });

    const  {
    register: registerSearch,
    handleSubmit: handleSubmitSearch,
    reset: resetSearch,
    formState: { errors: errorsSearch },
    } = useForm({
    defaultValues: {
        DoctorId: 0,
        FromDate: "",
        ToDate: "",
        IsAvailable: "",
    },
    });


    const getDocs = async () => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/doctors")
            setDocs(response.data)
        } catch (error) {
            console.log("خطا در بارگزاری دکترها" , error);
            
        }
    }

    const getSch = async () => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/schedules")
            setSch(response.data)
        } catch (error) {
            console.log("خطا در بارگزاری جدول" , error);
            
        }
    }
        const addSch = async (data:any) => {
        try {
            await axios.post("https://nowruzi.top/api/Clinic/schedules", data)
            getSch()
            resetForm()
            toast.success("برنامه زمانی با موفقیت اضافه شد")
            setShowForm(false);

        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data);
            
        }

    }

    useEffect(() => {
    getDocs();
    getSch();
  }, []);


    const searchSch = async (data:any) => {
  try {
    const response = await axios.get(
      "https://nowruzi.top/api/Clinic/schedules/search",
      {
        params: {
          DoctorId: data.DoctorId || undefined,
          FromDate: data.FromDate || undefined,
          ToDate: data.ToDate || undefined,
          IsAvailable: data.IsAvailable !== "" ? data.IsAvailable : undefined,
        },
      }
    );
    resetSearch()
    setSch(response.data);
  } catch (error) {
    console.log("خطا در جستجو", error);
  }
};



    const deleteSch = async(id:number) => {
        try {
        await axios.delete(`https://nowruzi.top/api/Clinic/schedules/${id}`);
        getSch();
        toast.success("برنامه زمانی با موفقیت حذف شد");
        } catch (error) {
        toast.error(error.response.data);
        console.log( "خطا در حذف" , error.response.data);
        }
    }






      // edit part
    const [editsch , setEditsch] = useState(null)
    const [editform, setEditform] = useState({
        doctorId: 0,
        day: "",
        startTime: "",
        endTime: "",
    });

    const editschies = async(docie:any) => {
    setEditsch(docie);
    setEditform({
        doctorId: docie.doctor.id || "" ,
        day:docie.day || "",
        startTime: docie.startTime || "",
        endTime: docie.endTime || "",
    })

    }

    const closeEdit = () => {
        setEditsch(null)
    }

    const changeEdit = (e: any) => {
    const { name, value } = e.target;
    setEditform((prev:any) => ({ ...prev, [name]: value }));
    };
    
    const saveEdit = async() => {
        try {
            await axios.put(`https://nowruzi.top/api/Clinic/appointments/${editsch.id}`, editform)
            toast.success("ویرایش با موفقیت انجام شد")
            closeEdit()
            getSch()
            
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
            <div className="relative max-w-6xl mx-auto ">
                <div className={`p-6 space-y-8  text-right " ${!isLoggedIn ? "blur-sm pointer-events-none" : ""} ` } dir="rtl">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-3xl font-bold text-gray-800">برنامه زمانی</h1>
                        <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                        + افزودن دکتر
                        </button>
                    </div>
                    {/* header patient form */}
                    {showForm && (
                        <form onSubmit={handleSubmitForm(addSch)}>
                        <div className="rounded-lg mb-3 p-3">
                            <div className="grid grid-cols-2 gap-3">

                                <div className="flex flex-col relative w-full">
                                    <select
                                        {...registerForm("doctorId", { required: "انتخاب دکتر الزامی است" })}
                                        className="border p-2 rounded w-full"
                                        defaultValue=""
                                    >
                                        <option value={0} disabled>انتخاب دکتر</option>
                                        {docs.map((sp: any) => (
                                        <option key={sp.id} value={sp.id}>{sp.fullName}</option>
                                        ))}
                                    </select>

                                    {errorsForm.doctorId && (
                                        <span className="text-red-500 text-xs mt-1">{errorsForm.doctorId.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        {...registerForm("day", { required: "تاریخ الزامی است" })}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder="تاریخ "
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                        تاریخ 
                                    </label>

                                    {errorsForm.day && (
                                        <span className="text-red-500 text-sm">{errorsForm.day.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="time"
                                        {...registerForm("startTime", { required: "تاریخ شروع الزامی است" })}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder=" تاریخ شروع"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                         تاریخ شروع
                                    </label>

                                    {errorsForm.startTime && (
                                        <span className="text-red-500 text-sm">{errorsForm.startTime.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="time"
                                        {...registerForm("endTime", { required: "تاریخ پایان الزامی است"  })}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder=" تاریخ پایان"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                         تاریخ پایان
                                    </label>

                                    {errorsForm.endTime && (
                                        <span className="text-red-500 text-sm">{errorsForm.endTime.message}</span>
                                    )}
                                </div>
                                

                                <div className="grid grid-cols-2 gap-2">
                                    <button
                                        onClick={ addSch}
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
                        </form>
                    )}

                    {/* search*/}
                    <form onSubmit={handleSubmitSearch(searchSch)}>
                        <div className="rounded-lg mb-3 p-3">
                            <div className="grid grid-cols-4 gap-3">

                                <div className="flex flex-col relative w-full">
                                    <select
                                        {...registerSearch("DoctorId", { required: "انتخاب دکتر الزامی است" })}
                                        className="border p-2 rounded w-full"
                                        defaultValue=""
                                    >
                                        <option value={0}>انتخاب دکتر</option>
                                        {docs.map((sp: any) => (
                                        <option key={sp.id} value={sp.id}>{sp.fullName}</option>
                                        ))}
                                    </select>

                                    {errorsSearch.DoctorId && (
                                        <span className="text-red-500 text-xs mt-1">{errorsSearch.DoctorId.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        {...registerSearch("FromDate", { required: "لطفا تاریخ شروع را وارد کنید" })}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder=" تاریخ شروع"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                         تاریخ شروع
                                    </label>

                                    {errorsSearch.FromDate && (
                                        <span className="text-red-500 text-sm">{errorsSearch.FromDate.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        {...registerSearch("ToDate", { required:  "لطفا تاریخ پایان را وارد کنید" })}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder=" تاریخ پایان"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                         تاریخ پایان
                                    </label>

                                    {errorsSearch.ToDate && (
                                        <span className="text-red-500 text-sm">{errorsSearch.ToDate.message}</span>
                                    )}
                                </div>

                                <div className="flex flex-col">
                                    <select
                                        {...registerSearch("IsAvailable" )}
                                        className="border p-2 rounded"
                                        defaultValue=""
                                    >
                                        <option value="">همه وضعیت‌ها</option>
                                        <option value="true">فعال</option>
                                        <option value="false">غیرفعال</option>
                                    </select>
                                </div>
                                

                                <div className="flex justify-start mb-4">
                                    <button
                                    onClick={searchSch}
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                    جستجو
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                    {/* table  */}
                    <div className="bg-white rounded-lg shadow">
                        <table className="w-full text-black-500 text-sm ">
                        <thead className="bg-green-400">
                            <tr>
                            <th className="px-4 py-3 text-center">#</th>
                            <th className="px-4 py-3 text-center">نام دکتر</th>
                            <th className="px-4 py-3 text-center">شماره تماس</th>
                            <th className="px-4 py-3 text-center">تخصص</th>  
                            <th className="px-4 py-3 text-center">تعداد نوبت </th>   
                            <th className="px-4 py-3 text-center">تاریح در دسترس</th>     
                            <th className="px-4 py-3 text-center">ساعت حضور</th>  
                            <th className="px-4 py-3 text-center">نوبت دهی</th>                  
                            <th className="px-4 py-3 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sch.map((docies: any, index: number) => (
                            <tr key={docies.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3 text-center">{index + 1}</td>
                                <td className="px-4 py-3 text-center">{docies.doctor.fullName}</td>
                                <td className="px-4 py-3 text-center">{docies.doctor.phoneNumber}</td>
                                <td className="px-4 py-3 text-center">{docies.doctor.specialty.name}</td>
                                <td className="px-4 py-3 text-center">{docies.appointmentsCount}</td>
                                <td className="px-4 py-3 text-center">{docies.dayDisplay}</td>
                                <td className="px-4 py-3 text-center">
                                    <span>{docies.endTimeDisplay}-</span>
                                    <span>{docies.startTimeDisplay}</span>
                                </td>
                                <td className="px-4 py-3 text-center ">
                                    <span className=" flex justify-center">
                                    
                                    {docies.isAvailable  ? <Check /> : <X />}
                                    </span>
                                </td>

                                
                                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                                    <button
                                        onClick={() => editschies(docies)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <SquarePen/>
                                    </button>
                                    <button
                                        onClick={() => deleteSch(docies.id)}
                                        className="text-red-500 hover:text-red-600"
                                    >
                                        <Trash />
                                    </button>
                                </td>
                            </tr>
                            ))}

                        </tbody>
                        </table>
                    </div>
                </div>
                {editsch && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    
                        <div className="bg-white backdrop-blur-sm rounded-lg p-6 w-full max-w-md rtl text-right">
                            <h2 className="text-xl font-bold mb-4">ویرایش نوبت</h2>
                        
                            <div className="grid grid-cols-2 gap-3 w-full" dir="rtl">
                                
                                <select                               
                                    name="doctorId"
                                    value={editform.doctorId}
                                    onChange={changeEdit}
                                    className="border p-2 rounded mb-2 w-full"
                                    defaultValue={"hello"}
                                    >
                                        
                                    <option value="" disabled>انتخاب دکتر</option>
                                    {docs.map((dc: any) => (
                                    <option key={dc.id} value={dc.id}>
                                        {dc.fullName}
                                    </option>
                                    ))}
                                    </select>  
                                
                                <input
                                    type="date"
                                    name="day"
                                    value={editform.day}
                                    onChange={changeEdit}
                                    placeholder="روز"
                                    className="border p-2 rounded mb-2 w-full col-span-1"
                                    />   
                                <input
                                    type="time"
                                    name="notes"
                                    value={editform.startTime}
                                    onChange={changeEdit}
                                    placeholder="تاریخ شروع"
                                    className="border p-2 rounded mb-2 w-full col-span-1"
                                    />       
                                <input
                                    type="time"
                                    name="notes"
                                    value={editform.endTime}
                                    onChange={changeEdit}
                                    placeholder="تاریخ پایان"
                                    className="border p-2 rounded mb-2 w-full col-span-1"
                                    />                                   
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
                {/* Overlay when not logged in */}
                {!isLoggedIn && (
                    <div className="absolute inset-0 flex items-start justify-center pt-60">
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