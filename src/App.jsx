import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Top Bar Components Part
import TopBarNotification from "./pages/TopBarComponents/TopBarNotification";
import TopBarMail from "./pages/TopBarComponents/TopBarMail";
// Super Admin Dashboard Pages
import Dashboard from "./pages/Dashboard";
// Student Management Pages
import StudentProfile from "./pages/StudentManagement/StudentProfile";
import StudentEnrolment from "./pages/StudentManagement/StudentEnrollment";

// Exam Management Pages
import Exam from "./pages/ExamManagement/Exam";

// course Management Pages
import AllCourse from "./pages/CourseManagement/AllCourse";
// Question Management Pages
import QuestionBank from "./pages/QuestionPaperPart/QuestionBank";

//Reward & Awards Pages
import RewardAwards from "./pages/Reward&Award/RewardAwards";
// LeadBoard Pages
import Leaderboard from "./pages/LeadBoardPart/Leaderboard";
// Analytics Pages
import Analytics from "./pages/AnalyticsPart/Analytics";

// Transaction Pages
import Transactions from "./pages/TransactionPart/Transactions";

// Authentication Page
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        // Authentication Route
        <Route path="/" element={<Login />} />
        // Top Bar Components Routes
        <Route path="/notifications" element={<TopBarNotification />} />
        <Route path="/mail" element={<TopBarMail />} />
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
        // Exam Management Routes
        <Route path="/exam-management" element={<Exam />} />
        // Course Management Routes
        <Route path="/course-management/all-courses" element={<AllCourse />} />
        // Question Paper Routes
        <Route path="/question-papers" element={<QuestionBank />} />
        // Reward & Awards Routes
        <Route path="/rewards-awards" element={<RewardAwards />} />
        // Leaderboard Routes
        <Route path="/leader-board" element={<Leaderboard />} />
        // Analytics Routes
        <Route path="/analytics" element={<Analytics />} />
        // Transaction Routes
        <Route path="/transaction" element={<Transactions />} />
      </Routes>
    </Router>
  );
}

export default App;
