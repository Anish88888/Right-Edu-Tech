import React, { useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import {
  UserPlus,
  Users,
  Upload,
  Mail,
  Phone,
  MapPin,
  Calendar,
  User,
  BookOpen,
  GraduationCap,
  FileText,
  CheckCircle,
  X,
  ChevronRight,
  Save,
  ArrowLeft,
  Globe,
  Smartphone,
  Share2,
  Code,
} from "lucide-react";

const StudentEnrollment = () => {
  const [enrollmentType, setEnrollmentType] = useState(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: "",
    email: "",
    mobile: "",
    gender: "",
    dateOfBirth: "",
    city: "",
    state: "",
    address: "",

    // Academic Information
    class: "",
    stream: "",
    previousSchool: "",

    // Enrollment Details
    course: "",
    batch: "",
    examPermissions: [],

    // Metadata
    createdByType: "Admin",
    createdByUserId: "",
    registeredSource: "Web",
    referralBy: "",
    notes: "",
  });

  const courses = [
    { id: 1, name: "JEE Main & Advanced", duration: "2 Years", students: 450 },
    { id: 2, name: "NEET Preparation", duration: "2 Years", students: 380 },
    { id: 3, name: "Class 10 CBSE", duration: "1 Year", students: 250 },
    { id: 4, name: "Class 12 Commerce", duration: "1 Year", students: 180 },
    { id: 5, name: "Foundation Course", duration: "6 Months", students: 120 },
  ];

  const batches = [
    {
      id: "A",
      name: "Batch A - Morning",
      timing: "6:00 AM - 9:00 AM",
      capacity: "50/60",
    },
    {
      id: "B",
      name: "Batch B - Day",
      timing: "10:00 AM - 1:00 PM",
      capacity: "45/60",
    },
    {
      id: "C",
      name: "Batch C - Evening",
      timing: "4:00 PM - 7:00 PM",
      capacity: "55/60",
    },
    {
      id: "D",
      name: "Batch D - Weekend",
      timing: "Sat-Sun 9:00 AM",
      capacity: "30/40",
    },
  ];

  const examPermissions = [
    {
      id: "weekly",
      name: "Weekly Tests",
      description: "Regular weekly assessments",
    },
    {
      id: "monthly",
      name: "Monthly Exams",
      description: "Comprehensive monthly tests",
    },
    {
      id: "mock",
      name: "Mock Tests",
      description: "Full-length mock examinations",
    },
    {
      id: "final",
      name: "Final Exams",
      description: "End of term examinations",
    },
  ];

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const toggleExamPermission = (examId) => {
    const current = formData.examPermissions;
    if (current.includes(examId)) {
      setFormData({
        ...formData,
        examPermissions: current.filter((e) => e !== examId),
      });
    } else {
      setFormData({ ...formData, examPermissions: [...current, examId] });
    }
  };

  const EnrollmentTypeCard = ({
    icon: Icon,
    title,
    description,
    type,
    color,
  }) => (
    <button
      onClick={() => {
        setEnrollmentType(type);
        setStep(1);
      }}
      className={`p-6 border-2 rounded-xl hover:shadow-lg transition-all duration-300 text-left group ${
        enrollmentType === type
          ? `border-${color}-500 bg-${color}-50`
          : "border-gray-200 hover:border-gray-300"
      }`}
    >
      <div
        className={`w-14 h-14 rounded-xl bg-${color}-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
      >
        <Icon className={`text-${color}-600`} size={28} />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </button>
  );

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((s) => (
        <React.Fragment key={s}>
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold transition-all ${
              step >= s
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-400"
            }`}
          >
            {s}
          </div>
          {s < 4 && (
            <div
              className={`w-16 h-1 mx-2 ${
                step > s ? "bg-orange-500" : "bg-gray-200"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );

  const FormField = ({ label, required, children }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Personal Information
              </h2>
              <p className="text-gray-600">Enter student's basic details</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField label="Full Name" required>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Enter full name"
                />
              </FormField>

              <FormField label="Email Address" required>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="student@example.com"
                />
              </FormField>

              <FormField label="Mobile Number" required>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="+91 XXXXX XXXXX"
                />
              </FormField>

              <FormField label="Gender" required>
                <select
                  value={formData.gender}
                  onChange={(e) => handleInputChange("gender", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </FormField>

              <FormField label="Date of Birth" required>
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) =>
                    handleInputChange("dateOfBirth", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                />
              </FormField>

              <FormField label="City" required>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Enter city"
                />
              </FormField>

              <FormField label="State" required>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Enter state"
                />
              </FormField>

              <div className="col-span-2">
                <FormField label="Address">
                  <textarea
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    rows="3"
                    placeholder="Enter full address"
                  />
                </FormField>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Academic Information
              </h2>
              <p className="text-gray-600">Student's educational background</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField label="Current Class" required>
                <select
                  value={formData.class}
                  onChange={(e) => handleInputChange("class", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Select Class</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                  <option value="Dropper">Dropper</option>
                </select>
              </FormField>

              <FormField label="Stream" required>
                <select
                  value={formData.stream}
                  onChange={(e) => handleInputChange("stream", e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="">Select Stream</option>
                  <option value="Science">Science (PCM)</option>
                  <option value="Science-Bio">Science (PCB)</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </FormField>

              <div className="col-span-2">
                <FormField label="Previous School/Institution">
                  <input
                    type="text"
                    value={formData.previousSchool}
                    onChange={(e) =>
                      handleInputChange("previousSchool", e.target.value)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="Enter previous school name"
                  />
                </FormField>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Course & Batch Assignment
              </h2>
              <p className="text-gray-600">
                Select course and batch for the student
              </p>
            </div>

            <FormField label="Select Course" required>
              <div className="grid grid-cols-1 gap-3">
                {courses.map((course) => (
                  <button
                    key={course.id}
                    onClick={() => handleInputChange("course", course.name)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.course === course.name
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                          <BookOpen className="text-orange-600" size={20} />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {course.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {course.duration} • {course.students} students
                            enrolled
                          </p>
                        </div>
                      </div>
                      {formData.course === course.name && (
                        <CheckCircle className="text-orange-500" size={24} />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="Select Batch" required>
              <div className="grid grid-cols-2 gap-3">
                {batches.map((batch) => (
                  <button
                    key={batch.id}
                    onClick={() => handleInputChange("batch", batch.name)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.batch === batch.name
                        ? "border-orange-500 bg-orange-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">
                        {batch.name}
                      </p>
                      {formData.batch === batch.name && (
                        <CheckCircle className="text-orange-500" size={20} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{batch.timing}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      Capacity: {batch.capacity}
                    </p>
                  </button>
                ))}
              </div>
            </FormField>

            <FormField label="Exam Permissions" required>
              <div className="grid grid-cols-2 gap-3">
                {examPermissions.map((exam) => (
                  <button
                    key={exam.id}
                    onClick={() => toggleExamPermission(exam.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all ${
                      formData.examPermissions.includes(exam.id)
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-semibold text-gray-900">{exam.name}</p>
                      {formData.examPermissions.includes(exam.id) && (
                        <CheckCircle className="text-green-500" size={20} />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{exam.description}</p>
                  </button>
                ))}
              </div>
            </FormField>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Enrollment Metadata
              </h2>
              <p className="text-gray-600">Additional tracking information</p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField label="Created By Type" required>
                <select
                  value={formData.createdByType}
                  onChange={(e) =>
                    handleInputChange("createdByType", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                >
                  <option value="Self">Self Signup</option>
                  <option value="Admin">Admin</option>
                  <option value="Super Admin">Super Admin</option>
                  <option value="Referral">Referral</option>
                </select>
              </FormField>

              <FormField label="Created By User ID" required>
                <input
                  type="text"
                  value={formData.createdByUserId}
                  onChange={(e) =>
                    handleInputChange("createdByUserId", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Admin/Advisor User ID"
                />
              </FormField>

              <FormField label="Registered Source" required>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "Web", icon: Globe, label: "Web" },
                    { value: "Mobile", icon: Smartphone, label: "Mobile" },
                    { value: "Social", icon: Share2, label: "Social" },
                    { value: "Referral", icon: Code, label: "Referral" },
                  ].map((source) => (
                    <button
                      key={source.value}
                      onClick={() =>
                        handleInputChange("registeredSource", source.value)
                      }
                      className={`p-3 border-2 rounded-lg flex items-center gap-2 transition-all ${
                        formData.registeredSource === source.value
                          ? "border-orange-500 bg-orange-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <source.icon
                        size={18}
                        className={
                          formData.registeredSource === source.value
                            ? "text-orange-600"
                            : "text-gray-600"
                        }
                      />
                      <span className="text-sm font-medium">
                        {source.label}
                      </span>
                    </button>
                  ))}
                </div>
              </FormField>

              <FormField label="Referral/Guidance By">
                <input
                  type="text"
                  value={formData.referralBy}
                  onChange={(e) =>
                    handleInputChange("referralBy", e.target.value)
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  placeholder="Staff name / Referral code / Promo ID"
                />
              </FormField>

              <div className="col-span-2">
                <FormField label="Notes">
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    rows="4"
                    placeholder="e.g., came from counseling camp, referred by teacher, etc."
                  />
                </FormField>
              </div>
            </div>

            {/* Summary Card */}
            <div className="mt-8 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-200">
              <h3 className="font-bold text-lg text-gray-900 mb-4">
                Enrollment Summary
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Student Name</p>
                  <p className="font-semibold text-gray-900">
                    {formData.fullName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Email</p>
                  <p className="font-semibold text-gray-900">
                    {formData.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Course</p>
                  <p className="font-semibold text-gray-900">
                    {formData.course || "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Batch</p>
                  <p className="font-semibold text-gray-900">
                    {formData.batch || "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Exam Permissions</p>
                  <p className="font-semibold text-gray-900">
                    {formData.examPermissions.length} permissions
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Source</p>
                  <p className="font-semibold text-gray-900">
                    {formData.registeredSource}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!enrollmentType) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <div className="inline-block p-4 bg-orange-100 rounded-2xl mb-4">
                <UserPlus className="text-orange-600" size={48} />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Student Enrollment
              </h1>
              <p className="text-lg text-gray-600">
                Choose how you want to enroll the student
              </p>
            </div>

            {/* Enrollment Type Selection */}
            <div className="grid grid-cols-2 gap-6 max-w-4xl mx-auto">
              <EnrollmentTypeCard
                icon={Users}
                title="Self Signup"
                description="Student registers themselves through the platform with their own information"
                type="self"
                color="blue"
              />
              <EnrollmentTypeCard
                icon={UserPlus}
                title="Admin Add Manually"
                description="Admin or staff member manually adds student details and assigns courses"
                type="admin"
                color="orange"
              />
            </div>

            {/* Info Cards */}
            <div className="mt-12 grid grid-cols-3 gap-4 max-w-4xl mx-auto">
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Quick Process
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Complete in 4 simple steps
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <BookOpen className="text-purple-600" size={20} />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Course Assignment
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Assign to courses & batches
                </p>
              </div>
              <div className="p-4 bg-white rounded-lg border border-gray-200 text-center">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FileText className="text-orange-600" size={20} />
                </div>
                <p className="text-sm font-medium text-gray-900">
                  Full Tracking
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Complete audit trail
                </p>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-purple-50 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => {
                if (step === 1) {
                  setEnrollmentType(null);
                } else {
                  setStep(step - 1);
                }
              }}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-xl">
                {enrollmentType === "self" ? (
                  <Users className="text-orange-600" size={32} />
                ) : (
                  <UserPlus className="text-orange-600" size={32} />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  {enrollmentType === "self"
                    ? "Self Signup Enrollment"
                    : "Admin Manual Enrollment"}
                </h1>
                <p className="text-gray-600">Step {step} of 4</p>
              </div>
            </div>
          </div>

          {/* Step Indicator */}
          <StepIndicator />

          {/* Form Content */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={() => step > 1 && setStep(step - 1)}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                step === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              disabled={step === 1}
            >
              Previous
            </button>

            {step < 4 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="px-6 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2"
              >
                Next Step
                <ChevronRight size={20} />
              </button>
            ) : (
              <button
                onClick={() => {
                  alert("Student enrolled successfully!");
                  setEnrollmentType(null);
                  setStep(1);
                  setFormData({
                    fullName: "",
                    email: "",
                    mobile: "",
                    gender: "",
                    dateOfBirth: "",
                    city: "",
                    state: "",
                    address: "",
                    class: "",
                    stream: "",
                    previousSchool: "",
                    course: "",
                    batch: "",
                    examPermissions: [],
                    createdByType: "Admin",
                    createdByUserId: "",
                    registeredSource: "Web",
                    referralBy: "",
                    notes: "",
                  });
                }}
                className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save size={20} />
                Complete Enrollment
              </button>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentEnrollment;
