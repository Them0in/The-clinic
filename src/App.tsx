import {ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom"

import Login from "./pages/Login"
import Register from "./pages/Register"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Doctors from "./pages/Doctors"
import Patient from "./pages/Patient"
import Specialist from "./pages/Specialist"
import Appointment from "./pages/Appointments";
import Schedules from "./pages/Schedules";

function App() {

  return (
      <BrowserRouter>
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
        <Routes>
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Register" element={<Register />}/>
          
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}/>
            <Route path="/doctors" element={<Doctors />}/>
            <Route path="/Patients" element={<Patient />}/>
            <Route path="/Specialties" element={<Specialist/>}/>
            <Route path="/Schedules" element={<Schedules/>}/>
            <Route path="/appointments" element={<Appointment />}/>
            {/* 
            <Route path="/Report" element={<Report/>}/>        
            <Route path="/Setting" element={<Setting/>}/>
             */}
            
                

                    <Route path="reports" element={<div>صفحه گزارشات</div>} />
                    <Route path="settings" element={<div>صفحه تنظیمات</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
