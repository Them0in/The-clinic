import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

type RegisterFormData = {
  mobile: string;
  password: string;
  firstName: string;
  lastName: string;
};

export default function Register() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterFormData>();
  const navi = useNavigate();

  const registerPost = async (data: RegisterFormData) => {
    try {
      const response = await axios.post("https://nowruzi.top/api/User/Register", {
          mobile: data.mobile,
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
        });

      if (response.data.isSuccess) {
        localStorage.setItem("userId", response.data.data.id);
        localStorage.setItem("fullName", response.data.data.fullName);

        toast.success("ثبت‌نام موفقیت‌آمیز بود");
        reset();
        setTimeout(() => {
            navi("/login");
        }, 1000);
      } else {
        toast.error(response.data.message || "خطا در ثبت‌نام");
      }

    } catch (error: any) {
      console.error("خطا در ارسال درخواست:", error);
      toast.error(error.response?.data?.message || "خطای غیرمنتظره رخ داد");
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-100 p-6">
    <div className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-8">
      
      {/* Header */}
      <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
        ثبت‌نام در کلینیک سلامت
      </h2>
      <p className="text-center text-gray-600 mb-8">
        لطفاً اطلاعات خود را برای ایجاد حساب کاربری وارد کنید.
      </p>

      {/* Form */}
      <form onSubmit={handleSubmit(registerPost)} className="space-y-5">

        {/* First Name */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium text-right">نام</label>
          <input
            type="text"
            {...register("firstName", { required: "نام الزامی است" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">{errors.firstName.message?.toString()}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium text-right">نام خانوادگی</label>
          <input
            type="text"
            {...register("lastName", { required: "نام خانوادگی الزامی است" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">{errors.lastName.message?.toString()}</p>
          )}
        </div>

        {/* Mobile */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium text-right">شماره موبایل</label>
          <input
            type="text"
            {...register("mobile", { required: "شماره موبایل الزامی است" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm mt-1">{errors.mobile.message?.toString()}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block mb-1 text-gray-700 font-medium text-right">رمز عبور</label>
          <input
            type="password"
            {...register("password", { required: "رمز عبور الزامی است" })}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message?.toString()}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
        >
          ثبت‌نام
        </button>

      </form>

      {/* Toast container */}
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  </div>
);

}
