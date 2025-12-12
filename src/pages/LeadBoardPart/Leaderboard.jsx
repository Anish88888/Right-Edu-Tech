import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  TrendingUp,
  Users,
  Target,
  Zap,
  Search,
  Filter,
  Download,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

export default function LeaderBoard() {
  const [timeframe, setTimeframe] = useState("month");
  const [category, setCategory] = useState("overall");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({
    key: "points",
    direction: "desc",
  });

  // All students data
  const allStudents = [
    {
      rank: 1,
      name: "Rajesh Kumar",
      avatar: "RK",
      points: 9850,
      courses: 12,
      badges: 45,
      streak: 89,
    },
    {
      rank: 2,
      name: "Priya Sharma",
      avatar: "PS",
      points: 9320,
      courses: 11,
      badges: 42,
      streak: 76,
    },
    {
      rank: 3,
      name: "Amit Patel",
      avatar: "AP",
      points: 8940,
      courses: 10,
      badges: 38,
      streak: 68,
    },
    {
      rank: 4,
      name: "Sneha Singh",
      avatar: "SS",
      points: 8650,
      courses: 9,
      badges: 35,
      streak: 62,
    },
    {
      rank: 5,
      name: "Vikram Mehta",
      avatar: "VM",
      points: 8420,
      courses: 9,
      badges: 33,
      streak: 58,
    },
    {
      rank: 6,
      name: "Neha Gupta",
      avatar: "NG",
      points: 8180,
      courses: 8,
      badges: 31,
      streak: 54,
    },
    {
      rank: 7,
      name: "Rahul Verma",
      avatar: "RV",
      points: 7950,
      courses: 8,
      badges: 29,
      streak: 51,
    },
    {
      rank: 8,
      name: "Anjali Reddy",
      avatar: "AR",
      points: 7720,
      courses: 7,
      badges: 27,
      streak: 47,
    },
    {
      rank: 9,
      name: "Karan Joshi",
      avatar: "KJ",
      points: 7490,
      courses: 7,
      badges: 25,
      streak: 43,
    },
    {
      rank: 10,
      name: "Pooja Nair",
      avatar: "PN",
      points: 7260,
      courses: 6,
      badges: 23,
      streak: 39,
    },
  ];

  const categories = [
    { id: "overall", name: "Overall", icon: Trophy },
    { id: "courses", name: "Courses", icon: Target },
    { id: "streak", name: "Streak", icon: Zap },
    { id: "badges", name: "Badges", icon: Award },
  ];

  // Calculate achievements based on data
  const achievements = useMemo(() => {
    const totalStudents = allStudents.length;
    const totalBadges = allStudents.reduce((sum, s) => sum + s.badges, 0);
    const totalCourses = allStudents.reduce((sum, s) => sum + s.courses, 0);
    const avgStreak = Math.round(
      allStudents.reduce((sum, s) => sum + s.streak, 0) / totalStudents
    );

    return [
      {
        icon: Trophy,
        label: "Total Winners",
        value: totalStudents.toString(),
        color: "bg-yellow-500",
      },
      {
        icon: Award,
        label: "Total Badges",
        value: totalBadges.toString(),
        color: "bg-purple-500",
      },
      {
        icon: Target,
        label: "Total Courses",
        value: totalCourses.toString(),
        color: "bg-blue-500",
      },
      {
        icon: Zap,
        label: "Avg Streak",
        value: `${avgStreak} days`,
        color: "bg-green-500",
      },
    ];
  }, [allStudents]);

  // Sort and filter students
  const sortedAndFilteredStudents = useMemo(() => {
    let filtered = [...allStudents];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort by category or custom sort
    const sortKey = category === "overall" ? sortConfig.key : category;
    filtered.sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (sortConfig.direction === "asc") {
        return aValue > bValue ? 1 : -1;
      }
      return aValue < bValue ? 1 : -1;
    });

    // Reassign ranks based on sorted order
    return filtered.map((student, index) => ({
      ...student,
      rank: index + 1,
    }));
  }, [allStudents, searchQuery, category, sortConfig]);

  const topThree = sortedAndFilteredStudents.slice(0, 3);
  const remainingStudents = sortedAndFilteredStudents.slice(3);

  // Handle sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "desc" ? "asc" : "desc",
    }));
  };

  // Handle export
  const handleExport = () => {
    const csv = [
      ["Rank", "Name", "Points", "Courses", "Badges", "Streak"],
      ...sortedAndFilteredStudents.map((s) => [
        s.rank,
        s.name,
        s.points,
        s.courses,
        s.badges,
        s.streak,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leaderboard-${timeframe}-${category}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const getPodiumColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-yellow-500";
    if (rank === 2) return "from-gray-300 to-gray-400";
    return "from-orange-400 to-orange-500";
  };

  const SortIcon = ({ columnKey }) => {
    if (sortConfig.key !== columnKey)
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="w-4 h-4" />
    ) : (
      <ChevronDown className="w-4 h-4" />
    );
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-0 ml-6 p-0">
        {/* Header */}
        <div className="bg-white rounded-sm shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Trophy className="w-8 h-8 text-orange-500" />
                Leader Board
              </h1>
              <p className="text-gray-600 mt-1">
                Top performers and achievers on the platform
              </p>
            </div>
            <div className="flex gap-3">
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="year">This Year</option>
                <option value="alltime">All Time</option>
              </select>
              <button
                onClick={handleExport}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white rounded-sm shadow-sm p-6 border border-gray-100 hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className={`${achievement.color} p-3 rounded-lg`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mt-4">
                {achievement.label}
              </h3>
              <p className="text-3xl font-bold text-gray-800 mt-2">
                {achievement.value}
              </p>
            </div>
          ))}
        </div>

        {/* Category Tabs & Search */}
        <div className="bg-white rounded-sm shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                    category === cat.id
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Top 3 Podium */}
        {topThree.length >= 3 && (
          <div className="bg-white rounded-sm shadow-sm p-8 mb-6 border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
              Top Performers
            </h2>
            <div className="flex items-end justify-center gap-8 mb-4">
              {/* 2nd Place */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${getPodiumColor(
                      2
                    )} flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg`}
                  >
                    {topThree[1].avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-gray-400 rounded-full p-2 border-2 border-white">
                    <Medal className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-xl px-8 py-6 text-center min-w-[160px]">
                  <div className="text-white font-bold text-3xl mb-1">2</div>
                  <div className="text-white font-semibold">
                    {topThree[1].name}
                  </div>
                  <div className="text-white text-sm mt-2">
                    {topThree[1].points} pts
                  </div>
                  <div className="flex justify-center gap-3 mt-3 text-white text-xs">
                    <span>📚 {topThree[1].courses}</span>
                    <span>🏆 {topThree[1].badges}</span>
                    <span>🔥 {topThree[1].streak}</span>
                  </div>
                </div>
              </div>

              {/* 1st Place */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div
                    className={`w-24 h-24 rounded-full bg-gradient-to-br ${getPodiumColor(
                      1
                    )} flex items-center justify-center text-white font-bold text-3xl border-4 border-white shadow-2xl`}
                  >
                    {topThree[0].avatar}
                  </div>
                  <div className="absolute -top-3 -right-3 bg-yellow-400 rounded-full p-2 border-2 border-white animate-pulse">
                    <Crown className="w-6 h-6 text-yellow-800" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-t-xl px-8 py-8 text-center min-w-[180px]">
                  <div className="text-yellow-900 font-bold text-4xl mb-1">
                    1
                  </div>
                  <div className="text-yellow-900 font-bold text-lg">
                    {topThree[0].name}
                  </div>
                  <div className="text-yellow-900 font-semibold mt-2">
                    {topThree[0].points} pts
                  </div>
                  <div className="flex justify-center gap-3 mt-3 text-yellow-900 text-xs">
                    <span>📚 {topThree[0].courses}</span>
                    <span>🏆 {topThree[0].badges}</span>
                    <span>🔥 {topThree[0].streak}</span>
                  </div>
                </div>
              </div>

              {/* 3rd Place */}
              <div className="flex flex-col items-center">
                <div className="relative mb-4">
                  <div
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${getPodiumColor(
                      3
                    )} flex items-center justify-center text-white font-bold text-2xl border-4 border-white shadow-lg`}
                  >
                    {topThree[2].avatar}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-orange-500 rounded-full p-2 border-2 border-white">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-400 to-orange-500 rounded-t-xl px-8 py-6 text-center min-w-[160px]">
                  <div className="text-white font-bold text-3xl mb-1">3</div>
                  <div className="text-white font-semibold">
                    {topThree[2].name}
                  </div>
                  <div className="text-white text-sm mt-2">
                    {topThree[2].points} pts
                  </div>
                  <div className="flex justify-center gap-3 mt-3 text-white text-xs">
                    <span>📚 {topThree[2].courses}</span>
                    <span>🏆 {topThree[2].badges}</span>
                    <span>🔥 {topThree[2].streak}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Full Leaderboard Table */}
        <div className="bg-white rounded-sm shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">
              Rankings ({sortedAndFilteredStudents.length})
            </h2>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="text-sm text-orange-500 hover:text-orange-600"
              >
                Clear search
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Rank
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Student
                  </th>
                  <th
                    onClick={() => handleSort("points")}
                    className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Points
                      <SortIcon columnKey="points" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("courses")}
                    className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Courses
                      <SortIcon columnKey="courses" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("badges")}
                    className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Badges
                      <SortIcon columnKey="badges" />
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort("streak")}
                    className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                  >
                    <div className="flex items-center justify-center gap-1">
                      Streak
                      <SortIcon columnKey="streak" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sortedAndFilteredStudents.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-8 text-center text-gray-500"
                    >
                      No students found matching "{searchQuery}"
                    </td>
                  </tr>
                ) : (
                  sortedAndFilteredStudents.map((student) => (
                    <tr
                      key={student.rank}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            student.rank <= 3
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          } font-bold text-sm`}
                        >
                          {student.rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white font-semibold">
                            {student.avatar}
                          </div>
                          <span className="font-semibold text-gray-800">
                            {student.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-bold text-gray-800">
                          {student.points.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-700">{student.courses}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                          <Award className="w-4 h-4" />
                          {student.badges}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                          <Zap className="w-4 h-4" />
                          {student.streak}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
