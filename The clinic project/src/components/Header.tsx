import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Header() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userFullName, setUserFullName] = useState('');

  const checkLoginStatus = () => {
    const userId = localStorage.getItem('userId');
    const fullName = localStorage.getItem('fullName');
    if (userId && fullName) {
      setIsLoggedIn(true);
      setUserFullName(fullName);
    } else {
      setIsLoggedIn(false);
      setUserFullName('');
    }
  };

  useEffect(() => {
    checkLoginStatus();
    window.addEventListener('storage', checkLoginStatus);
    return () => window.removeEventListener('storage', checkLoginStatus);
  }, []);

 const handleLogout = () => {
  localStorage.removeItem("userId");
  localStorage.removeItem("fullName");
  // let other components (like Dashboard) know
  window.dispatchEvent(new Event("loginStatusChanged"));
  window.location.reload();
};




  return (
    <header className="bg-green-600">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
        {/* Login / Register */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <>
              <span className="text-white font-medium">خوش آمدید، {userFullName}</span>
              <button
                onClick={handleLogout }
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
              >
                خروج
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-white text-green-600 font-semibold py-2 px-4 rounded hover:bg-green-50 transition"
              >
                ورود
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-green-600 text-white font-semibold py-2 px-4 rounded hover:bg-green-700 transition"
              >
                ثبت نام
              </button>
            </>
          )}
        </div>
        
        
        {/* Navigation Links */}
        <nav className="flex items-center gap-6 flex-row-reverse">
          <Link to="/" className="text-white hover:text-green-200 transition" >داشبورد</Link>
          <Link to="/patients" className="text-white hover:text-green-200 transition" >بیماران</Link>
          <Link to="/doctors" className="text-white hover:text-green-200 transition" >پزشکان</Link>
          <Link to="/appointments" className="text-white hover:text-green-200 transition" >نوبت‌ها</Link>
          <Link to="/specialties" className="text-white hover:text-green-200 transition" >تخصص‌ها</Link>
          <Link to="/schedules" className="text-white hover:text-green-200 transition" >برنامه‌ها</Link>
        </nav>

        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          کلینیک سلامت
        </Link>

      </div>
    </header>
  );
}
