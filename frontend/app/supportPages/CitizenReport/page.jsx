"use client";
import { FileText, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode"; // Correct import

const socket = io("http://localhost:5001"); // Update with backend URL

const FileReportPage = () => {
  const [reportData, setReportData] = useState({
    reportType: "Pending",
    description: "",
    location: { lat: null, lng: null },
    filedBy: "", // Set dynamically after decoding token
    phone: "", // Store user's phone number
  });

  const [message, setMessage] = useState(null);

  useEffect(() => {
    // Get user info from JWT token in sessionStorage
    const token = sessionStorage.getItem("token");
    const data = JSON.parse(sessionStorage.getItem("data"));
    if (token) {
      try {
        const decoded_token = jwtDecode(token); // Decode token
        console.log("Decoded Token:", decoded_token);
        console.log("full data:", data);
        console.log("name inside data: ", data.user.name);

        setReportData((prevState) => ({
          ...prevState,
          filedBy: data.user.name, // Set filedBy to user's name
          phone: data.user.phone, // Set phone number
        }));
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }

    // Listen for real-time updates
    socket.on("new_complaint", (complaint) => {
      console.log("New complaint received:", complaint);
      setMessage(`New complaint submitted: ${complaint.type}`);

      // Auto-hide message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    });

    return () => socket.off("new_complaint"); // Cleanup on unmount
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReportData((prevState) => ({
      ...prevState,
      [name]: value, // Only update the changed field
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = sessionStorage.getItem("token");

      console.log("Submitting now : ");
      console.log("this is the report data being sent ", reportData);

      const response = await fetch(
        "http://localhost:5001/api/reports/fileReport",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Ensure correct format
          },
          body: JSON.stringify(reportData),
        }
      );

      const data = await response.json();
      console.log("Response from server:", data);

      if (response.ok) {
        setMessage("Complaint filed successfully! Our officer will get in touch with u in a few moments.");
        socket.emit("new_complaint", data); // Notify backend
        setReportData({
          type: "",
          description: "",
          location: "",
          filedBy: reportData.filedBy,
          phone: reportData.phone,
        });
      } else {
        setMessage(data.error || "Failed to submit complaint.");
      }
    } catch (error) {
      setMessage("Error submitting complaint.");
      console.error("Submission error:", error);
    }

    // Auto-hide message after 5 seconds
    setTimeout(() => setMessage(null), 5000);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setReportData((prevData) => ({
          ...prevData,
          location: { lat: latitude, lng: longitude },
        }));
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-cyan-600 to-blue-700 p-8">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-teal-600 to-cyan-700 rounded-xl p-6 text-white border border-blue-400/20 hover:shadow-lg hover:shadow-blue-500/20 transform hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center space-x-4 mb-4">
            <div className="bg-white/10 p-3 rounded-lg">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-xl font-semibold">File a New Report</h2>
          </div>

          {message && (
            <div className="bg-blue-500 text-white p-3 rounded-lg mb-4 text-center">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-semibold">
                Report Type
              </label>
              <select
                id="type"
                name="type"
                value={reportData.type}
                onChange={handleChange}
                className="w-full p-3 mt-2 bg-white/10 text-white border border-blue-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                <option value="Accident">Accident</option>
                <option value="Crime">Crime</option>
                <option value="Suspicious Activity">Suspicious Activity</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={reportData.description}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 mt-2 bg-white/10 text-white border border-blue-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Describe the incident in detail"
              ></textarea>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-semibold">
                Location
              </label>
              <div className="flex items-center space-x-2 mt-2">
                <MapPin className="h-6 w-6 text-white" />

                {/* Input shows lat,lng as a string for reference */}
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={
                    reportData.location.lat && reportData.location.lng
                      ? `${reportData.location.lat}, ${reportData.location.lng}`
                      : ""
                  }
                  onChange={handleChange}
                  className="w-full p-3 bg-white/10 text-white border border-blue-400/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter the location or use current"
                />

                {/* Button to auto-fill current location */}
                <button
                  type="button"
                  onClick={getLocation}
                  className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Use Current
                </button>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Submit Report
              </button>
              <button
                type="button"
                onClick={() =>
                  setReportData({
                    type: "",
                    description: "",
                    location: "",
                    severity: "Low",
                  })
                }
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default FileReportPage;
