import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  Award,
  Trophy,
  Star,
  Medal,
  Gift,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  Users,
  Calendar,
  CheckCircle,
  XCircle,
} from "lucide-react";

const RewardsAwardsSystem = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);

  // Sample data
  const [awards] = useState([
    {
      id: 1,
      name: "Perfect Attendance",
      type: "Achievement",
      points: 100,
      icon: "star",
      criteria: "Attend all classes for a month",
      recipients: 45,
      status: "active",
      dateCreated: "2024-01-15",
    },
    {
      id: 2,
      name: "Top Scorer",
      type: "Academic",
      points: 200,
      icon: "trophy",
      criteria: "Score above 90% in final exam",
      recipients: 23,
      status: "active",
      dateCreated: "2024-01-10",
    },
    {
      id: 3,
      name: "Quiz Master",
      type: "Academic",
      points: 150,
      icon: "medal",
      criteria: "Complete 50 quizzes with 80%+ score",
      recipients: 67,
      status: "active",
      dateCreated: "2024-02-01",
    },
    {
      id: 4,
      name: "Helpful Peer",
      type: "Social",
      points: 75,
      icon: "award",
      criteria: "Help 10 classmates with assignments",
      recipients: 12,
      status: "active",
      dateCreated: "2024-01-20",
    },
  ]);

  const [recentRecipients] = useState([
    {
      id: 1,
      student: "Rahul Kumar",
      award: "Top Scorer",
      date: "2024-11-15",
      points: 200,
    },
    {
      id: 2,
      student: "Priya Singh",
      award: "Perfect Attendance",
      date: "2024-11-14",
      points: 100,
    },
    {
      id: 3,
      student: "Amit Sharma",
      award: "Quiz Master",
      date: "2024-11-13",
      points: 150,
    },
    {
      id: 4,
      student: "Neha Patel",
      award: "Helpful Peer",
      date: "2024-11-12",
      points: 75,
    },
    {
      id: 5,
      student: "Vikram Mehta",
      award: "Top Scorer",
      date: "2024-11-11",
      points: 200,
    },
  ]);

  const stats = {
    totalAwards: 12,
    activeAwards: 8,
    totalRecipients: 234,
    pointsAwarded: 45600,
  };

  const getIconComponent = (iconName) => {
    const icons = {
      star: Star,
      trophy: Trophy,
      medal: Medal,
      award: Award,
    };
    const Icon = icons[iconName] || Award;
    return <Icon className="w-6 h-6" />;
  };

  const AwardCard = ({ award }) => (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 rounded-lg text-orange-600">
            {getIconComponent(award.icon)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{award.name}</h3>
            <span className="text-sm text-gray-500">{award.type}</span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            award.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {award.status}
        </span>
      </div>

      <p className="text-sm text-gray-600 mb-4">{award.criteria}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-1 text-gray-600">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            {award.points} pts
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Users className="w-4 h-4" />
            {award.recipients}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
            <Edit2 className="w-4 h-4" />
          </button>
          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                  <Trophy className="w-8 h-8 text-orange-500" />
                  Rewards & Awards
                </h1>
                <p className="text-gray-600 mt-1">
                  Manage student achievements and recognition
                </p>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-sm hover:bg-orange-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Create Award
              </button>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Awards</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalAwards}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-sm">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Active Awards</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.activeAwards}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-sm">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Recipients</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.totalRecipients}
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-sm">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Points Awarded</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {stats.pointsAwarded.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-sm">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 border-b border-gray-200">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "overview"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Awards
            </button>
            <button
              onClick={() => setActiveTab("recipients")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "recipients"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Recent Recipients
            </button>
            <button
              onClick={() => setActiveTab("categories")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "categories"
                  ? "text-orange-600 border-b-2 border-orange-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Categories
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-sm border border-gray-200 p-4 mb-6">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search awards..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5" />
                Filter
              </button>
            </div>
          </div>

          {/* Content based on active tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {awards.map((award) => (
                <AwardCard key={award.id} award={award} />
              ))}
            </div>
          )}

          {activeTab === "recipients" && (
            <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Award
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Points
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {recentRecipients.map((recipient) => (
                    <tr key={recipient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {recipient.student}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {recipient.award}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {recipient.date}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span className="flex items-center gap-1 text-yellow-600 font-medium">
                          <Star className="w-4 h-4 fill-yellow-600" />
                          {recipient.points}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button className="text-blue-600 hover:text-blue-800 font-medium">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "categories" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                "Academic",
                "Achievement",
                "Social",
                "Participation",
                "Leadership",
                "Special",
              ].map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-sm border border-gray-200 p-6 hover:shadow-sm transition-shadow cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category}
                    </h3>
                    <Trophy className="w-6 h-6 text-orange-500" />
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Awards related to {category.toLowerCase()} excellence
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">
                      {Math.floor(Math.random() * 5) + 1} awards
                    </span>
                    <button className="text-orange-600 hover:text-orange-700 font-medium">
                      View All →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Award Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  Create New Award
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Award Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter award name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                    <option>Academic</option>
                    <option>Achievement</option>
                    <option>Social</option>
                    <option>Participation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Points
                  </label>
                  <input
                    type="number"
                    placeholder="Enter points value"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Criteria
                  </label>
                  <textarea
                    placeholder="Describe the criteria for earning this award"
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Create Award
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RewardsAwardsSystem;
