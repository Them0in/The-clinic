import React from "react";

const Error404: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 min-h-screen font-['Inter'] flex items-center justify-center p-4">
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
                <div className="text-blue-100 text-xl font-medium">
                  Page Not Found
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Oops! Lost in Space?
            </h1>
            <p className="text-gray-600 mb-6">
              The page you're looking for doesn't exist or has been moved. Don't
              worry, we'll help you navigate back to safety.
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
                <p className="text-gray-700">Here are some helpful links instead:</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { name: "Home", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10..." },
                  { name: "Blog", icon: "M8 7V3m8 4V3m-9 8h10M5 21..." },
                  { name: "About Us", icon: "M16 7a4 4 0 11-8 0..." },
                  { name: "Contact", icon: "M3 8l7.89 5.26a2..." },
                ].map((link, i) => (
                  <a
                    key={i}
                    href="#"
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg text-gray-700 text-sm font-medium transition-colors flex items-center"
                  >
                    <svg
                      className="w-4 h-4 mr-2 text-indigo-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d={link.icon}
                      />
                    </svg>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="#"
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-medium transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
                Go Back
              </a>
              <a
                href="#"
                className="px-6 py-3 border border-gray-300 hover:bg-gray-50 rounded-lg text-gray-700 font-medium transition-colors flex items-center justify-center"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Contact Support
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2023 Your Company. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Error404;
