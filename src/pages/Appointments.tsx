import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {ToastContainer , toast } from "react-toastify/unstyled";
import {Ban , SquarePen , Trash} from "lucide-react";
import Patient from "./Patient";



export default function Appointment(){
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



    const [appointments , setAppointment] = useState([])
    const [patients, setPatients] = useState([]);
    const [docs , setDocs] = useState([])
    const [showForm, setShowForm] = useState(false);
    
    const {
    register: registerForm,
    handleSubmit: handleSubmitForm,
    reset: resetForm,
    formState: { errors: errorsForm },
    } = useForm({
    defaultValues: {
        patientId: 0,
        doctorScheduleId: 0,
        reason: "",
        notes: "",

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
        IsCancelled: "",
    },
    });


    const getDocs = async () => {
        try {
            const response = await axios.get("https://nowruzi.top/api/Clinic/schedules")
            setDocs(response.data)
        } catch (error) {
            console.log("خطا در بارگزاری دکترها" , error);
            
        }
    }

    const getPatients = async () => {
        try {
        const response = await axios.get("https://nowruzi.top/api/Clinic/patients");
        setPatients(response.data)
        } catch (error) {
            console.log("خطا در گرفتن بیماران" , error);
            
        }
    }

    const getAppointment = async () => {
        try {
        const response = await axios.get(
            "https://nowruzi.top/api/Clinic/appointments"
        );
        setAppointment(response.data);
        } catch (error) {
        console.log("خطا در گرفتن نوبت ها", error);
        }
    };

    const addAppointment = async (data:any) => {
        try {
            await axios.post("https://nowruzi.top/api/Clinic/appointments", data)
            getAppointment()
            resetForm()
            toast.success("نوبت با موفقیت اضافه شد")
            setShowForm(false);

        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data);
            
        }

    }



    useEffect(() => {
    getDocs();
    getAppointment();
    getPatients();
  }, []);
    

const searchAppointment = async (data:any) => {
  try {
    const response = await axios.get(
      "https://nowruzi.top/api/Clinic/appointments/search",
      {
        params: {
            DoctorId: data.DoctorId || undefined,
            FromDate: data.FromDate || undefined,
            ToDate: data.ToDate || undefined,
            IsCancelled:
              data.IsCancelled !== ""
                ? data.IsCancelled
                : undefined,
          },
      }
    );
    resetSearch()
    setAppointment(response.data);
  } catch (error) {
    console.log("خطا در جستجو", error);
  }
};



    const deleteAppointment = async(id:number) => {
        try {
        await axios.delete(`https://nowruzi.top/api/Clinic/appointments/${id}`);
        getAppointment();
        toast.success("نوبت با موفقیت حذف شد");
        } catch (error) {
        toast.error(error.response.data);
        console.log( "خطا در حذف" , error.response.data);
        }
    }


    // edit part
    const [editappo , setEditappo] = useState(null)
    const [editform, setEditform] = useState({
        patientId: 0,
        doctorScheduleId: 0,
        reason: "",
        notes: "",
    });

    const editappies = async(docie:any) => {
    setEditappo(docie);
    setEditform({
        patientId: docie.patientId || "" ,
        doctorScheduleId:docie.doctorScheduleId || "",
        reason: docie.reason || "",
        notes: docie.notes || "",
    })

    }

    const closeEdit = () => {
        setEditappo(null)
    }

    const changeEdit = (e: any) => {
    const { name, value } = e.target;
    setEditform((prev:any) => ({ ...prev, [name]: value }));
    };

    const saveEdit = async() => {
        try {
            await axios.put(`https://nowruzi.top/api/Clinic/appointments/${editappo.id}`, editform)
            toast.success("ویرایش با موفقیت انجام شد")
            closeEdit()
            getAppointment()
            
        } catch (error) {
            toast.error(error.response.data)
            console.log("خطا در ویرایش" ,error.response.data );
            
        }

    }

    // cancel part
    const [selectedId, setSelectedId] = useState(null);
    const [cancelAppointment, setCancelAppointment] = useState(false);
    const [cancelReason, setCancelReason] = useState({
        cancellationReason: "",
    });
    const cancelappo = async() => {
        try {
            await axios.post(`https://nowruzi.top/api/Clinic/appointments/${selectedId}/cancel` , cancelReason)
            setCancelAppointment(false)
            getAppointment()
            toast.success("نوبت با موفقیت لغو شد")
        } catch (error) {
            toast.error(error.response.data)
            console.log(error.response.data , "خطا در لغو");
            
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
                        <h1 className="text-3xl font-bold text-gray-800">لیست نوبت ها</h1>
                        <button
                        onClick={() => setShowForm(!showForm)}
                        className="bg-green-500 cursor-pointer hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                        >
                        + افزودن نوبت
                        </button>
                    </div>
                    {/* header appointment form */}
                    {showForm && (
                        <form onSubmit={handleSubmitForm(addAppointment)}>
                        <div className="rounded-lg mb-3 p-3">
                            <div className="grid grid-cols-2 gap-3">

                                <div className="flex flex-col relative w-full">
                                    <select
                                        {...registerForm("patientId", { required: "انتخاب دکتز الزامی است" })}
                                        className="border p-2 rounded w-full"
                                        defaultValue=""
                                    >
                                        <option value={0} disabled>انتخاب بیمار</option>
                                        {patients.map((sp: any) => (
                                        <option key={sp.id} value={sp.id}>{sp.fullName}</option>
                                        ))}
                                    </select>

                                    {errorsForm.patientId && (
                                        <span className="text-red-500 text-xs mt-1">{errorsForm.patientId.message}</span>
                                    )}
                                </div>
                                
                                <div className="flex flex-col relative w-full">
                                    <select
                                        {...registerForm("doctorScheduleId", { required: "انتخاب دکتر الزامی است" })}
                                        className="border p-2 rounded w-full"
                                        defaultValue=""
                                    >
                                        <option value={0} disabled>انتخاب دکتر</option>
                                        {docs.map((dc: any) => (
                                        <option key={dc.id} value={dc.id}>
                                        {dc.doctor.fullName}    {dc.dayDisplay}   {" "}
                                        {dc.isAvailable ? "فعال" : "غیر فعال"}
                                        </option>
                                        ))}
                                    </select>

                                    {errorsForm.doctorScheduleId && (
                                        <span className="text-red-500 text-xs mt-1">{errorsForm.doctorScheduleId.message}</span>
                                    )}
                                </div>
                                
                                <div className="relative col-span-2">
                                    <textarea
                                        placeholder="دلیل ثبت نوبت"
                                        {...registerForm("reason", { required: "دلیل الزامی است" })}
                                        className="border p-2 rounded w-full peer"
                                    />

                                    {errorsForm.reason && (
                                        <span className="text-red-500 text-sm">{errorsForm.reason.message}</span>
                                    )}
                                </div>
                                <div className="relative col-span-2">
                                    <textarea
                                        placeholder="یادداشت"
                                        {...registerForm("notes")}
                                        className="border p-2 rounded w-full peer"
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    <button
                                        onClick={ addAppointment}
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
                    <form onSubmit={handleSubmitSearch(searchAppointment)}>
                        <div className="rounded-lg mb-3 p-3">
                            <div className="grid grid-cols-4 gap-3">

                                <div className="flex flex-col relative w-full">
                                    <select
                                        {...registerSearch("DoctorId", { required: "انتخاب دکتر الزامی است" })}
                                        className="border p-2 rounded w-full"
                                        defaultValue=""
                                    >
                                        <option value={0}>انتخاب دکتر</option>
                                        {docs.map((dc: any) => (
                                        <option key={dc.doctor.id} value={dc.doctor.id}>
                                        {dc.doctor.fullName}
                                        </option>
                                        ))}
                                    </select>

                                    {errorsSearch.DoctorId && (
                                        <span className="text-red-500 text-xs mt-1">{errorsSearch.DoctorId.message}</span>
                                    )}
                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        {...registerSearch("FromDate")}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder=" تاریخ شروع"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                         تاریخ شروع
                                    </label>

                                </div>
                                <div className="relative w-full">
                                    <input
                                        type="date"
                                        {...registerSearch("ToDate")}
                                        className="border rounded p-2 w-full placeholder-transparent peer"
                                        placeholder=" تاریخ پایان"
                                    />
                                    <label className="absolute pr-6 right-3 top-2.5 text-gray-500 text-sm pointer-events-none transition-all 
                                        peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base">
                                         تاریخ پایان
                                    </label>
                                </div>

                                <div className="flex flex-col">
                                    <select
                                        {...registerSearch("IsCancelled" )}
                                        className="border p-2 rounded"
                                        defaultValue=""
                                    >
                                        <option value="">همه وضعیت‌ها</option>
                                        <option value="false">فعال</option>
                                        <option value="true">لغو شده</option>
                                        
                                    </select>
                                </div>
                                

                                <div className="flex justify-start mb-4">
                                    <button
                                    onClick={searchAppointment}
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
                            <th className="px-4 py-3 text-center">نام بیمار</th>
                            <th className="px-4 py-3 text-center">نام دکتر</th>
                            <th className="px-4 py-3 text-center">شماره تماس بیمار</th>
                            <th className="px-4 py-3 text-center">تاریخ نوبت</th>   
                            <th className="px-4 py-3 text-center">دلیل نوبت</th>     
                            <th className="px-4 py-3 text-center">وضعیت</th>                   
                            <th className="px-4 py-3 text-center">عملیات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments.map((docies: any, index: number) => (
                            <tr key={docies.id} className="hover:bg-gray-100">
                                <td className="px-4 py-3 text-center">{index + 1}</td>
                                <td className="px-4 py-3 text-center">{docies.patient.fullName}</td>
                                <td className="px-4 py-3 text-center">{docies.doctorSchedule.doctor.fullName}</td>
                                <td className="px-4 py-3 text-center">{docies.patient.phoneNumber}</td>
                                <td className="px-4 py-3 text-center">{docies.doctorSchedule.dayDisplay}</td>
                                <td className="px-4 py-3 text-center">{docies.reason}</td>
                                <td className="px-4 py-3 text-center">{docies.status}</td>

                                
                                <td className="px-4 py-3 flex justify-center gap-2 text-center space-x-2 rtl:space-x-reverse">
                                <button
                                        onClick={() => editappies(docies)}
                                        className="text-blue-500 hover:text-blue-600"
                                    >
                                        <SquarePen/>
                                    </button>
                                {docies.status === "فعال" ? (
                                    <button
                                    onClick={() => {
                                        setSelectedId(docies.id);
                                        setCancelAppointment(true);
                                    }}
                                    className="text-green-500 hover:text-green-600"
                                    >
                                    <Ban/>
                                    </button>
                                ) : (
                                    <></>
                                )}  
                                {docies.status === "لغو شده" ? (
                                    <button
                                    onClick={() => deleteAppointment(docies.id)}
                                    className="text-red-500 hover:text-red-600 "
                                >
                                    <Trash />
                                </button>
                                ):
                                <></>
                                }
                                </td>
                            </tr>
                            ))}

                        </tbody>
                        </table>
                    </div>
                </div>
                {/* editform */}
                {editappo && (
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    
                        <div className="bg-white backdrop-blur-sm rounded-lg p-6 w-full max-w-md rtl text-right">
                            <h2 className="text-xl font-bold mb-4">ویرایش نوبت</h2>
                        
                            <div className="grid grid-cols-2 gap-3 w-full" dir="rtl">
                                <select
                                
                                    name="patientId"
                                    value={editform.patientId}
                                    onChange={changeEdit}
                                    className="border p-2 rounded mb-2 w-full"

                                    >
                                    
                                    {patients.map((sp: any) => (
                                    <option key={sp.id} defaultValue={sp.id}>{sp.fullName}</option>
                                    ))}
                                    </select>  
                                <select                               
                                    name="doctorScheduleId"
                                    value={editform.doctorScheduleId}
                                    onChange={changeEdit}
                                    className="border p-2 rounded mb-2 w-full"
                                    
                                    >
                                        
                                    
                                    {docs.map((dc: any) => (
                                    <option key={dc.doctor.id} defaultValue={dc.doctor.id}>
                                        {dc.doctor.fullName}
                                    </option>
                                    ))}
                                    </select>  
                                
                                <input
                                    type="text"
                                    name="reason"
                                    value={editform.reason}
                                    onChange={changeEdit}
                                    placeholder="دلیل"
                                    className="border p-2 rounded mb-2 w-full col-span-2"
                                    />   
                                <input
                                    type="text"
                                    name="notes"
                                    value={editform.notes}
                                    onChange={changeEdit}
                                    placeholder="یادداشت"
                                    className="border p-2 rounded mb-2 w-full col-span-2"
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
                {/* cancel reason page*/}
                {cancelAppointment && (
                <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-lg shadow-lg w-90 p-6" dir="rtl">
                        <h2 className="text-lg font-bold mb-4 text-gray-800">لغو نوبت</h2>
                        <textarea
                            className="w-full border border-gray-300 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-black-400 resize-none"
                            placeholder="دلیل لغو"
                            value={cancelReason.cancellationReason}
                            onChange={(e) =>
                            setCancelReason({
                                ...cancelReason,
                                cancellationReason: e.target.value,
                            })
                            }
                        />
                        <div className="flex  gap-2" >
                            <button
                            onClick={() => setCancelAppointment(false)}
                            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                            >
                            انصراف
                            </button>
                            <button
                            onClick={cancelappo}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                            >
                            لغو
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