import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Super Admin Dashboard Pages
import Dashboard from "./pages/Dashboard";
// Student Management Pages
import StudentProfile from "./pages/StudentManagement/StudentProfile";
import StudentEnrolment from "./pages/StudentManagement/StudentEnrollment";

// course Management Pages
import AllCourse from "./pages/CourseManagement/AllCourse";

// Authentication Page
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        // Authentication Route
        <Route path="/" element={<Login />} />
        // Super Admin Dashboard Routes
        <Route path="/dashboard" element={<Dashboard />} />
        // Student Management Routes
        <Route
          path="/student-management/profile-view"
          element={<StudentProfile />}
        />
        <Route
          path="/student-management/enrollment"
          element={<StudentEnrolment />}
        />
        // Course Management Routes
        <Route path="/course-management/all-courses" element={<AllCourse />} />
      </Routes>
    </Router>
  );
}

export default App;
