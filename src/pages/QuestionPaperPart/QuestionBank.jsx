import React, { useState, useMemo } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  FileText,
  Plus,
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Calendar,
  Clock,
  BookOpen,
  BarChart3,
  Users,
  CheckCircle,
  XCircle,
  Copy,
  X,
} from "lucide-react";

export default function QuestionPapers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingPaper, setEditingPaper] = useState(null);
  const [papers, setPapers] = useState([
    {
      id: 1,
      title: "Mathematics Mid-Term Exam 2024",
      subject: "Mathematics",
      class: "Class 10",
      totalQuestions: 50,
      totalMarks: 100,
      duration: 180,
      description: "Comprehensive mid-term examination covering chapters 1-5",
      createdDate: "2024-11-15",
      status: "published",
      attempts: 145,
      avgScore: 78,
    },
    {
      id: 2,
      title: "Physics Chapter 1-5 Test",
      subject: "Physics",
      class: "Class 12",
      totalQuestions: 40,
      totalMarks: 80,
      duration: 120,
      description: "Test covering mechanics and thermodynamics",
      createdDate: "2024-11-14",
      status: "published",
      attempts: 98,
      avgScore: 72,
    },
    {
      id: 3,
      title: "Chemistry Organic Unit Test",
      subject: "Chemistry",
      class: "Class 11",
      totalQuestions: 35,
      totalMarks: 70,
      duration: 90,
      description: "Organic chemistry assessment",
      createdDate: "2024-11-13",
      status: "draft",
      attempts: 0,
      avgScore: 0,
    },
    {
      id: 4,
      title: "English Literature Assessment",
      subject: "English",
      class: "Class 10",
      totalQuestions: 45,
      totalMarks: 90,
      duration: 150,
      description: "Literature comprehension and analysis",
      createdDate: "2024-11-12",
      status: "published",
      attempts: 167,
      avgScore: 85,
    },
    {
      id: 5,
      title: "Biology Cell Structure Quiz",
      subject: "Biology",
      class: "Class 9",
      totalQuestions: 30,
      totalMarks: 60,
      duration: 60,
      description: "Cell structure and functions quiz",
      createdDate: "2024-11-10",
      status: "published",
      attempts: 203,
      avgScore: 81,
    },
    {
      id: 6,
      title: "Computer Science Final Exam",
      subject: "Computer Science",
      class: "Class 12",
      totalQuestions: 60,
      totalMarks: 120,
      duration: 240,
      description: "Final examination covering full syllabus",
      createdDate: "2024-11-08",
      status: "draft",
      attempts: 0,
      avgScore: 0,
    },
  ]);

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    totalQuestions: "",
    totalMarks: "",
    duration: "",
    description: "",
  });

  const subjects = [
    "Mathematics",
    "Physics",
    "Chemistry",
    "Biology",
    "English",
    "Computer Science",
    "History",
    "Geography",
  ];
  const classes = ["Class 9", "Class 10", "Class 11", "Class 12"];

  // Calculate stats dynamically
  const stats = useMemo(() => {
    const total = papers.length;
    const published = papers.filter((p) => p.status === "published").length;
    const draft = papers.filter((p) => p.status === "draft").length;
    const totalAttempts = papers.reduce((sum, p) => sum + p.attempts, 0);

    return [
      {
        label: "Total Papers",
        value: total.toString(),
        icon: FileText,
        color: "bg-blue-500",
      },
      {
        label: "Published",
        value: published.toString(),
        icon: CheckCircle,
        color: "bg-green-500",
      },
      {
        label: "Draft",
        value: draft.toString(),
        icon: Edit,
        color: "bg-orange-500",
      },
      {
        label: "Total Attempts",
        value: totalAttempts.toLocaleString(),
        icon: Users,
        color: "bg-purple-500",
      },
    ];
  }, [papers]);

  // Filter papers
  const filteredPapers = useMemo(() => {
    return papers.filter((paper) => {
      const matchesSearch =
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        paper.subject.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSubject =
        filterSubject === "all" || paper.subject === filterSubject;
      const matchesStatus =
        filterStatus === "all" || paper.status === filterStatus;
      return matchesSearch && matchesSubject && matchesStatus;
    });
  }, [papers, searchQuery, filterSubject, filterStatus]);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open create modal
  const openCreateModal = () => {
    setFormData({
      title: "",
      subject: "",
      class: "",
      totalQuestions: "",
      totalMarks: "",
      duration: "",
      description: "",
    });
    setEditingPaper(null);
    setShowCreateModal(true);
  };

  // Open edit modal
  const openEditModal = (paper) => {
    setFormData({
      title: paper.title,
      subject: paper.subject,
      class: paper.class,
      totalQuestions: paper.totalQuestions.toString(),
      totalMarks: paper.totalMarks.toString(),
      duration: paper.duration.toString(),
      description: paper.description,
    });
    setEditingPaper(paper);
    setShowCreateModal(true);
  };

  // Create or update paper
  const handleSubmit = () => {
    if (
      !formData.title ||
      !formData.subject ||
      !formData.class ||
      !formData.totalQuestions ||
      !formData.totalMarks ||
      !formData.duration
    ) {
      alert("Please fill in all required fields");
      return;
    }

    if (editingPaper) {
      // Update existing paper
      setPapers((prev) =>
        prev.map((paper) =>
          paper.id === editingPaper.id
            ? {
                ...paper,
                ...formData,
                totalQuestions: parseInt(formData.totalQuestions),
                totalMarks: parseInt(formData.totalMarks),
                duration: parseInt(formData.duration),
              }
            : paper
        )
      );
      alert("Question paper updated successfully!");
    } else {
      // Create new paper
      const newPaper = {
        id: Math.max(...papers.map((p) => p.id)) + 1,
        ...formData,
        totalQuestions: parseInt(formData.totalQuestions),
        totalMarks: parseInt(formData.totalMarks),
        duration: parseInt(formData.duration),
        createdDate: new Date().toISOString().split("T")[0],
        status: "draft",
        attempts: 0,
        avgScore: 0,
      };
      setPapers((prev) => [newPaper, ...prev]);
      alert("Question paper created successfully!");
    }

    setShowCreateModal(false);
    setEditingPaper(null);
  };

  // Delete paper
  const handleDelete = (id) => {
    if (
      window.confirm("Are you sure you want to delete this question paper?")
    ) {
      setPapers((prev) => prev.filter((paper) => paper.id !== id));
      alert("Question paper deleted successfully!");
    }
  };

  // Duplicate paper
  const handleDuplicate = (paper) => {
    const newPaper = {
      ...paper,
      id: Math.max(...papers.map((p) => p.id)) + 1,
      title: `${paper.title} (Copy)`,
      createdDate: new Date().toISOString().split("T")[0],
      status: "draft",
      attempts: 0,
      avgScore: 0,
    };
    setPapers((prev) => [newPaper, ...prev]);
    alert("Question paper duplicated successfully!");
  };

  // Toggle status
  const toggleStatus = (id) => {
    setPapers((prev) =>
      prev.map((paper) =>
        paper.id === id
          ? {
              ...paper,
              status: paper.status === "published" ? "draft" : "published",
            }
          : paper
      )
    );
  };

  // Export to CSV
  const handleExport = () => {
    const csv = [
      [
        "Title",
        "Subject",
        "Class",
        "Questions",
        "Marks",
        "Duration",
        "Status",
        "Attempts",
        "Avg Score",
      ],
      ...filteredPapers.map((p) => [
        p.title,
        p.subject,
        p.class,
        p.totalQuestions,
        p.totalMarks,
        p.duration,
        p.status,
        p.attempts,
        p.avgScore,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `question-papers-${
      new Date().toISOString().split("T")[0]
    }.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // View paper details
  const handleView = (paper) => {
    alert(
      `Viewing: ${paper.title}\n\nSubject: ${paper.subject}\nClass: ${paper.class}\nQuestions: ${paper.totalQuestions}\nMarks: ${paper.totalMarks}\nDuration: ${paper.duration} minutes\n\nDescription: ${paper.description}`
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
                <FileText className="w-8 h-8 text-orange-500" />
                Question Papers
              </h1>
              <p className="text-gray-600 mt-1">
                Create and manage exam question papers
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleExport}
                className="px-4 py-2 border border-orange-500 text-orange-500 rounded-sm hover:bg-orange-50 transition flex items-center gap-2 font-medium"
              >
                <Download className="w-4 h-4" />
                Export
              </button>
              <button
                onClick={openCreateModal}
                className="px-6 py-3 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition flex items-center gap-2 font-semibold"
              >
                <Plus className="w-5 h-5" />
                Create New Paper
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

        {/* Filters and Search */}
        <div className="bg-white rounded-sm shadow-sm p-4 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row gap-4">
            <select
              value={filterSubject}
              onChange={(e) => setFilterSubject(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="all">All Subjects</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
            {(searchQuery ||
              filterSubject !== "all" ||
              filterStatus !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setFilterSubject("all");
                  setFilterStatus("all");
                }}
                className="px-4 py-2 text-orange-500 hover:text-orange-600 font-medium"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Question Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredPapers.length === 0 ? (
            <div className="col-span-full bg-white rounded-sm shadow-sm p-12 text-center border border-gray-100">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                No Papers Found
              </h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or create a new question paper.
              </p>
              <button
                onClick={openCreateModal}
                className="px-6 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition inline-flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create New Paper
              </button>
            </div>
          ) : (
            filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white rounded-sm shadow-sm border border-gray-100 hover:shadow-md transition overflow-hidden"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-1">
                        {paper.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-orange-100 text-sm">
                          {paper.subject}
                        </span>
                        <span className="text-orange-200">•</span>
                        <span className="text-orange-100 text-sm">
                          {paper.class}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleStatus(paper.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        paper.status === "published"
                          ? "bg-green-100 text-green-700 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                      }`}
                    >
                      {paper.status === "published" ? "Published" : "Draft"}
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Questions</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {paper.totalQuestions}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Total Marks</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {paper.totalMarks}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Duration</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {paper.duration} min
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="text-xs text-gray-500">Attempts</p>
                        <p className="text-sm font-semibold text-gray-800">
                          {paper.attempts}
                        </p>
                      </div>
                    </div>
                  </div>

                  {paper.status === "published" && paper.attempts > 0 && (
                    <div className="bg-blue-50 rounded-lg p-3 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-blue-700 font-medium">
                          Average Score
                        </span>
                        <span className="text-lg font-bold text-blue-700">
                          {paper.avgScore}%
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Created on{" "}
                      {new Date(paper.createdDate).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleView(paper)}
                      className="flex-1 px-3 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition flex items-center justify-center gap-2 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => openEditModal(paper)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200 transition"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(paper)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200 transition"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(paper.id)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-sm hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Create/Edit Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-sm shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 text-white flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">
                    {editingPaper
                      ? "Edit Question Paper"
                      : "Create New Question Paper"}
                  </h2>
                  <p className="text-orange-100 mt-1">
                    {editingPaper
                      ? "Update the details of your exam paper"
                      : "Fill in the details to create a new exam paper"}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPaper(null);
                  }}
                  className="text-white hover:bg-orange-600 rounded-sm p-1 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Paper Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter paper title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Subject</option>
                      {subjects.map((subject) => (
                        <option key={subject} value={subject}>
                          {subject}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Class <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="class"
                      value={formData.class}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="">Select Class</option>
                      {classes.map((cls) => (
                        <option key={cls} value={cls}>
                          {cls}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Questions <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalQuestions"
                      value={formData.totalQuestions}
                      onChange={handleInputChange}
                      placeholder="50"
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Total Marks <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="totalMarks"
                      value={formData.totalMarks}
                      onChange={handleInputChange}
                      placeholder="100"
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Duration (min) <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      placeholder="180"
                      min="1"
                      className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Enter paper description..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <div className="p-6 bg-gray-50 flex gap-3 justify-end rounded-b-xl">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    setEditingPaper(null);
                  }}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-100 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-orange-500 text-white rounded-sm hover:bg-orange-600 transition font-medium"
                >
                  {editingPaper ? "Update Paper" : "Create Paper"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
