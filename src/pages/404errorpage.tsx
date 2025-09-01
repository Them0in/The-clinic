import { Link } from "react-router-dom";

export default function Error404() {
  const helpfulLinks = [
    { name: "خانه", path: "/" },
    { name: "پزشکان", path: "/doctors" },
    { name: "بیماران", path: "/Patients" },
    { name: "تخصص‌ها", path: "/Specialties" },
    { name: "برنامه‌ها", path: "/Schedules" },
    { name: "نوبت‌ها", path: "/appointments" },
    { name: "گزارشات", path: "/reports" },
    { name: "تنظیمات", path: "/settings" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen font-sans flex items-center justify-center p-4" dir="rtl">
      <div className="max-w-4xl w-full mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col md:flex-row">
          {/* Illustration Section */}
          <div className="md:w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 p-8 flex items-center justify-center">
            <div className="relative w-full h-64 md:h-auto">
              <div className="animate-float absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 200"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="#818CF8"
                    d="M43.9,-58.2C56.3,-50.3,65.4,-36.3,70.8,-20.2C76.1,-4.1,77.7,14.2,70.5,29.4C63.3,44.6,47.3,56.7,30.2,64.8C13.1,72.9,-5.2,77,-19.4,70.9C-33.6,64.8,-43.7,48.5,-53.3,32.5C-62.9,16.5,-72,0.8,-70.3,-14.1C-68.6,-29,-56.1,-43.1,-41.2,-50.5C-26.3,-57.9,-9.1,-58.6,6.6,-66.4C22.3,-74.2,44.6,-89.1,43.9,-58.2Z"
                    transform="translate(100 100)"
                  />
                </svg>
              </div>
              <div className="relative z-10 text-center">
                <div className="text-white text-9xl font-bold mb-2">404</div>
                <div className="text-blue-100 text-xl font-medium">صفحه یافت نشد</div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              اوپس! گم شدیم؟
            </h1>
            <p className="text-gray-600 mb-6">
              صفحه‌ای که به دنبال آن هستید وجود ندارد یا منتقل شده است. نگران نباشید، ما به شما کمک می‌کنیم به مسیر درست بازگردید.
            </p>

            <div className="mb-8">
              <div className="flex items-center mb-4">
                <div className="animate-pulse-slow flex-shrink-0 h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                  <svg
                    className="h-5 w-5 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-gray-700">در اینجا می‌توانید به صفحات مفید بروید:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {helpfulLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-500 "
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                      />
                    </svg>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center"
              >
                بازگشت به خانه
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
