import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Staffs } from "./pages/Staff/Staffs";
import { Home } from "./pages/Home";
import { LogIn } from "./pages/LogIn/LogIn";
import { Register } from "./pages/LogIn/Register";
import Logout from "./pages/LogIn/Logout";

import { getCurrentUser } from "./services/user/auth-service";
import { Patient } from "./pages/Patient/Patient";
import { AddPatient } from "./components/Patient/AddPatient";
import { PatientProfile } from "./components/Patient/PatientProfile";
import { Appointment } from "./pages/Appointment/Appointment";
import AddAppointment from "./components/Appointment/AddAppointment/AddAppointment";
import { Doctor } from "./pages/Doctor/Doctor";
import { Department } from "./pages/Department/Department";
import { DoctorProfile } from "./pages/Doctor/DoctorProfile";
import { Profile } from "./pages/Profile/Profile";
import { Message } from "./pages/Message/Message";
import { User } from "./types";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      console.error("Error getting current user:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/staff" element={<Staffs user={user} />} />
        <Route path="/" element={<Home user={user} />} />
        <Route path="/patient" element={<Patient user={user} />} />
        <Route path="/add-patient" element={<AddPatient />} />
        <Route path="/patient/:id" element={<PatientProfile />} />
        <Route
          path="/appointment"
          element={<Appointment user={user} />}
        />
        <Route path="/add-appointment" element={<AddAppointment />} />
        <Route path="/doctor" element={<Doctor user={user} />} />
        <Route
          path="/doctor/:id"
          element={<DoctorProfile user={user} />}
        />
        <Route
          path="/department"
          element={<Department user={user} />}
        />
        <Route path="/message" element={<Message user={user} />} />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
    </div>
  );
};

export default App;
