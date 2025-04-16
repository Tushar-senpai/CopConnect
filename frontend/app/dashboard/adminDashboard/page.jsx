'use client'
import React, { useState, useEffect }  from "react";

const AdminDashboard = () => {
  const [officers, setOfficers] = useState([]);

  useEffect(() => {
    // Fetch data from your backend here. For now, using dummy data
    const dummyData = [
      {
        id: 1,
        name: "Officer 1",
        cases: 20,
        casesSolved: 18,
        performance: 90,
        responseTime: 5,
      },
      {
        id: 2,
        name: "Officer 2",
        cases: 15,
        casesSolved: 12,
        performance: 80,
        responseTime: 7,
      },
      {
        id: 3,
        name: "Officer 3",
        cases: 30,
        casesSolved: 25,
        performance: 83,
        responseTime: 4,
      },
      {
        id: 4,
        name: "Officer 4",
        cases: 25,
        casesSolved: 20,
        performance: 80,
        responseTime: 6,
      },
    ];
    setOfficers(dummyData); // Set the data into state
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-blue-900 py-10 px-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-white">
          <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
            Community
          </h1>
        </div>

        {/* Additional Metrics with Color-Coded Boxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Total Officers */}
  <div className="flex flex-col items-center bg-[#0075B6]/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-white">
    <h3 className="text-lg font-semibold text-[#0075B6]">Total Officers</h3>
    <p className="mt-2 text-4xl font-bold">50</p>
    <div className="w-full bg-[#0075B6] rounded-full h-2 mt-4">
      <div className="bg-[#1D88CC] h-2 rounded-full"></div>
    </div>
  </div>

  {/* Total Active Cases */}
  <div className="flex flex-col items-center bg-[#FF9F00]/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-white">
    <h3 className="text-lg font-semibold text-[#FF9F00]">Total Active Cases</h3>
    <p className="mt-2 text-4xl font-bold">120</p>
    <div className="w-full bg-[#FF9F00] rounded-full h-2 mt-4">
      <div className="bg-[#FFB84D] h-2 rounded-full"></div>
    </div>
  </div>

  {/* Total Cases Solved */}
  <div className="flex flex-col items-center bg-[#4CAF50]/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-white">
    <h3 className="text-lg font-semibold text-[#4CAF50]">Total Cases Solved</h3>
    <p className="mt-2 text-4xl font-bold">300</p>
    <div className="w-full bg-[#4CAF50] rounded-full h-2 mt-4">
      <div className="bg-[#66BB6A] h-2 rounded-full"></div>
    </div>
  </div>

  {/* Avg. Response Time */}
  <div className="flex flex-col items-center bg-[#009688]/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-white">
    <h3 className="text-lg font-semibold text-[#009688]">Avg. Response Time</h3>
    <p className="mt-2 text-4xl font-bold">6 min</p>
    <div className="w-full bg-[#009688] rounded-full h-2 mt-4">
      <div className="bg-[#26A69A] h-2 rounded-full"></div>
    </div>
  </div>

  {/* Case Resolution Rate */}
  <div className="flex flex-col items-center bg-[#3F51B5]/20 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out text-white">
    <h3 className="text-lg font-semibold text-[#3F51B5]">Case Resolution Rate</h3>
    <div className="w-full bg-[#3F51B5] rounded-full h-2 mt-4">
      <div
        className="bg-[#5C6BC0] h-2 rounded-full"
        style={{ width: "75%" }}
      ></div>
    </div>
    <p className="mt-2 text-4xl font-bold text-[#7986CB]">75%</p>
  </div>
</div>


        {/* Officer Stats Table */}
        <div className="min-h-screen py-10 px-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Officer Performance Overview with Lighter Background */}
            <div className="bg-gray-700 p-6 rounded-lg shadow-lg border border-blue-500/30 text-gray-100">
              <h2 className="text-xl font-semibold text-blue-300 mb-6">
                Officer Performance Overview
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {officers.map((officer) => (
                  <div
                    key={officer.id}
                    className="flex flex-col items-center bg-gray-600 p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold text-blue-300">
                      {officer.name}
                    </h3>
                    <p className="mt-2 text-gray-400">Cases: {officer.cases}</p>
                    <p className="mt-2 text-gray-400">
                      Cases Solved: {officer.casesSolved}
                    </p>
                    <div className="w-full bg-gray-500/20 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${officer.performance}%` }}
                      ></div>
                    </div>
                    <p className="mt-2 text-blue-400">
                      Performance: {officer.performance}%
                    </p>
                    <p className="mt-2 text-blue-400">
                      Response Time: {officer.responseTime} min
                    </p>
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

export default AdminDashboard;
