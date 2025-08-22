import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navi = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.post("https://nowruzi.top/api/User/Login", data);

      if (response.data.isSuccess) {
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("fullName", response.data.data.fullName);

        toast.success("ورود موفقیت آمیز بود");
        reset();
        setTimeout(() => {
            navi("/");
        }, 1000);
      } else {
        toast.error(response.data.message || "خطا در ورود");
      }
    } catch (error: any) {
      console.error("خطا در ارسال درخواست:", error);
      if (error.response) {
        toast.error(error.response.data?.message || "خطا در ارتباط با سرور");
      } else {
        toast.error("خطای غیرمنتظره رخ داد");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4">
      <ToastContainer position="top-center" />

      <div className="bg-white shadow-2xl rounded-xl w-full max-w-lg p-8">
        {/* Clinic Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-green-700 mb-2">خوش آمدید</h1>
          <p className="text-gray-600 text-sm">ورود کاربران کلینیک</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {/* Mobile Field */}
          <label className="mb-1 font-medium text-gray-700 text-right">شماره موبایل</label>
          <input
            type="text"
            placeholder="مثال: 09123456789"
            {...register("mobile", { required: "شماره موبایل الزامی است" })}
            className={`p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.mobile ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mb-2">{errors.mobile.message}</p>
          )}

         
          <label className="mb-1 font-medium text-gray-700 text-right">رمز عبور</label>
          <input
            type="password"
            placeholder="رمز عبور خود را وارد کنید"
            {...register("password", { required: "رمز عبور الزامی است" })}
            className={`p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-2">{errors.password.message}</p>
          )}

    
          <button
            type="submit"
            className="mt-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors text-lg"
          >
            ورود به کلینیک
          </button>
        </form>
      </div>
    </div>
  );
}
