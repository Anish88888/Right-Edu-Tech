import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  CreditCard,
  Download,
  Filter,
  Search,
  TrendingUp,
  User,
  CheckCircle,
  XCircle,
  Clock,
  Plus,
  Eye,
  Receipt,
  RefreshCw,
  DollarSign,
  Menu,
  X,
} from "lucide-react";

const TransactionManagement = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterMethod, setFilterMethod] = useState("all");
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showDetails, setShowDetails] = useState(null);

  // Sample transaction data
  const [transactions] = useState([
    {
      id: 1,
      transactionId: "TXN001234",
      student: "Rahul Kumar",
      studentId: "STU001",
      course: "Full Stack Development",
      amount: 15000,
      status: "completed",
      method: "Credit Card",
      date: "2024-11-17",
      time: "10:30 AM",
      transactionFee: 150,
      netAmount: 14850,
    },
    {
      id: 2,
      transactionId: "TXN001235",
      student: "Priya Singh",
      studentId: "STU002",
      course: "Data Science Bootcamp",
      amount: 25000,
      status: "completed",
      method: "UPI",
      date: "2024-11-17",
      time: "09:15 AM",
      transactionFee: 0,
      netAmount: 25000,
    },
    {
      id: 3,
      transactionId: "TXN001236",
      student: "Amit Sharma",
      studentId: "STU003",
      course: "Web Design Fundamentals",
      amount: 8000,
      status: "pending",
      method: "Net Banking",
      date: "2024-11-17",
      time: "11:45 AM",
      transactionFee: 80,
      netAmount: 7920,
    },
    {
      id: 4,
      transactionId: "TXN001237",
      student: "Neha Patel",
      studentId: "STU004",
      course: "Digital Marketing Pro",
      amount: 12000,
      status: "completed",
      method: "Debit Card",
      date: "2024-11-16",
      time: "03:20 PM",
      transactionFee: 120,
      netAmount: 11880,
    },
    {
      id: 5,
      transactionId: "TXN001238",
      student: "Vikram Mehta",
      studentId: "STU005",
      course: "Mobile App Development",
      amount: 20000,
      status: "failed",
      method: "Credit Card",
      date: "2024-11-16",
      time: "02:10 PM",
      transactionFee: 0,
      netAmount: 0,
    },
    {
      id: 6,
      transactionId: "TXN001239",
      student: "Anjali Reddy",
      studentId: "STU006",
      course: "Python Programming",
      amount: 10000,
      status: "completed",
      method: "UPI",
      date: "2024-11-15",
      time: "04:30 PM",
      transactionFee: 0,
      netAmount: 10000,
    },
    {
      id: 7,
      transactionId: "TXN001240",
      student: "Rajesh Verma",
      studentId: "STU007",
      course: "Machine Learning Advanced",
      amount: 30000,
      status: "refunded",
      method: "Net Banking",
      date: "2024-11-15",
      time: "01:15 PM",
      transactionFee: -300,
      netAmount: 29700,
    },
    {
      id: 8,
      transactionId: "TXN001241",
      student: "Kavita Shah",
      studentId: "STU008",
      course: "Business Analytics",
      amount: 18000,
      status: "completed",
      method: "Credit Card",
      date: "2024-11-14",
      time: "05:45 PM",
      transactionFee: 180,
      netAmount: 17820,
    },
    {
      id: 9,
      transactionId: "TXN001242",
      student: "Suresh Kumar",
      studentId: "STU009",
      course: "Cybersecurity Essentials",
      amount: 22000,
      status: "pending",
      method: "UPI",
      date: "2024-11-14",
      time: "12:30 PM",
      transactionFee: 0,
      netAmount: 22000,
    },
  ]);

  // Calculate statistics
  const stats = {
    totalRevenue: transactions
      .filter((t) => t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0),
    totalTransactions: transactions.length,
    pendingAmount: transactions
      .filter((t) => t.status === "pending")
      .reduce((sum, t) => sum + t.amount, 0),
    completedToday: transactions.filter(
      (t) => t.date === "2024-11-17" && t.status === "completed"
    ).length,
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-emerald-100 text-emerald-700";
      case "pending":
        return "bg-amber-100 text-amber-700";
      case "failed":
        return "bg-rose-100 text-rose-700";
      case "refunded":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle size={14} />;
      case "pending":
        return <Clock size={14} />;
      case "failed":
        return <XCircle size={14} />;
      case "refunded":
        return <RefreshCw size={14} />;
      default:
        return null;
    }
  };

  const filteredAndSortedTransactions = transactions
    .filter((transaction) => {
      const matchesSearch =
        transaction.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.transactionId
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        transaction.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.studentId.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || transaction.status === filterStatus;
      const matchesMethod =
        filterMethod === "all" || transaction.method === filterMethod;
      return matchesSearch && matchesStatus && matchesMethod;
    })
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (sortField === "amount" || sortField === "id") {
        aVal = Number(aVal);
        bVal = Number(bVal);
      }

      if (sortOrder === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-0 via-amber-50 to-yellow-50 ml-6 p-0">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-sm shadow-md p-6 border-l-4 border-emerald-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-semibold uppercase">
                  Total Revenue
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ₹{stats.totalRevenue.toLocaleString()}
                </p>
                <p className="text-xs text-emerald-600 mt-1 font-semibold">
                  +12.5% from last month
                </p>
              </div>
              <div className="bg-emerald-100 p-3 rounded-sm">
                <TrendingUp className="text-emerald-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm shadow-md p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-semibold uppercase">
                  Total Transactions
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.totalTransactions}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-sm">
                <Receipt className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm shadow-md p-6 border-l-4 border-amber-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-semibold uppercase">
                  Pending Amount
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  ₹{stats.pendingAmount.toLocaleString()}
                </p>
              </div>
              <div className="bg-amber-100 p-3 rounded-sm">
                <Clock className="text-amber-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-sm shadow-md p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 text-sm font-semibold uppercase">
                  Completed Today
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.completedToday}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-sm">
                <CheckCircle className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-sm shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by student, ID, course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>

            <select
              value={filterMethod}
              onChange={(e) => setFilterMethod(e.target.value)}
              className="px-4 py-3 border-2 border-gray-200 rounded-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="all">All Payment Methods</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="UPI">UPI</option>
              <option value="Net Banking">Net Banking</option>
            </select>

            <button className="bg-orange-600 text-white px-6 py-3 rounded-sm font-bold hover:bg-orange-700 transition transform hover:scale-105 shadow-md flex items-center justify-center gap-2">
              <Download size={20} />
              Export Report
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-sm shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-orange-600 text-white">
                <tr>
                  <th
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-700 whitespace-nowrap"
                    onClick={() => handleSort("id")}
                  >
                    S.N{" "}
                    {sortField === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-700 whitespace-nowrap"
                    onClick={() => handleSort("transactionId")}
                  >
                    Transaction ID{" "}
                    {sortField === "transactionId" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-700 whitespace-nowrap"
                    onClick={() => handleSort("student")}
                  >
                    Student{" "}
                    {sortField === "student" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-700 whitespace-nowrap"
                    onClick={() => handleSort("course")}
                  >
                    Course{" "}
                    {sortField === "course" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-700 whitespace-nowrap"
                    onClick={() => handleSort("amount")}
                  >
                    Amount{" "}
                    {sortField === "amount" &&
                      (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                    Status
                  </th>
                  <th
                    className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider cursor-pointer hover:bg-orange-700 whitespace-nowrap"
                    onClick={() => handleSort("date")}
                  >
                    Date & Time{" "}
                    {sortField === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredAndSortedTransactions.map((transaction, index) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-orange-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-orange-600">
                      {transaction.transactionId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="bg-gradient-to-br from-orange-500 to-amber-500 w-10 h-10 rounded-sm flex items-center justify-center">
                          <User className="text-white" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {transaction.student}
                          </p>
                          <p className="text-xs text-gray-500">
                            {transaction.studentId}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 max-w-xs">
                      {transaction.course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">
                      ₹{transaction.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-sm ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {getStatusIcon(transaction.status)}
                        {transaction.status.charAt(0).toUpperCase() +
                          transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      <div>
                        {new Date(transaction.date).toLocaleDateString("en-GB")}
                      </div>
                      <div className="text-xs text-gray-500">
                        {transaction.time}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <button
                        className="p-2 hover:bg-blue-100 rounded-sm transition text-blue-600"
                        title="View Details"
                        onClick={() => setShowDetails(transaction)}
                      >
                        <Eye size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredAndSortedTransactions.length === 0 && (
            <div className="p-12 text-center">
              <div className="bg-gray-100 w-20 h-20 rounded-sm flex items-center justify-center mx-auto mb-4">
                <Filter className="text-gray-400" size={40} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No transactions found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>

        {/* Footer Info */}
        <div className="mt-6 bg-white rounded-sm shadow-md p-4 flex items-center justify-between text-sm text-gray-700">
          <div>
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredAndSortedTransactions.length}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-gray-900">
              {transactions.length}
            </span>{" "}
            transactions
          </div>
          <div className="text-gray-600">Click column headers to sort</div>
        </div>

        {/* Transaction Details Modal */}
        {showDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              <div className="bg-orange-600 text-white p-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Transaction Details</h2>
                <button
                  onClick={() => setShowDetails(null)}
                  className="text-white hover:bg-orange-700 p-2 rounded-sm transition"
                >
                  <XCircle size={24} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex justify-center">
                  <span
                    className={`inline-flex items-center gap-2 px-6 py-3 rounded-sm text-sm font-bold ${getStatusColor(
                      showDetails.status
                    )}`}
                  >
                    {getStatusIcon(showDetails.status)}
                    {showDetails.status.charAt(0).toUpperCase() +
                      showDetails.status.slice(1)}
                  </span>
                </div>

                {/* Transaction Info */}
                <div className="grid grid-cols-2 gap-6 border-b border-gray-200 pb-6">
                  <div className="bg-orange-50 p-4 rounded-sm">
                    <p className="text-xs text-gray-600 mb-1 font-semibold uppercase">
                      Transaction ID
                    </p>
                    <p className="text-lg font-bold text-orange-600">
                      {showDetails.transactionId}
                    </p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-sm">
                    <p className="text-xs text-gray-600 mb-1 font-semibold uppercase">
                      Date & Time
                    </p>
                    <p className="text-lg font-bold text-gray-900">
                      {showDetails.date}
                    </p>
                    <p className="text-sm text-gray-600">{showDetails.time}</p>
                  </div>
                </div>

                {/* Student Info */}
                <div className="bg-gray-50 rounded-sm p-4 border-l-4 border-orange-500">
                  <p className="text-sm font-bold text-gray-900 mb-3 uppercase">
                    Student Information
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Name</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {showDetails.student}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Student ID</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {showDetails.studentId}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div>
                  <p className="text-xs text-gray-600 mb-1 font-semibold uppercase">
                    Course
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {showDetails.course}
                  </p>
                </div>

                {/* Payment Details */}
                <div className="bg-amber-50 rounded-sm p-4 border-l-4 border-amber-500">
                  <p className="text-sm font-bold text-gray-900 mb-4 uppercase">
                    Payment Details
                  </p>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-semibold">
                        Payment Method
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 font-semibold text-sm rounded-sm">
                        {showDetails.method}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Course Amount</span>
                      <span className="font-bold text-gray-900">
                        ₹{showDetails.amount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Transaction Fee</span>
                      <span className="font-bold text-gray-900">
                        ₹{showDetails.transactionFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t-2 border-amber-300">
                      <span className="text-lg font-bold text-gray-900">
                        Net Amount
                      </span>
                      <span className="text-2xl font-bold text-orange-600">
                        ₹{showDetails.netAmount.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowDetails(null)}
                  className="px-6 py-3 border-2 border-gray-300 rounded-sm hover:bg-gray-100 transition font-bold"
                >
                  Close
                </button>
                <button className="px-6 py-3 bg-orange-600 text-white rounded-sm hover:bg-orange-700 transition font-bold flex items-center gap-2 shadow-md">
                  <Download size={18} />
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default TransactionManagement;
