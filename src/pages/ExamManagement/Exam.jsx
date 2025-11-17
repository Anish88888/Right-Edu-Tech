import React, { useState, useRef, useEffect } from "react";
import {
  Clock,
  CheckCircle2,
  Video,
  Mic,
  AlertTriangle,
  Eye,
  Monitor,
} from "lucide-react";

const ExamManagement = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(5400); // 90 minutes
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraPermission, setCameraPermission] = useState(false);
  const [micPermission, setMicPermission] = useState(false);
  const [warnings, setWarnings] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [examStarted, setExamStarted] = useState(false);
  const videoRef = useRef(null);

  const questions = [
    {
      id: 1,
      question: "What does API stand for in software development?",
      options: [
        "Application Programming Interface",
        "Advanced Programming Integration",
        "Automated Process Interface",
        "Application Process Integration",
      ],
    },
    {
      id: 2,
      question: "Which data structure uses LIFO (Last In First Out) principle?",
      options: ["Queue", "Stack", "Array", "Linked List"],
    },
    {
      id: 3,
      question: "What is the time complexity of binary search algorithm?",
      options: ["O(n)", "O(n²)", "O(log n)", "O(n log n)"],
    },
    {
      id: 4,
      question: "Which HTTP method is used to update a resource?",
      options: ["GET", "POST", "PUT", "DELETE"],
    },
    {
      id: 5,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Question Language",
        "Standard Query List",
        "System Query Language",
      ],
    },
    {
      id: 6,
      question: "Which of the following is NOT a programming paradigm?",
      options: ["Object-Oriented", "Functional", "Procedural", "Sequential"],
    },
    {
      id: 7,
      question: "What is Git primarily used for?",
      options: [
        "Database management",
        "Version control",
        "Web hosting",
        "Code compilation",
      ],
    },
    {
      id: 8,
      question: "Which port is commonly used for HTTPS?",
      options: ["80", "8080", "443", "3000"],
    },
    {
      id: 9,
      question: "What does CSS stand for?",
      options: [
        "Computer Style Sheets",
        "Cascading Style Sheets",
        "Creative Style System",
        "Coded Style Syntax",
      ],
    },
    {
      id: 10,
      question: "Which of these is a NoSQL database?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
    },
    {
      id: 11,
      question: "What does RAM stand for?",
      options: [
        "Random Access Memory",
        "Read Access Memory",
        "Rapid Application Memory",
        "Remote Access Module",
      ],
    },
    {
      id: 12,
      question: "Which sorting algorithm has the best average time complexity?",
      options: [
        "Bubble Sort",
        "Quick Sort",
        "Selection Sort",
        "Insertion Sort",
      ],
    },
    {
      id: 13,
      question: "What is the purpose of a constructor in OOP?",
      options: [
        "To destroy objects",
        "To initialize objects",
        "To copy objects",
        "To compare objects",
      ],
    },
    {
      id: 14,
      question: "Which protocol is used for sending emails?",
      options: ["HTTP", "FTP", "SMTP", "TCP"],
    },
    {
      id: 15,
      question: "What does JSON stand for?",
      options: [
        "JavaScript Object Notation",
        "Java Source Object Network",
        "JavaScript Oriented Naming",
        "Java Structured Object Node",
      ],
    },
    {
      id: 16,
      question: "Which is NOT a valid IP address class?",
      options: ["Class A", "Class B", "Class E", "Class F"],
    },
    {
      id: 17,
      question: "What is the main purpose of DNS?",
      options: [
        "Encrypt data",
        "Translate domain names to IP addresses",
        "Store files",
        "Manage databases",
      ],
    },
    {
      id: 18,
      question: "Which language is primarily used for iOS app development?",
      options: ["Java", "Kotlin", "Swift", "Python"],
    },
    {
      id: 19,
      question: "What does CRUD stand for in database operations?",
      options: [
        "Create, Read, Update, Delete",
        "Copy, Remove, Upload, Download",
        "Connect, Run, Use, Disconnect",
        "Compile, Run, Update, Debug",
      ],
    },
    {
      id: 20,
      question: "Which is a Python web framework?",
      options: ["React", "Angular", "Django", "Vue"],
    },
    {
      id: 21,
      question: "What is the purpose of a foreign key in a database?",
      options: [
        "Encrypt data",
        "Link two tables together",
        "Speed up queries",
        "Backup data",
      ],
    },
    {
      id: 22,
      question: "Which command is used to initialize a Git repository?",
      options: ["git start", "git init", "git create", "git begin"],
    },
    {
      id: 23,
      question: "What does IDE stand for?",
      options: [
        "Integrated Development Environment",
        "Internet Development Engine",
        "Interactive Design Editor",
        "Intelligent Data Entry",
      ],
    },
    {
      id: 24,
      question: "Which is NOT a JavaScript framework?",
      options: ["React", "Angular", "Vue", "Laravel"],
    },
    {
      id: 25,
      question: "What is the default port for MySQL database?",
      options: ["3306", "8080", "5432", "27017"],
    },
    {
      id: 26,
      question:
        "Which design pattern is used to create a single instance of a class?",
      options: ["Factory", "Singleton", "Observer", "Decorator"],
    },
    {
      id: 27,
      question: "What does REST stand for in API design?",
      options: [
        "Representational State Transfer",
        "Remote State Transmission",
        "Real-time System Transfer",
        "Resource State Template",
      ],
    },
    {
      id: 28,
      question: "Which algorithm is used for encryption?",
      options: ["Binary Search", "Bubble Sort", "RSA", "Quick Sort"],
    },
    {
      id: 29,
      question: "What is the purpose of Docker?",
      options: [
        "Code editing",
        "Containerization",
        "Database management",
        "Web hosting",
      ],
    },
    {
      id: 30,
      question: "Which HTTP status code indicates 'Not Found'?",
      options: ["200", "301", "404", "500"],
    },
  ];

  // Initialize camera and microphone
  useEffect(() => {
    if (examStarted) {
      initializeMedia();
      requestFullscreen();
    }
    return () => {
      if (cameraStream) {
        cameraStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [examStarted]);

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setCameraStream(stream);
      setCameraPermission(true);
      setMicPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
      addWarning("Camera/Microphone access denied. Please enable permissions.");
    }
  };

  const requestFullscreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen().catch(() => {
        addWarning("Please enable fullscreen mode for examination integrity.");
      });
    }
  };

  // Detect fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      if (!isNowFullscreen && examStarted) {
        addWarning("Fullscreen mode exited. Please return to fullscreen.");
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [examStarted]);

  // Detect tab switching
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden && examStarted) {
        addWarning("Tab switch detected! This is a violation.");
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [examStarted]);

  const addWarning = (message) => {
    setWarnings((prev) => [
      ...prev,
      { message, time: new Date().toLocaleTimeString() },
    ]);
  };

  // Timer countdown
  useEffect(() => {
    if (!examStarted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [examStarted]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex,
    });
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const answeredCount = Object.keys(answers).length;

  const startExam = () => {
    setExamStarted(true);
  };

  if (!examStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-900 via-red-900 to-amber-800 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-orange-600 to-red-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Monitor className="text-white" size={40} />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-3">
              Online Proctored Examination
            </h1>
            <p className="text-lg text-gray-600">
              IT Technical Assessment – 30 Questions
            </p>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-orange-500 p-6 rounded-lg mb-8">
            <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
              <AlertTriangle size={20} />
              Important Instructions
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>
                  Camera and microphone access is required for examination
                  monitoring
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>The examination must be taken in fullscreen mode</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>
                  Do not switch tabs or exit fullscreen during the examination
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>You have 90 minutes to complete 30 questions</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-600 font-bold">•</span>
                <span>All violations will be recorded and reported</span>
              </li>
            </ul>
          </div>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Video className="text-orange-600" size={24} />
              <div>
                <p className="font-semibold text-gray-800">Camera Monitoring</p>
                <p className="text-sm text-gray-600">
                  Your video will be recorded
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Mic className="text-orange-600" size={24} />
              <div>
                <p className="font-semibold text-gray-800">Audio Monitoring</p>
                <p className="text-sm text-gray-600">
                  Your audio will be recorded
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <Eye className="text-orange-600" size={24} />
              <div>
                <p className="font-semibold text-gray-800">Activity Tracking</p>
                <p className="text-sm text-gray-600">
                  Tab switches will be detected
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={startExam}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
          >
            I Understand – Start Examination
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 shadow-2xl border-b-4 border-orange-400">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                <Monitor className="animate-pulse" size={28} />
                IT Technical Assessment
              </h1>
              <p className="text-sm text-orange-100">
                Computer Science Fundamentals – Proctored Examination
              </p>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg">
                <Video
                  className={
                    cameraPermission ? "text-green-300" : "text-red-300"
                  }
                  size={20}
                />
                <Mic
                  className={micPermission ? "text-green-300" : "text-red-300"}
                  size={20}
                />
              </div>

              <div className="text-right">
                <p className="text-sm text-orange-100">Questions Answered</p>
                <p className="text-xl font-bold text-white">
                  {answeredCount}/{questions.length}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-orange-500 px-4 py-2 rounded-lg shadow-lg">
                <Clock className="text-white animate-pulse" size={24} />
                <div>
                  <p className="text-xs text-white/80">Time Left</p>
                  <p className="text-xl font-bold text-white">
                    {formatTime(timeLeft)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Warning Banner */}
      {warnings.length > 0 && (
        <div className="bg-red-600 text-white px-6 py-3">
          <div className="max-w-7xl mx-auto flex items-center gap-3">
            <AlertTriangle size={20} />
            <span className="font-semibold">
              Violations Detected: {warnings.length} | Latest:{" "}
              {warnings[warnings.length - 1].message}
            </span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex gap-6">
          {/* Left Side - Video Feed & Navigation */}
          <div className="w-80 space-y-6">
            {/* Camera Feed */}
            <div className="bg-white rounded-xl shadow-2xl p-4">
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <Video className="text-orange-600" size={20} />
                Live Monitoring
              </h3>
              <div
                className="relative bg-gray-900 rounded-lg overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  REC
                </div>
              </div>
            </div>

            {/* Question Navigation - 3 columns, 10 rows */}
            <div className="bg-white rounded-xl shadow-2xl p-4">
              <h2 className="font-semibold text-gray-800 mb-4 text-lg border-b pb-2">
                Question Navigator
              </h2>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {questions.map((q, index) => (
                  <button
                    key={q.id}
                    onClick={() => handleQuestionClick(index)}
                    className={`
                      w-full h-12 rounded-lg font-semibold text-sm transition-all
                      ${
                        currentQuestion === index
                          ? "bg-gradient-to-br from-orange-600 to-red-600 text-white shadow-lg scale-105 ring-2 ring-orange-300"
                          : answers[index] !== undefined
                          ? "bg-gradient-to-br from-green-400 to-emerald-500 text-white hover:shadow-md"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow"
                      }
                    `}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-green-400 to-emerald-500 rounded"></div>
                  <span className="text-gray-600">Answered</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gradient-to-br from-orange-600 to-red-600 rounded"></div>
                  <span className="text-gray-600">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-gray-200 rounded"></div>
                  <span className="text-gray-600">Not Answered</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Question and Options */}
          <div className="flex-1 bg-white rounded-xl shadow-2xl p-8">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  Question {currentQuestion + 1} of {questions.length}
                </h2>
                {answers[currentQuestion] !== undefined && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle2 size={20} />
                    <span className="text-sm font-semibold">Answered</span>
                  </div>
                )}
              </div>
              <p className="text-xl text-gray-800 leading-relaxed font-medium">
                {questions[currentQuestion].question}
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`
                    w-full text-left p-5 rounded-xl border-2 transition-all transform hover:scale-[1.02]
                    ${
                      answers[currentQuestion] === index
                        ? "border-orange-500 bg-gradient-to-r from-orange-50 to-red-50 shadow-lg ring-2 ring-orange-200"
                        : "border-gray-200 hover:border-orange-300 hover:bg-gray-50 hover:shadow-md"
                    }
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`
                      w-7 h-7 rounded-full border-2 flex items-center justify-center transition-all
                      ${
                        answers[currentQuestion] === index
                          ? "border-orange-600 bg-gradient-to-br from-orange-600 to-red-600 shadow-md"
                          : "border-gray-300 bg-white"
                      }
                    `}
                    >
                      {answers[currentQuestion] === index && (
                        <div className="w-3 h-3 bg-white rounded-full"></div>
                      )}
                    </div>
                    <span
                      className={`font-medium ${
                        answers[currentQuestion] === index
                          ? "text-orange-900"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="font-bold">
                        {String.fromCharCode(65 + index)}.
                      </span>{" "}
                      {option}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center pt-6 border-t-2 border-gray-100">
              <button
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className={`
                  px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105
                  ${
                    currentQuestion === 0
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 shadow-lg"
                  }
                `}
              >
                ← Previous
              </button>

              {currentQuestion === questions.length - 1 ? (
                <button className="px-10 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all transform hover:scale-105 shadow-lg">
                  Submit Examination ✓
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-red-700 transition-all transform hover:scale-105 shadow-lg"
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamManagement;
