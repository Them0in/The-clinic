import { LayoutDashboard , Users , Stethoscope , ClipboardList ,Microscope , CalendarClock , Flag , UserRoundCog} from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export default function Sidebar(){
    const location = useLocation();
    const sidelist = [
        {path:"/" , lable:"داشبورد" , icon:<LayoutDashboard size={20}/>},
        {path:"/patients" , lable:"بیماران" , icon:<Users size={20}/>},
        {path:"/doctors" , lable:"دکتر ها" , icon:<Stethoscope size={20}/>},
        {path:"/appointments" , lable:"نوبت ها" , icon:<ClipboardList size={20}/>},
        {path:"/specialties" , lable:"تخصص پزشکان" , icon:<Microscope size={20}/>},
        {path:"/schedules" , lable:"برنامه زمانی" , icon:<CalendarClock size={20}/>},
        {path:"/reports" , lable:"گزارش" , icon:<Flag size={20}/>},
        {path:"/settings" , lable:"تنظیمات" , icon:<UserRoundCog size={20}/>}

    ]

    return (
        <> 
            <aside className="w-72 bg-white border-l border-gray-200 flex flex-col shadow-md right-0   overflow-y-auto justify-end ">
                {/* Header */}
                <div className="p-6  border-b border-gray-200 ">
                    <h3 className="text-gray-800 text-lg font-semibold text-right">منوی مدیریت</h3>
                </div>

                {/* Menu */}
                <nav className="flex-1 py-4 ">
                    <ul className="space-y-1">
                    {sidelist.map((item) => (
                        <li key={item.path}>
                        <Link
                            to={item.path}
                            className={`flex flex-row-reverse items-center px-6 py-3 text-gray-600 hover:bg-gray-50 hover:text-green-600 border-l-4 transition-colors ${
                            location.pathname === item.path
                                ? "bg-blue-50 text-green-600 border-green-600"
                                : "border-transparent"
                            }`}
                        >
                            <span className="mr-3 text-lg pl-2">{item.icon}</span>
                            <span className="font-medium">{item.lable}</span>
                        </Link>
                        </li>
                    ))}
                    </ul>
                </nav>

                {/* Footer */}
                <div className="p-6 border-t border-gray-200">
                    <div className="text-sm text-gray-500">نسخه ۱.۰.۰</div>
                </div>
            </aside>

        </>
    )
}