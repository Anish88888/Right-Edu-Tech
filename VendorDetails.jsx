import React from "react";
import { useParams } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import {
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@heroicons/react/24/outline";

const VendorDetails = () => {
  const { id } = useParams();

  // Mock vendor data
  const vendor = {
    id: id,
    name: "Manish Kumar",
    performance: 99,
    storeId: "STO101",
    contact: "6203689042",
    city: "Noida",
    pincode: "201301",
    status: "Approved",
  };

  // Pie chart data (order overview)
  const chartData = [
    { name: "Completed", value: 40, color: "#222f5cff" },
    { name: "In Progress", value: 25, color: "#16A34A" },
    { name: "Pending", value: 20, color: "#FACC15" },
    { name: "Cancelled", value: 15, color: "#DC2626" },
  ];

  const stats = [
    {
      title: "Category Use",
      value: "1007",
      icon: ChartBarIcon,
      color: "text-red-500",
    },
    {
      title: "Sub Category Use",
      value: "1007",
      icon: ArrowUpIcon,
      color: "text-black",
    },
    {
      title: "Product Refund",
      value: "1007",
      icon: ArrowDownIcon,
      color: "text-green-500",
    },
    {
      title: "Product in Review",
      value: "1007",
      icon: ChartBarIcon,
      color: "text-red-500",
    },
    {
      title: "Total Order",
      value: "1007",
      icon: ArrowUpIcon,
      color: "text-black",
    },
    {
      title: "Total Delivered",
      value: "1007",
      icon: ArrowDownIcon,
      color: "text-green-500",
    },
    {
      title: "Total Cancelled Order",
      value: "1007",
      icon: ChartBarIcon,
      color: "text-red-500",
    },
    {
      title: "Total Riders",
      value: "1007",
      icon: ArrowUpIcon,
      color: "text-black",
    },
    {
      title: "Pricing",
      value: "1007",
      icon: ArrowDownIcon,
      color: "text-green-500",
    },
    {
      title: "Inventory",
      value: "1007",
      icon: ChartBarIcon,
      color: "text-red-500",
    },
    { title: "Account", value: "1007", icon: ArrowUpIcon, color: "text-black" },
    {
      title: "Ticket",
      value: "1007",
      icon: ArrowDownIcon,
      color: "text-green-500",
    },
  ];

  const invoices = [
    {
      title: "Redesign Website",
      id: "#INV-00024",
      payment: "$5600",
      status: "Paid",
    },
    {
      title: "Module Completion",
      id: "#INV-00023",
      payment: "$4175",
      status: "Paid",
    },
    {
      title: "Change CRM Module",
      id: "#INV-00022",
      payment: "$3500",
      status: "Unpaid",
    },
    {
      title: "Charges on live Board",
      id: "#INV-00021",
      payment: "$1457",
      status: "Paid",
    },
    {
      title: "Hospital Management",
      id: "#INV-00020",
      payment: "$6545",
      status: "Unpaid",
    },
  ];

  return (
    <DashboardLayout>
      <div className="max-w-[98%] mx-auto mt-4 grid grid-cols-3 gap-4">
        {/* Column 1 */}
        <div className="space-y-4">
          {/* Vendor Info */}
          <div className="border rounded-lg shadow p-4 bg-[#FEF0E9]">
            <h2 className="font-semibold text-gray-700 mb-2">Vendor Info</h2>
            <div className="flex justify-between items-start">
              <div className="flex items-start space-x-2">
                <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm">
                  IMG
                </div>
                <div>
                  <p className="text-sm font-semibold text-black">Store ID</p>
                  <p className="text-gray-400">RUSH905</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-gray-500 font-semibold">Performance</p>
                <p className="text-lg font-bold text-orange-500">99%</p>
              </div>
            </div>
          </div>

          {/* Store Image */}
          <div className="border rounded-lg shadow p-4 bg-gray-100 text-center">
            <h2 className="font-semibold text-gray-700 mb-2">Store Image</h2>
            IMG
          </div>

          {/* Store Location */}
          <div className="border rounded-lg shadow p-4 bg-gray-100 text-center">
            <h2 className="font-semibold text-gray-700 mb-2">Store Location</h2>
            MAP
          </div>

          {/* Store Details */}
          <div className="border rounded-lg shadow p-4 bg-[#FEF0E9] text-sm space-y-1">
            <h2 className="font-semibold text-gray-700 mb-2">Store Details</h2>
            <p>
              <strong>Lat :</strong> 878947.7876 &nbsp;<strong>Long :</strong>{" "}
              878947.7876
            </p>
            <p>
              <strong>Authorized Person :</strong> Manish Kumar
            </p>
            <p>
              <strong>Contact :</strong> +91 6203689042
            </p>
            <p>
              <strong>Alt Contact :</strong> +91 6203689042
            </p>
            <p>
              <strong>Email :</strong> sritam@gmail.com
            </p>
            <p>
              <strong>DOB :</strong> 26 Sept 2025
            </p>
            <p>
              <strong>Gender :</strong> Male
            </p>
          </div>

          {/* Store Address */}
          <div className="border rounded-lg shadow p-4 bg-[#9797FD] text-sm space-y-1">
            <h2 className="font-semibold text-gray-700 mb-2">Store Address</h2>
            <p>
              <strong>Address 1 :</strong>
            </p>
            <p>
              <strong>Address 2 :</strong>
            </p>
            <p>
              <strong>City :</strong>
            </p>
            <p>
              <strong>State :</strong>
            </p>
            <p>
              <strong>PIN :</strong>
            </p>
          </div>

          {/* Store Login Credentials */}
          <div className="border rounded-lg shadow p-4 bg-white text-sm space-y-1">
            <h2 className="font-semibold text-gray-700 mb-2">
              Store Login Credentials
            </h2>
            <p>
              <strong>Username :</strong> rushbaskets8040
            </p>
            <p>
              <strong>Password :</strong> dkfhfsdh@dkcnkjnd8
            </p>
            <p>
              <strong>Secret KEY :</strong> 74658
            </p>
          </div>
        </div>

        {/* Column 2 */}
        <div className="space-y-4">
          {/* Vendor Info */}
          <div className="border-2 border-orange-300 rounded-md p-3 flex flex-col justify-between bg-[#FEF0E9] h-28">
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/50"
                alt="Vendor"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Daniel Esbella
                </h3>
                <p className="text-xs text-gray-600">iOS Developer</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <p>Performance</p>
              <p className="font-bold text-orange-600">99%</p>
            </div>
          </div>

          {/* Order Overview */}
          <div className="bg-white shadow rounded p-4 h-[480px] relative">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold">Order Overview</h3>
              <button className="text-xs border rounded px-2 py-1">
                Today
              </button>
            </div>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-gray-500 text-sm">Total Attendance</p>
              <p className="text-2xl font-bold">120</p>
            </div>

            <div className="mt-4 space-y-2">
              {chartData.map((entry, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: entry.color }}
                    ></span>
                    <span>{entry.name}</span>
                  </div>
                  <span className="font-medium">{entry.value}%</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center border-t mt-4 pt-2">
              <div className="flex items-center gap-1">
                <img
                  src="https://i.pravatar.cc/20?img=1"
                  alt="user1"
                  className="w-6 h-6 rounded-full border"
                />
                <img
                  src="https://i.pravatar.cc/20?img=2"
                  alt="user2"
                  className="w-6 h-6 rounded-full border"
                />
                <img
                  src="https://i.pravatar.cc/20?img=3"
                  alt="user3"
                  className="w-6 h-6 rounded-full border"
                />
                <span className="text-xs bg-orange-500 text-white rounded-full px-2">
                  +1
                </span>
              </div>
              <button className="text-orange-600 text-sm font-medium">
                View Details
              </button>
            </div>
          </div>

          {/* Announcement */}
          <div className="bg-white shadow rounded p-2 h-[240px]">
            <h3 className="font-semibold mb-2">Announcement</h3>
            <p className="text-sm text-gray-700">We are now open new shop...</p>
            <p className="text-xs text-gray-500">
              📅 24 Sept 2025 | 🕒 10:30 AM
            </p>
          </div>
        </div>

        {/* Column 3 */}
        <div className="space-y-4">
          {/* Vendor Info */}
          <div className="border-2 border-orange-300 rounded-md p-3 flex flex-col justify-between bg-[#FEF0E9] h-28">
            <div className="flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/50"
                alt="Vendor"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-semibold text-gray-800">
                  Daniel Esbella
                </h3>
                <p className="text-xs text-gray-600">iOS Developer</p>
              </div>
            </div>
            <div className="flex justify-between items-center text-xs text-gray-500">
              <p>Performance</p>
              <p className="font-bold text-orange-600">99%</p>
            </div>
          </div>

          {/* Category & Sub Category */}
          <div className="flex gap-2">
            <div className="flex-1 bg-white shadow rounded p-4 text-center">
              <h3 className="font-semibold mb-2">Category Use</h3>
              <p className="text-lg font-bold">24</p>
            </div>
            <div className="flex-1 bg-white shadow rounded p-4 text-center">
              <h3 className="font-semibold mb-2">Sub Category Use</h3>
              <p className="text-lg font-bold">12</p>
            </div>
          </div>

          {/* 12 Cards (2 per row → 6 rows) */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: "Products", value: "150" },
              { title: "Orders", value: "320" },
              { title: "Revenue", value: "₹1,25,000" },
              { title: "Customers", value: "85" },
              { title: "Reviews", value: "45" },
              { title: "Returns", value: "10" },
              { title: "Discounts", value: "12" },
              { title: "New Products", value: "30" },
              { title: "Shipped Orders", value: "270" },
              { title: "Pending Orders", value: "50" },
              { title: "Top Customers", value: "15" },
              { title: "Top Products", value: "10" },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-white shadow rounded p-4 text-center"
              >
                <h3 className="font-semibold mb-2">{card.title}</h3>
                <p className="text-lg font-bold">{card.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default VendorDetails;
