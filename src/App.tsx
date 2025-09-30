import React, { useState, useEffect, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Box, Spinner, Center } from "@chakra-ui/react";
import { getCurrentUser } from "./services/user/auth-service";
import { User } from "./types";
import { ErrorBoundary } from "./components/Common/ErrorBoundary";
import { LoadingSpinner } from "./components/Common/LoadingSpinner";

// Lazy load components for better performance
const Staffs = lazy(() => import("./pages/Staff/Staffs").then(module => ({ default: module.Staffs })));
const Home = lazy(() => import("./pages/Home").then(module => ({ default: module.Home })));
const LogIn = lazy(() => import("./pages/LogIn/LogIn").then(module => ({ default: module.LogIn })));
const Register = lazy(() => import("./pages/LogIn/Register").then(module => ({ default: module.Register })));
const Logout = lazy(() => import("./pages/LogIn/Logout"));
const Patient = lazy(() => import("./pages/Patient/Patient").then(module => ({ default: module.Patient })));
const AddPatient = lazy(() => import("./components/Patient/AddPatient").then(module => ({ default: module.AddPatient })));
const PatientProfile = lazy(() => import("./components/Patient/PatientProfile").then(module => ({ default: module.PatientProfile })));
const Appointment = lazy(() => import("./pages/Appointment/Appointment").then(module => ({ default: module.Appointment })));
const AddAppointment = lazy(() => import("./components/Appointment/AddAppointment/AddAppointment"));
const Doctor = lazy(() => import("./pages/Doctor/Doctor").then(module => ({ default: module.Doctor })));
const Department = lazy(() => import("./pages/Department/Department").then(module => ({ default: module.Department })));
const DoctorProfile = lazy(() => import("./pages/Doctor/DoctorProfile").then(module => ({ default: module.DoctorProfile })));
const Profile = lazy(() => import("./pages/Profile/Profile").then(module => ({ default: module.Profile })));
const Message = lazy(() => import("./pages/Message/Message").then(module => ({ default: module.Message })));

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error getting current user:", error);
        setError("Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  if (isLoading) {
    return (
      <Center minH="100vh">
        <LoadingSpinner message="Initializing application..." />
      </Center>
    );
  }

  if (error) {
    return (
      <Center minH="100vh">
        <Box textAlign="center" p={8}>
          <Box color="red.500" mb={4}>
            Error: {error}
          </Box>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </Box>
      </Center>
    );
  }

  return (
    <ErrorBoundary>
      <Suspense fallback={
        <Center minH="100vh">
          <LoadingSpinner message="Loading page..." />
        </Center>
      }>
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
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
