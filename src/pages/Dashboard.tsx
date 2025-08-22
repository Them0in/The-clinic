import {ScrollText , SquareCheckBig , UserRoundPlus , Users , CalendarDays  , Stethoscope , Wallet} from "lucide-react";
import { useEffect, useState } from "react";


export default function Dashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // check login from localStorage
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


  const stats = [
    { title: "کل بیماران", value: "۱,۲۳۴", icon: <Users size={30}/>, color: "blue" },
    { title: "نوبت‌های امروز", value: "۴۵", icon: <CalendarDays size={30}/>, color: "green" },
    { title: "پزشکان فعال", value: "۱۲", icon: <Stethoscope size={30}/>, color: "purple" },
    { title: "درآمد ماهانه", value: "۱۲,۵۰۰,۰۰۰ تومان", icon: <Wallet size={30}/>, color: "orange" },
  ];

  const recentAppointments = [
    { id: 1, patient: "احمد محمدی", doctor: "دکتر رضایی", time: "۱۰:۰۰", status: "تایید شده" },
    { id: 2, patient: "فاطمه احمدی", doctor: "دکتر کریمی", time: "۱۱:۳۰", status: "در انتظار" },
    { id: 3, patient: "علی حسینی", doctor: "دکتر نوری", time: "۱۴:۰۰", status: "تایید شده" },
  ];

  return (
    <div className="relative">
      {/* dashboard content */}
      <div className={`p-6 space-y-8 text-right min-h-screen ${!isLoggedIn ? "blur-sm pointer-events-none" : ""}`} dir="rtl">

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold text-gray-800">داشبورد</h1>
          <p className="text-gray-600">خوش آمدید به سیستم مدیریت کلینیک</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-row-reverse">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center p-4 rounded-lg shadow 
              ${stat.color === "blue"
                  ? "bg-blue-50 text-blue-600"
                  : stat.color === "green"
                  ? "bg-green-50 text-green-600"
                  : stat.color === "purple"
                  ? "bg-purple-50 text-purple-600"
                  : "bg-orange-50 text-orange-600"}`}
            >
              <div className="text-3xl ml-4">{stat.icon}</div>
              <div>
                <h3 className="text-sm font-medium">{stat.title}</h3>
                <p className="text-lg font-bold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard content */}
        <div className="grid grid-cols-1  gap-6">
          {/* Activities */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">فعالیت‌های امروز</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-right">
                <div className="pl-2 text-2xl"><ScrollText size={30}/></div>
                <div className="flex-1">
                  <p>نوبت جدید ثبت شد</p>
                  <small className="text-gray-500 text-sm">۲ دقیقه پیش</small>
                </div>
              </div>
              <div className="flex items-center justify-between text-right">
                <div className="pl-2 text-2xl"><SquareCheckBig size={30}/></div>
                <div className="flex-1">
                  <p>نوبت تایید شد</p>
                  <small className="text-gray-500 text-sm">۱۵ دقیقه پیش</small>
                </div>
              </div>
              <div className="flex items-center justify-between text-right">
                <div className="pl-2 text-2xl"><UserRoundPlus size={30}/></div>
                <div className="flex-1">
                  <p>بیمار جدید ثبت شد</p>
                  <small className="text-gray-500 text-sm">۱ ساعت پیش</small>
                </div>
              </div>
            </div>
          </div>

          {/* Recent appointments */}
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">نوبت‌های اخیر</h3>
            <div className="space-y-4">
              {recentAppointments.map((a) => (
                <div key={a.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div className="space-y-1 text-right">
                    <h4 className="font-medium">{a.patient}</h4>
                    <p className="text-gray-500 text-sm">{a.doctor}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-600 text-sm ml-2">{a.time}</span>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        a.status === "تایید شده" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {a.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
  );
}
