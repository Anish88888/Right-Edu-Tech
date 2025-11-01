import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentProfile from "./pages/StudentManagement/StudentProfile";
import StudentEnrolment from "./pages/StudentManagement/StudentEnrollment";

import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/student-management/profile-view"
          element={<StudentProfile />}
        />
        <Route
          path="/student-management/enrollment"
          element={<StudentEnrolment />}
        />
      </Routes>
    </Router>
  );
}

export default App;
