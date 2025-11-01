import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import {
  Users,
  BookOpen,
  FileQuestion,
  FileText,
  Cake,
  Calendar,
  Award,
  Clock,
  ArrowUp,
  ArrowDown,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      change: "+12%",
      isPositive: true,
      icon: Users,
      lightColor: "bg-gradient-to-br from-blue-50 to-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Total Courses",
      value: "45",
      change: "+8%",
      isPositive: true,
      icon: BookOpen,
      lightColor: "bg-gradient-to-br from-orange-50 to-orange-100",
      textColor: "text-orange-600",
    },
    {
      title: "Total Questions",
      value: "3,567",
      change: "+23%",
      isPositive: true,
      icon: FileQuestion,
      lightColor: "bg-gradient-to-br from-purple-50 to-purple-100",
      textColor: "text-purple-600",
    },
    {
      title: "Question Papers",
      value: "89",
      change: "+5%",
      isPositive: true,
      icon: FileText,
      lightColor: "bg-gradient-to-br from-green-50 to-green-100",
      textColor: "text-green-600",
    },
  ];

  const enrollmentData = [
    { month: "Jan", students: 120 },
    { month: "Feb", students: 180 },
    { month: "Mar", students: 250 },
    { month: "Apr", students: 320 },
    { month: "May", students: 400 },
    { month: "Jun", students: 480 },
    { month: "Jul", students: 550 },
    { month: "Aug", students: 620 },
  ];

  const courseData = [
    { name: "Mathematics", value: 30, color: "#f97316" },
    { name: "Science", value: 25, color: "#3b82f6" },
    { name: "English", value: 20, color: "#8b5cf6" },
    { name: "History", value: 15, color: "#10b981" },
    { name: "Others", value: 10, color: "#6366f1" },
  ];

  const performanceData = [
    { subject: "Math", score: 85 },
    { subject: "Science", score: 78 },
    { subject: "English", score: 92 },
    { subject: "History", score: 75 },
    { subject: "Geography", score: 88 },
  ];

  const transactions = [
    {
      id: "TXN001",
      student: "Rajesh Kumar",
      course: "Mathematics Pro",
      amount: "₹4,999",
      status: "Completed",
    },
    {
      id: "TXN002",
      student: "Priya Sharma",
      course: "Science Master",
      amount: "₹3,499",
      status: "Completed",
    },
    {
      id: "TXN003",
      student: "Amit Patel",
      course: "English Plus",
      amount: "₹2,999",
      status: "Pending",
    },
    {
      id: "TXN004",
      student: "Sneha Singh",
      course: "History Deluxe",
      amount: "₹3,999",
      status: "Completed",
    },
    {
      id: "TXN005",
      student: "Rahul Verma",
      course: "Geography Expert",
      amount: "₹4,499",
      status: "Completed",
    },
  ];

  const birthdayStudents = [
    { name: "Aarav Gupta", class: "Class 10A", date: "Today", avatar: "AG" },
    { name: "Diya Reddy", class: "Class 9B", date: "Tomorrow", avatar: "DR" },
    { name: "Vihaan Joshi", class: "Class 11C", date: "Oct 31", avatar: "VJ" },
  ];

  const recentActivities = [
    {
      action: "New enrollment",
      student: "Ishaan Mehta",
      time: "5 min ago",
      icon: Users,
    },
    {
      action: "Course completed",
      student: "Ananya Singh",
      time: "15 min ago",
      icon: Award,
    },
    {
      action: "Exam scheduled",
      course: "Mathematics Final",
      time: "1 hour ago",
      icon: Calendar,
    },
    {
      action: "Payment received",
      student: "Rohan Kapoor",
      time: "2 hours ago",
      icon: DollarSign,
    },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-4">
        <div className="max-w-[99rem] ml-2 mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-sm shadow-sm p-6 hover:shadow-xl transition-all duration-300 border border-gray-200 hover:scale-105 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`${stat.lightColor} p-4 rounded-sm shadow-sm group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${stat.textColor}`} />
                    </div>
                    <span
                      className={`flex items-center text-sm font-bold px-3 py-1 rounded-full ${
                        stat.isPositive
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.isPositive ? (
                        <ArrowUp className="w-4 h-4 mr-1" />
                      ) : (
                        <ArrowDown className="w-4 h-4 mr-1" />
                      )}
                      {stat.change}
                    </span>
                  </div>
                  <h3 className="text-gray-600 text-sm font-semibold mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-4xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mb-4">
            {/* Student Enrollment Chart */}
            <div className="bg-gradient-to-br from-white to-orange-50 rounded-sm shadow-sm p-6 border border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Student Enrollment
                  </h2>
                  <p className="text-sm text-gray-600">Monthly growth trend</p>
                </div>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-4 py-2 border-2 border-orange-200 rounded-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white shadow-sm hover:border-orange-300 transition-colors"
                >
                  <option value="week">Week</option>
                  <option value="month">Month</option>
                  <option value="year">Year</option>
                </select>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={enrollmentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    stroke="#9ca3af"
                    style={{ fontSize: "12px", fontWeight: "600" }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    style={{ fontSize: "12px", fontWeight: "600" }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "2px solid #fed7aa",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="students"
                    stroke="#f97316"
                    strokeWidth={4}
                    dot={{
                      fill: "#f97316",
                      r: 6,
                      strokeWidth: 2,
                      stroke: "#fff",
                    }}
                    activeDot={{ r: 8, strokeWidth: 2, stroke: "#fff" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Course Distribution Chart */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-sm shadow-sm p-6 border border-purple-200 hover:shadow-xl transition-all duration-300">
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900 mb-1">
                  Course Distribution
                </h2>
                <p className="text-sm text-gray-600">
                  Active courses by category
                </p>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <PieChart>
                  <Pie
                    data={courseData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                    strokeWidth={3}
                    stroke="#fff"
                  >
                    {courseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "2px solid #e9d5ff",
                      borderRadius: "12px",
                      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Performance Analytics */}
          <div className="bg-gradient-to-br from-white to-blue-50 rounded-sm shadow-sm p-6 mb-4 border border-blue-200 hover:shadow-xl transition-all duration-300">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Performance Analytics
              </h2>
              <p className="text-sm text-gray-600">Average scores by subject</p>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="subject"
                  stroke="#9ca3af"
                  style={{ fontSize: "12px", fontWeight: "600" }}
                />
                <YAxis
                  stroke="#9ca3af"
                  style={{ fontSize: "12px", fontWeight: "600" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "2px solid #bfdbfe",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="score" fill="#f97316" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Transactions Table & Birthday Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 mb-4">
            {/* Transactions */}
            <div className="lg:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-sm shadow-sm p-6 border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    Recent Transactions
                  </h2>
                  <p className="text-sm text-gray-600">
                    Latest payment activities
                  </p>
                </div>
                <button className="text-orange-600 text-sm font-bold hover:text-orange-700 px-4 py-2 rounded-sm hover:bg-orange-50 transition-colors">
                  View All →
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Transaction ID
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Course
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="text-left py-4 px-4 text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr
                        key={txn.id}
                        className="border-b border-gray-100 hover:bg-gradient-to-r hover:from-orange-50 hover:to-transparent transition-all duration-200"
                      >
                        <td className="py-4 px-4 text-sm font-bold text-gray-800">
                          {txn.id}
                        </td>
                        <td className="py-4 px-4 text-sm font-medium text-gray-700">
                          {txn.student}
                        </td>
                        <td className="py-4 px-4 text-sm text-gray-600">
                          {txn.course}
                        </td>
                        <td className="py-4 px-4 text-sm font-bold text-gray-900">
                          {txn.amount}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-4 py-2 rounded-full text-xs font-bold shadow-sm ${
                              txn.status === "Completed"
                                ? "bg-green-100 text-green-700 border border-green-200"
                                : "bg-yellow-100 text-yellow-700 border border-yellow-200"
                            }`}
                          >
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Birthday Cards */}
            <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 rounded-sm shadow-sm p-6 border-2 border-orange-200 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-2 mb-6">
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-2 rounded-lg shadow-md">
                  <Cake className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Birthdays</h2>
                  <p className="text-xs text-gray-600">Upcoming celebrations</p>
                </div>
              </div>
              <div className="space-y-4">
                {birthdayStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-sm bg-white border-2 border-orange-200 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                      {student.avatar}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 text-sm">
                        {student.name}
                      </h3>
                      <p className="text-xs text-gray-600 font-medium">
                        {student.class}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
                        {student.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-gradient-to-br from-white to-indigo-50 rounded-sm shadow-sm p-6 border border-indigo-200 hover:shadow-xl transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Recent Activities
              </h2>
              <p className="text-sm text-gray-600">Latest updates and events</p>
            </div>
            <div className="space-y-3">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 hover:bg-white rounded-sm transition-all duration-200 border border-transparent hover:border-indigo-200 hover:shadow-md group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-orange-200 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-gray-900">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-600 font-medium">
                        {activity.student || activity.course}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-semibold bg-gray-100 px-3 py-2 rounded-lg">
                      <Clock className="w-4 h-4" />
                      {activity.time}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
