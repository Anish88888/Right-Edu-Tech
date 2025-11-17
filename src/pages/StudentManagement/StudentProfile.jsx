import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  User,
  Edit,
  GraduationCap,
  Search,
  Filter,
  Download,
  Mail,
  Lock,
  Ban,
  CheckCircle,
  Eye,
  X,
  Phone,
  MapPin,
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  FileText,
  Bell,
} from "lucide-react";

const StudentManagement = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState("info");
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    status: "all",
    class: "all",
    stream: "all",
    batch: "all",
    addedBy: "all",
    gender: "all",
  });

  const students = [
    {
      id: "STU2025123",
      name: "Aarav Sharma",
      gender: "Male",
      class: "10",
      stream: "Science",
      city: "Delhi",
      batch: "A",
      progress: "90%",
      status: "Active",
      addedBy: "John",
      email: "aarav.sharma@email.com",
      mobile: "+91 98765 43210",
      joiningDate: "2024-04-15",
      lastLogin: "2025-10-30",
      attendance: "95%",
      totalMarks: 450,
      enrolledCourses: ["Physics Advanced", "Chemistry", "Mathematics"],
      certificates: 3,
      rank: 5,
    },
    {
      id: "STU2025124",
      name: "Riya Patel",
      gender: "Female",
      class: "12",
      stream: "Commerce",
      city: "Mumbai",
      batch: "B",
      progress: "75%",
      status: "Inactive",
      addedBy: "Rohit",
      email: "riya.patel@email.com",
      mobile: "+91 98765 43211",
      joiningDate: "2024-03-20",
      lastLogin: "2025-10-15",
      attendance: "78%",
      totalMarks: 380,
      enrolledCourses: ["Accountancy", "Business Studies", "Economics"],
      certificates: 2,
      rank: 12,
    },
    {
      id: "STU2025125",
      name: "Arjun Verma",
      gender: "Male",
      class: "11",
      stream: "Science",
      city: "Jaipur",
      batch: "A",
      progress: "88%",
      status: "Active",
      addedBy: "John",
      email: "arjun.verma@email.com",
      mobile: "+91 98765 43212",
      joiningDate: "2024-05-10",
      lastLogin: "2025-10-31",
      attendance: "92%",
      totalMarks: 440,
      enrolledCourses: ["Physics", "Chemistry", "Biology"],
      certificates: 4,
      rank: 7,
    },
    {
      id: "STU2025126",
      name: "Sneha Gupta",
      gender: "Female",
      class: "10",
      stream: "Science",
      city: "Lucknow",
      batch: "C",
      progress: "92%",
      status: "Active",
      addedBy: "Rohit",
      email: "sneha.gupta@email.com",
      mobile: "+91 98765 43213",
      joiningDate: "2024-04-01",
      lastLogin: "2025-10-31",
      attendance: "97%",
      totalMarks: 460,
      enrolledCourses: [
        "Physics",
        "Chemistry",
        "Mathematics",
        "Computer Science",
      ],
      certificates: 5,
      rank: 3,
    },
    {
      id: "STU2025127",
      name: "Vivek Kumar",
      gender: "Male",
      class: "12",
      stream: "Science",
      city: "Patna",
      batch: "A",
      progress: "85%",
      status: "Active",
      addedBy: "John",
      email: "vivek.kumar@email.com",
      mobile: "+91 98765 43214",
      joiningDate: "2024-02-10",
      lastLogin: "2025-10-31",
      attendance: "90%",
      totalMarks: 425,
      enrolledCourses: ["Physics", "Chemistry", "Mathematics", "Biology"],
      certificates: 6,
      rank: 8,
    },
    {
      id: "STU2025128",
      name: "Priya Singh",
      gender: "Female",
      class: "11",
      stream: "Commerce",
      city: "Bangalore",
      batch: "B",
      progress: "80%",
      status: "Active",
      addedBy: "Rohit",
      email: "priya.singh@email.com",
      mobile: "+91 98765 43215",
      joiningDate: "2024-06-15",
      lastLogin: "2025-10-30",
      attendance: "88%",
      totalMarks: 400,
      enrolledCourses: ["Accountancy", "Business Studies", "Economics"],
      certificates: 3,
      rank: 10,
    },
  ];

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.mobile.includes(searchTerm);

    const matchesStatus =
      filters.status === "all" ||
      student.status.toLowerCase() === filters.status;
    const matchesClass =
      filters.class === "all" || student.class === filters.class;
    const matchesStream =
      filters.stream === "all" || student.stream === filters.stream;
    const matchesBatch =
      filters.batch === "all" || student.batch === filters.batch;
    const matchesAddedBy =
      filters.addedBy === "all" || student.addedBy === filters.addedBy;
    const matchesGender =
      filters.gender === "all" ||
      student.gender.toLowerCase() === filters.gender;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesClass &&
      matchesStream &&
      matchesBatch &&
      matchesAddedBy &&
      matchesGender
    );
  });

  const InfoRow = ({ icon: Icon, label, value }) => (
    <div className="flex items-start gap-3">
      {Icon && <Icon className="text-gray-400 mt-0.5" size={18} />}
      <div className="flex-1">
        <p className="text-sm text-gray-500">{label}</p>
        <p className="font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );

  const StatCard = ({ label, value, color }) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600",
      purple: "bg-purple-50 text-purple-600",
      green: "bg-green-50 text-green-600",
      orange: "bg-orange-50 text-orange-600",
    };
    return (
      <div className={`${colors[color]} rounded-lg p-4 text-center`}>
        <p className="text-sm font-medium mb-1">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    );
  };

  const StudentProfileModal = ({ student, onClose }) => {
    const tabs = [
      { id: "info", label: "Student Information", icon: User },
      { id: "academic", label: "Academic Details", icon: BookOpen },
      { id: "courses", label: "Enrolled Courses", icon: GraduationCap },
      { id: "exams", label: "Exam History", icon: FileText },
      { id: "certificates", label: "Certificates", icon: Award },
      { id: "performance", label: "Performance", icon: TrendingUp },
      { id: "attendance", label: "Attendance", icon: CheckCircle },
      { id: "notes", label: "Admin Notes", icon: FileText },
    ];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ml-6 font-bold z-50 p-0">
        <div className="bg-white rounded-sm w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col">
          {/* Header */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                <User size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{student.name}</h2>
                <p className="text-orange-100">
                  {student.id} • {student.stream} • Class {student.class}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white hover:bg-opacity-20 rounded-lg transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Tabs */}
          <div className="border-b overflow-x-auto">
            <div className="flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "text-orange-600 border-b-2 border-orange-600"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <Icon size={16} />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "info" && (
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Personal Information
                  </h3>
                  <div className="space-y-3">
                    <InfoRow
                      icon={User}
                      label="Full Name"
                      value={student.name}
                    />
                    <InfoRow icon={Mail} label="Email" value={student.email} />
                    <InfoRow
                      icon={Phone}
                      label="Mobile"
                      value={student.mobile}
                    />
                    <InfoRow icon={MapPin} label="City" value={student.city} />
                    <InfoRow label="Gender" value={student.gender} />
                    <InfoRow
                      label="Status"
                      value={
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {student.status}
                        </span>
                      }
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg text-gray-900 mb-4">
                    Registration Details
                  </h3>
                  <div className="space-y-3">
                    <InfoRow
                      icon={Calendar}
                      label="Joining Date"
                      value={student.joiningDate}
                    />
                    <InfoRow
                      icon={Calendar}
                      label="Last Login"
                      value={student.lastLogin}
                    />
                    <InfoRow label="Added By" value={student.addedBy} />
                    <InfoRow label="Student ID" value={student.id} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "academic" && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <StatCard label="Class" value={student.class} color="blue" />
                  <StatCard
                    label="Stream"
                    value={student.stream}
                    color="purple"
                  />
                  <StatCard label="Batch" value={student.batch} color="green" />
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-4">
                    Academic Performance
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Total Marks</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {student.totalMarks}/500
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Overall Progress</p>
                      <p className="text-2xl font-bold text-orange-600">
                        {student.progress}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "courses" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">
                  Enrolled Courses ({student.enrolledCourses.length})
                </h3>
                {student.enrolledCourses.map((course, idx) => (
                  <div
                    key={idx}
                    className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                        <BookOpen className="text-orange-600" size={20} />
                      </div>
                      <div>
                        <p className="font-medium">{course}</p>
                        <p className="text-sm text-gray-500">Active Course</p>
                      </div>
                    </div>
                    <button className="text-orange-600 text-sm font-medium hover:underline">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "exams" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Recent Exams</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="p-3 text-left font-semibold">
                          Exam Name
                        </th>
                        <th className="p-3 text-left font-semibold">Date</th>
                        <th className="p-3 text-left font-semibold">Marks</th>
                        <th className="p-3 text-left font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t">
                        <td className="p-3">Mid-Term Physics</td>
                        <td className="p-3">2025-09-15</td>
                        <td className="p-3 font-medium">85/100</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                            Passed
                          </span>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Chemistry Quiz</td>
                        <td className="p-3">2025-09-20</td>
                        <td className="p-3 font-medium">92/100</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                            Passed
                          </span>
                        </td>
                      </tr>
                      <tr className="border-t">
                        <td className="p-3">Mathematics Final</td>
                        <td className="p-3">2025-10-05</td>
                        <td className="p-3 font-medium">88/100</td>
                        <td className="p-3">
                          <span className="px-2 py-1 bg-green-100 text-green-600 rounded-full text-xs">
                            Passed
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "certificates" && (
              <div className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">
                  Certificates Earned ({student.certificates})
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {Array.from({ length: student.certificates }).map(
                    (_, cert) => (
                      <div
                        key={cert}
                        className="border rounded-lg p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                          <Award className="text-orange-600" size={24} />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">
                            Course Completion Certificate
                          </p>
                          <p className="text-sm text-gray-500">
                            Issued on: Oct 2025
                          </p>
                          <button className="text-orange-600 text-sm font-medium hover:underline mt-2">
                            Download
                          </button>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}

            {activeTab === "performance" && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <StatCard
                    label="Overall Rank"
                    value={`#${student.rank}`}
                    color="orange"
                  />
                  <StatCard
                    label="Attendance"
                    value={student.attendance}
                    color="green"
                  />
                  <StatCard
                    label="Progress"
                    value={student.progress}
                    color="blue"
                  />
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Performance Trend</h3>
                  <div className="h-48 flex items-end gap-2">
                    {[65, 70, 75, 82, 88, 90].map((val, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-orange-500 rounded-t"
                        style={{ height: `${val}%` }}
                      ></div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "attendance" && (
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <p className="text-sm text-green-600 mb-2">
                    Overall Attendance
                  </p>
                  <p className="text-4xl font-bold text-green-700">
                    {student.attendance}
                  </p>
                  <p className="text-sm text-green-600 mt-2">
                    Excellent Attendance Record
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-3">Monthly Breakdown</h3>
                  <div className="space-y-2">
                    {["September", "August", "July"].map((month, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm text-gray-600">
                          {month} 2025
                        </span>
                        <span className="text-sm font-medium">
                          {[95, 93, 97][idx]}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "notes" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg">
                    Internal Admin Notes
                  </h3>
                  <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 transition-colors">
                    Add Note
                  </button>
                </div>
                <div className="border rounded-lg p-6 bg-gray-50 text-center">
                  <FileText className="mx-auto text-gray-300 mb-2" size={48} />
                  <p className="text-sm text-gray-600">No notes added yet</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Add internal remarks about this student
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="border-t p-4 bg-gray-50 flex gap-3 justify-end">
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors">
              <Lock size={16} />
              Reset Password
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-100 flex items-center gap-2 transition-colors">
              <Mail size={16} />
              Send Notification
            </button>
            <button className="px-4 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600 flex items-center gap-2 transition-colors">
              <Edit size={16} />
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white ml-6 p-0">
        <div className="max-w-8xl ml-2 mx-auto space-y-4">
          {/* Header + Search + Filters + Buttons (Single Row) */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border border-gray-200 rounded-sm p-4">
            {/* Left Side: Search + Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full md:w-96">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  placeholder="Search by name, ID, email, or mobile..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                />
              </div>

              {/* Filters Button */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`px-4 py-2 border border-gray-300 rounded-sm flex items-center gap-2 text-sm transition-colors ${
                  showFilters
                    ? "bg-orange-50 border-orange-300 text-orange-600"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Filter size={18} />
                Filters
              </button>
            </div>

            {/* Right Side: Export + Add Student */}
            <div className="flex items-center gap-3">
              {/* Export Data */}
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-sm text-sm hover:bg-gray-50 flex items-center gap-2 transition-colors">
                <Download size={16} />
                Export Data
              </button>

              {/* Add Student */}
              <button className="px-4 py-2 bg-orange-500 text-white rounded-sm text-sm hover:bg-orange-600 flex items-center gap-2 transition-colors">
                <User size={16} />
                Add Student
              </button>
            </div>
          </div>

          {/* Filters (Shown when toggled) */}
          {showFilters && (
            <div className="bg-white rounded-lg border border-gray-200 p-4 grid grid-cols-6 gap-3">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              <select
                value={filters.class}
                onChange={(e) =>
                  setFilters({ ...filters, class: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Classes</option>
                <option value="10">Class 10</option>
                <option value="11">Class 11</option>
                <option value="12">Class 12</option>
              </select>

              <select
                value={filters.stream}
                onChange={(e) =>
                  setFilters({ ...filters, stream: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Streams</option>
                <option value="Science">Science</option>
                <option value="Commerce">Commerce</option>
                <option value="Arts">Arts</option>
              </select>

              <select
                value={filters.batch}
                onChange={(e) =>
                  setFilters({ ...filters, batch: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Batches</option>
                <option value="A">Batch A</option>
                <option value="B">Batch B</option>
                <option value="C">Batch C</option>
              </select>

              <select
                value={filters.gender}
                onChange={(e) =>
                  setFilters({ ...filters, gender: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">All Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>

              <select
                value={filters.addedBy}
                onChange={(e) =>
                  setFilters({ ...filters, addedBy: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="all">Added By All</option>
                <option value="John">John</option>
                <option value="Rohit">Rohit</option>
              </select>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {students.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-sm flex items-center justify-center">
                  <User className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Active Students</p>
                  <p className="text-2xl font-bold text-green-600 mt-1">
                    {students.filter((s) => s.status === "Active").length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-sm flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Avg. Progress</p>
                  <p className="text-2xl font-bold text-orange-600 mt-1">86%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-sm flex items-center justify-center">
                  <TrendingUp className="text-orange-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total Certificates</p>
                  <p className="text-2xl font-bold text-purple-600 mt-1">
                    {students.reduce((sum, s) => sum + s.certificates, 0)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-sm flex items-center justify-center">
                  <Award className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Student Table */}
          <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-orange-600 text-white">
                  <tr>
                    <th className="p-3 text-left font-semibold">Student ID</th>
                    <th className="p-3 text-left font-semibold">Name</th>
                    <th className="p-3 text-left font-semibold">Gender</th>
                    <th className="p-3 text-left font-semibold">Class</th>
                    <th className="p-3 text-left font-semibold">Stream</th>
                    <th className="p-3 text-left font-semibold">City</th>
                    <th className="p-3 text-left font-semibold">Batch</th>
                    <th className="p-3 text-left font-semibold">Progress</th>
                    <th className="p-3 text-left font-semibold">Status</th>
                    <th className="p-3 text-left font-semibold">Added By</th>
                    <th className="p-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((stu) => (
                    <tr
                      key={stu.id}
                      className="border-t border-gray-100 hover:bg-orange-50 transition-colors"
                    >
                      <td className="p-3 font-medium text-gray-900">
                        {stu.id}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                            <User className="text-orange-600" size={16} />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">
                              {stu.name}
                            </p>
                            <p className="text-xs text-gray-500">{stu.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-3 text-gray-600">{stu.gender}</td>
                      <td className="p-3 text-gray-600">{stu.class}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-purple-100 text-purple-600 rounded text-xs font-medium">
                          {stu.stream}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{stu.city}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-600 rounded text-xs font-medium">
                          {stu.batch}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2 w-16">
                            <div
                              className="bg-orange-500 h-2 rounded-full"
                              style={{ width: stu.progress }}
                            ></div>
                          </div>
                          <span className="font-medium text-orange-600 text-xs">
                            {stu.progress}
                          </span>
                        </div>
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            stu.status === "Active"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-500"
                          }`}
                        >
                          {stu.status}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">{stu.addedBy}</td>
                      <td className="p-3 font-bold">
                        <div className="flex gap-1">
                          <button
                            onClick={() => setSelectedStudent(stu)}
                            className="p-2 hover:bg-orange-100 rounded-sm transition-colors"
                            title="View Profile"
                          >
                            <Eye size={14} className="text-orange-600" />
                          </button>
                          <button
                            className="p-2  hover:bg-blue-100 rounded-sm transition-colors"
                            title="Edit Profile"
                          >
                            <Edit size={14} className="text-blue-600" />
                          </button>
                          <button
                            className="p-2  hover:bg-purple-100 rounded-sm  transition-colors"
                            title="Assign to Batch"
                          >
                            <GraduationCap
                              size={14}
                              className="text-purple-600"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <User className="mx-auto text-gray-300 mb-3" size={48} />
                <p className="text-gray-500">
                  No students found matching your filters
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setFilters({
                      status: "all",
                      class: "all",
                      stream: "all",
                      batch: "all",
                      addedBy: "all",
                      gender: "all",
                    });
                  }}
                  className="mt-3 text-orange-600 text-sm hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredStudents.length > 0 && (
              <div className="border-t border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  Showing{" "}
                  <span className="font-medium">{filteredStudents.length}</span>{" "}
                  of <span className="font-medium">{students.length}</span>{" "}
                  students
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-orange-500 text-white rounded text-sm">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Student Profile Modal */}
        {selectedStudent && (
          <StudentProfileModal
            student={selectedStudent}
            onClose={() => setSelectedStudent(null)}
          />
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentManagement;
