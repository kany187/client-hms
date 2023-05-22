import { Component } from "react";

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

class App extends Component {
  state: any = {};

  componentDidMount() {
    const user = getCurrentUser();
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <Routes>
          <Route path="/login" Component={LogIn} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/staff" element={<Staffs user={this.state.user} />} />
          <Route path="/" element={<Home user={this.state.user} />} />
          <Route path="/patient" element={<Patient user={this.state.user} />} />
          <Route path="/add-patient" element={<AddPatient />} />
          <Route path="/patient/:id" element={<PatientProfile />} />
          <Route
            path="/appointment"
            element={<Appointment user={this.state.user} />}
          />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/doctor" element={<Doctor user={this.state.user} />} />
          <Route
            path="/doctor/:id"
            element={<DoctorProfile user={this.state.user} />}
          />
          <Route
            path="/department"
            element={<Department user={this.state.user} />}
          />
          <Route path="/profile" element={<Profile user={this.state.user} />} />
        </Routes>
      </div>
    );
  }
}

export default App;
