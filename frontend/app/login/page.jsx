"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "../HelpingComponents/Footer";
import Navbar from "../HelpingComponents/Navbar";

const Login = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");

  const [isSignup, setIsSignup] = useState(false);
  const [credentials, setCredentials] = useState({
    name: "",
    phone: "",
    badgeNumber: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!role || !["police", "citizen", "anonymous"].includes(role)) {
      router.push("/");
    }
    if (role === "anonymous") {
      sessionStorage.setItem("loggedIn", "anonymous");
      router.push("/dashboard/anonymousDashboard");
    }
  }, [role, router]);

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,  // Dynamically update the correct field
    }));
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isSignup ? "http://localhost:5001/api/users/register" : "http://localhost:5001/api/users/login";
    const payload = { ...credentials, role };

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      console.log("API Response:", data);


      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (data.token) {
        sessionStorage.setItem("token", data.token);
        sessionStorage.setItem("role", role);
        sessionStorage.setItem("data", JSON.stringify(data));
        router.push(`/dashboard/${role}Dashboard`);
      } else {
        setError("❌ Unexpected error, please try again.");
      }
    } catch (error) {
      setError(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      {role !== "anonymous" && (
        <div className="min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-blue-900">
          {/* Left Section: Login Box */}
          <div className="flex flex-col items-center justify-center">
            <h1 className="text-5xl pb-8 pl-16 font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-300">
              Login as {role?.charAt(0).toUpperCase() + role?.slice(1)}
            </h1>
            <div className="w-full max-w-md p-8 bg-gray-800 rounded-xl shadow-xl flex-shrink-0 ml-20">
              {/* Title above the login box */}
              {error && (
                <p className="text-red-400 text-sm text-center">{error}</p>
              )}

              <form onSubmit={handleAuth} className="space-y-4">
                {role === "police" && (
                  <>
                    <input
                      type="text"
                      name="badgeNumber"
                      placeholder="Badge Number"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
                      value={credentials.badgeNumber}
                      onChange={handleChange} 
                    />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
                      value={credentials.name}
                      onChange={handleChange} 
                    />
                  </>
                )}
                {role === "citizen" && (
                  <>
                    <input
                      type="string"
                      name="name"
                      placeholder="Name"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
                      value={credentials.name}
                      onChange={handleChange} 
                    />
                    <input
                      type="Number"
                      name="phone"
                      placeholder="Mobile Number"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
                      value={credentials.mobile}
                      onChange={handleChange} 
                    />
                  </>
                )}
                {role === "community" && (
                  <>
                    <input
                      type="text"
                      placeholder="Admin ID"
                      name="adminId"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
                      value={credentials.adminId}
                      onChange={handleChange} 
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring focus:ring-blue-500"
                      value={credentials.password}
                      onChange={handleChange} 
                    />
                  </>
                )}
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
                >
                  {isSignup ? "Sign Up" : "Login"}
                </button>
              </form>
              <p className="text-gray-400 text-sm text-center mt-4">
                {isSignup
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  className="text-blue-400 hover:underline"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>

          {/* Right Section: Image */}
          <div className="absolute top-4 right-8 bottom-4 w-1/2 h-99% rounded-3xl overflow-hidden">
            <img
              src={[role]+"Bg.jpg" || "/defaultBg.jpg"}
              alt="Login Image"
              className="w-full h-full object-cover rounded-3xl"
            />
          </div>
        </div>
      )}
      {/* <Footer /> */}
    </>
  );
};

export default Login;
