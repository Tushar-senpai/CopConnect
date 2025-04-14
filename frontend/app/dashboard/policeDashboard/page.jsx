"use client";
import React, { useState, useEffect } from "react";
import {
  Shield,
  Search,
  Filter,
  Clock,
  CheckCircle,
  Plus,
  User,
  MapPin,
  Phone,
  MessageSquare,
  Tag,
  Folder,
} from "lucide-react";
import Link from "next/link";
import axios from 'axios';
import { useRouter } from "next/navigation";

const PoliceDashboard = () => {
  const [activeTab, setActiveTab] = useState("cases");
  const [selectedCase, setSelectedCase] = useState(null);
  const [openCases, setOpenCases] = useState([]);
  const [activeCasesNumber, setActiveCasesNumber] = useState(0);

  useEffect(() => {
    const fetchOpenCases = async () => {
      try {
        const token = sessionStorage.getItem("token");

        const res = await axios.get("http://localhost:5001/api/cases/getOpenCases", {
        headers: {
          Authorization: `Bearer ${token}`, // or just token, depending on backend expectations
        },
      });
        setOpenCases(res.data);
        setActiveCasesNumber(res.data.length)
      } catch (err) {
        console.error("Error fetching open cases:", err);
      }
    };

    fetchOpenCases();
  }, []);

  const recentTips = [
    {
      id: "T-7842",
      type: "Anonymous Tip",
      content: "Suspicious activity near warehouse",
      time: "30 minutes ago",
      status: "New",
    },
    {
      id: "T-7841",
      type: "Emergency Call",
      content: "Domestic disturbance reported",
      time: "1 hour ago",
      status: "Assigned",
    },
  ];

  const stats = {
    activeCases: 28,
    pendingReview: 12,
    solvedThisMonth: 15,
    newTips: 8,
  };

  const patrolUnits = [
    {
      id: "PU-1",
      officer: "Officer Wilson",
      location: "Downtown",
      status: "On Patrol",
    },
    {
      id: "PU-2",
      officer: "Officer Garcia",
      location: "North District",
      status: "Responding",
    },
    {
      id: "PU-3",
      officer: "Officer Chen",
      location: "West Side",
      status: "Available",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900">
      {/* Navigation Bar */}
      <nav className="bg-slate-900/50 backdrop-blur-md border-b border-blue-500/20 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="text-blue-400 h-8 w-8" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Police Dashboard
            </span>
          </div>
          <div className="flex items-center space-x-6">
            {/* <Bell className="h-6 w-6 text-blue-300" /> */}
            <div className="flex items-center space-x-2">
              <div className="bg-blue-500/20 p-2 rounded-full">
                <User className="h-5 w-5 text-blue-300" />
              </div>
              <span className="text-blue-300">Officer</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300">Total Open Cases</p>
                <h3 className="text-3xl font-bold text-white">
                  {activeCasesNumber}
                </h3>
              </div>
              <Folder className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300">Pending Review</p>
                <h3 className="text-3xl font-bold text-white">
                  {stats.pendingReview}
                </h3>
              </div>
              <Clock className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300">Solved This Month</p>
                <h3 className="text-3xl font-bold text-white">
                  {stats.solvedThisMonth}
                </h3>
              </div>
              <CheckCircle className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-300">New Tips</p>
                <h3 className="text-3xl font-bold text-white">
                  {stats.newTips}
                </h3>
              </div>
              <MessageSquare className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
  <Link href="/supportPages/PoliceCaseFiling" className="block">
    <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300 w-full h-full">
      <div className="flex items-center space-x-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <Plus className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">New Case</h2>
          <p className="text-blue-100 mt-1">Create case report</p>
        </div>
      </div>
    </div>
  </Link>

  <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white border border-green-400/20 hover:shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-1 transition-all duration-300 w-full h-full">
    <div className="flex items-center space-x-4">
      <div className="bg-white/10 p-3 rounded-lg">
        <Phone className="h-6 w-6 text-white" />
      </div>
      <div className="text-left">
        <h2 className="text-xl font-semibold">Emergency Response</h2>
        <p className="text-green-100 mt-1">Dispatch units</p>
      </div>
    </div>
  </div>

  <Link href="/supportPages/PoliceSearchCases" className="block">
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white border border-purple-400/20 hover:shadow-lg hover:shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-300 w-full h-full">
      <div className="flex items-center space-x-4">
        <div className="bg-white/10 p-3 rounded-lg">
          <Search className="h-6 w-6 text-white" />
        </div>
        <div className="text-left">
          <h2 className="text-xl font-semibold">Search Records</h2>
          <p className="text-purple-100 mt-1">Access database</p>
        </div>
      </div>
    </div>
  </Link>
</div>


        {/* Main Content Area */}
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 py-8">
  {/* Left Section - Cases List + Selected Case */}
  <div className="lg:col-span-2 space-y-6">
    {/* Cases List */}
    <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Active Cases</h2>
        <div className="flex space-x-2">
          <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
            <Filter className="h-5 w-5 text-blue-300" />
          </button>
          <button className="bg-white/10 p-2 rounded-lg hover:bg-white/20">
            <Search className="h-5 w-5 text-blue-300" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {openCases.length > 0 ? (
          openCases.map((case_) => (
            <div
              key={case_._id}
              className="bg-white/5 hover:bg-white/10 rounded-lg p-4 cursor-pointer transition-all"
              onClick={() => setSelectedCase(case_)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-blue-300">
                      {case_.caseNumber}
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        case_.priority === "High"
                          ? "bg-red-500/20 text-red-200"
                          : case_.priority === "Medium"
                          ? "bg-yellow-500/20 text-yellow-200"
                          : "bg-green-500/20 text-green-200"
                      }`}
                    >
                      {case_.priority}
                    </span>
                  </div>
                  <h3 className="text-white font-medium mt-1">
                    {case_.title}
                  </h3>
                  <p className="text-blue-200 text-sm mt-1">
                    {case_.description}
                  </p>
                </div>
                <span className="text-sm text-blue-300">
                  {case_.lastUpdate}
                </span>
              </div>
              <div className="flex items-center space-x-4 mt-4 text-sm text-blue-200">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{case_.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <User className="h-4 w-4" />
                  <span>{case_.assignedTo}</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No active cases available.</p>
        )}
      </div>
    </div>

    {/* Display selected case details */}
    {selectedCase && (
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
        <h3 className="text-2xl text-white font-semibold mb-4">Case Details</h3>
        <p className="text-white text-lg font-medium">
          Case Number: {selectedCase.caseNumber}
        </p>
        <p className="text-white text-lg">
          Incident Type: {selectedCase.incidentType}
        </p>
        <p className="text-white text-lg">
          Victim Name: {selectedCase.victimName}
        </p>
        <p className="text-white text-lg">
          Description: {selectedCase.description}
        </p>
        <p className="text-white text-lg">
          Location: {selectedCase.location}
        </p>
        <p className="text-white text-lg">
          Assigned Officer: {selectedCase.assignedTo}
        </p>
      </div>
    )}
  </div>

  {/* Right Sidebar */}
  <div className="space-y-6">
    {/* Recent Tips */}
    <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
      <h2 className="text-xl font-semibold text-white mb-4">Recent Tips</h2>
      <div className="space-y-4">
        {recentTips.map((tip) => (
          <div key={tip.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-blue-300">{tip.type}</span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-200">
                {tip.status}
              </span>
            </div>
            <p className="text-white text-sm mt-2">{tip.content}</p>
            <span className="text-sm text-blue-300 mt-2 block">
              {tip.time}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Patrol Units */}
    <div className="bg-slate-900/50 backdrop-blur-md rounded-xl p-6 border border-blue-400/20">
      <h2 className="text-xl font-semibold text-white mb-4">Patrol Units</h2>
      <div className="space-y-4">
        {patrolUnits.map((unit) => (
          <div key={unit.id} className="bg-white/5 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-medium">{unit.officer}</span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  unit.status === "On Patrol"
                    ? "bg-green-500/20 text-green-200"
                    : unit.status === "Responding"
                    ? "bg-red-500/20 text-red-200"
                    : "bg-blue-500/20 text-blue-200"
                }`}
              >
                {unit.status}
              </span>
            </div>
            <div className="flex items-center space-x-2 mt-2 text-sm text-blue-200">
              <MapPin className="h-4 w-4" />
              <span>{unit.location}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default PoliceDashboard;
