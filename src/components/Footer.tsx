export default function Footer(){
    return (
        <>
            <footer className="bg-green-700 text-white pt-10 pb-4">
                <div className="w-full  mx-auto px-8">
                    
                    {/* Footer main sections */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-right">
                        {/* Working Hours */}
                        <div>
                            <h4 className="text-lg font-semibold  mb-3">ساعات کاری</h4>
                            <ul className="space-y-2  text-sm">
                                <li>شنبه تا چهارشنبه: ۸ صبح تا ۸ شب</li>
                                <li>پنجشنبه: ۸ صبح تا ۲ بعدازظهر</li>
                                <li>جمعه: تعطیل</li>
                            </ul>
                        </div>
                        {/* Contact */}
                        <div>
                            <h4 className="text-lg font-semibold  mb-3">تماس</h4>
                            <ul className="space-y-2  text-sm">
                                <li>📞 ۰۲۱-۱۲۳۴۵۶۷۸</li>
                                <li>📧 info@clinic.ir</li>
                                <li>📍 تهران، خیابان ولیعصر</li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h4 className="text-lg font-semibold  mb-3">خدمات</h4>
                            <ul className="space-y-2  text-sm">
                                <li>معاینه عمومی</li>
                                <li>تخصص‌های مختلف</li>
                                <li>آزمایشگاه</li>
                                <li>تصویربرداری</li>
                            </ul>
                        </div>
                        
                        {/* Clinic Info */}
                        <div>
                            <h4 className="text-lg font-semibold  mb-3">کلینیک سلامت</h4>
                            <p className=" text-sm">
                                ارائه بهترین خدمات درمانی با جدیدترین تکنولوژی‌ها
                            </p>
                        </div>

                        

                        

                        

                    </div>

                    {/* Footer bottom */}
                    <div className="border-t border-gray-300 mt-10 pt-4 text-center  text-sm">
                        &copy; 1404 کلینیک سلامت. تمامی حقوق محفوظ است.
                    </div>

                </div>
            </footer>
        </>
    )
}