import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  TrendingUp,
  Users,
  BookOpen,
  FileText,
  Award,
  DollarSign,
  Activity,
  Calendar,
  Download,
} from "lucide-react";

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("month");

  const stats = [
    {
      label: "Total Students",
      value: "2,543",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500",
    },
    {
      label: "Active Courses",
      value: "48",
      change: "+5%",
      icon: BookOpen,
      color: "bg-green-500",
    },
    {
      label: "Exams Conducted",
      value: "156",
      change: "+8%",
      icon: FileText,
      color: "bg-purple-500",
    },
    {
      label: "Revenue",
      value: "₹4.2L",
      change: "+15%",
      icon: DollarSign,
      color: "bg-orange-500",
    },
  ];

  const enrollmentData = [
    { month: "Jan", students: 420 },
    { month: "Feb", students: 580 },
    { month: "Mar", students: 720 },
    { month: "Apr", students: 850 },
    { month: "May", students: 1020 },
    { month: "Jun", students: 1240 },
  ];

  const topCourses = [
    {
      name: "Data Science Fundamentals",
      enrolled: 456,
      completion: 78,
      color: "bg-blue-500",
    },
    {
      name: "Web Development Bootcamp",
      enrolled: 389,
      completion: 85,
      color: "bg-green-500",
    },
    {
      name: "Machine Learning Advanced",
      enrolled: 342,
      completion: 72,
      color: "bg-purple-500",
    },
    {
      name: "Digital Marketing Mastery",
      enrolled: 298,
      completion: 91,
      color: "bg-orange-500",
    },
    {
      name: "Python Programming",
      enrolled: 267,
      completion: 88,
      color: "bg-pink-500",
    },
  ];

  const recentActivity = [
    {
      action: "New student enrolled",
      course: "Data Science",
      time: "5 min ago",
      type: "enrollment",
    },
    {
      action: "Exam completed",
      course: "Web Development",
      time: "12 min ago",
      type: "exam",
    },
    {
      action: "Course completed",
      course: "Python Programming",
      time: "1 hour ago",
      type: "completion",
    },
    {
      action: "Payment received",
      course: "Machine Learning",
      time: "2 hours ago",
      type: "payment",
    },
    {
      action: "New student enrolled",
      course: "Digital Marketing",
      time: "3 hours ago",
      type: "enrollment",
    },
  ];

  const performanceMetrics = [
    { label: "Average Completion Rate", value: "82.8%", trend: "up" },
    { label: "Student Satisfaction", value: "4.6/5", trend: "up" },
    { label: "Course Engagement", value: "76%", trend: "down" },
    { label: "Avg. Study Time", value: "3.2hrs", trend: "up" },
  ];

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-0 ml-6 p-0">
        {/* Header */}
        <div className="bg-white rounded-sm shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Activity className="w-8 h-8 text-orange-500" />
                Analytics Dashboard
              </h1>
              <p className="text-gray-600 mt-1">
                Track your platform performance and insights
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
              </select>
              <button className="px-4 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-sm p-6 border border-gray-100 hover:shadow-md transition"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-semibold text-green-600 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  {stat.change}
                </span>
              </div>
              <h3 className="text-gray-600 text-sm font-medium">
                {stat.label}
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Enrollment Trend */}
          <div className="lg:col-span-2 bg-white rounded-sm shadow-sm p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Student Enrollment Trend
              </h2>
              <div className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                <TrendingUp className="w-5 h-5" />
                <span>+24% growth</span>
              </div>
            </div>
            <div className="h-64 flex items-end justify-between gap-3">
              {enrollmentData.map((data, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center group"
                >
                  <div className="relative w-full">
                    <div
                      className="w-full bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg hover:from-orange-600 hover:to-orange-500 transition-all cursor-pointer"
                      style={{ height: `${(data.students / 1240) * 240}px` }}
                    >
                      <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition">
                        {data.students}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600 mt-3 font-medium">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      activity.type === "enrollment"
                        ? "bg-blue-100"
                        : activity.type === "exam"
                        ? "bg-purple-100"
                        : activity.type === "completion"
                        ? "bg-green-100"
                        : "bg-orange-100"
                    }`}
                  >
                    {activity.type === "enrollment" && (
                      <Users className="w-4 h-4 text-blue-500" />
                    )}
                    {activity.type === "exam" && (
                      <FileText className="w-4 h-4 text-purple-500" />
                    )}
                    {activity.type === "completion" && (
                      <Award className="w-4 h-4 text-green-500" />
                    )}
                    {activity.type === "payment" && (
                      <DollarSign className="w-4 h-4 text-orange-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-600">{activity.course}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {performanceMetrics.map((metric, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-sm p-6 border border-gray-100"
            >
              <h3 className="text-gray-600 text-sm font-medium mb-2">
                {metric.label}
              </h3>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-gray-800">
                  {metric.value}
                </p>
                <span
                  className={`text-xs font-semibold ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {metric.trend === "up" ? "↑" : "↓"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Top Courses */}
        <div className="bg-white rounded-sm shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-800">
              Top Performing Courses
            </h2>
            <button className="text-orange-500 text-sm font-semibold hover:text-orange-600">
              View All
            </button>
          </div>
          <div className="space-y-5">
            {topCourses.map((course, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{course.name}</h3>
                  <span className="text-sm text-gray-600">
                    {course.enrolled} enrolled
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                  <div
                    className={`${course.color} h-3 rounded-full transition-all duration-500`}
                    style={{ width: `${course.completion}%` }}
                  />
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    {course.completion}% completion rate
                  </span>
                  <span className="text-xs font-semibold text-gray-700">
                    #{index + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
