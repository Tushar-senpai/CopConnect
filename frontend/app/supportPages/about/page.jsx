import React from "react";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#132b6c] via-[#193592] to-[#17337b] text-white p-8">
      <h1 className="text-4xl font-extrabold text-blue-100">For You — The Heart of CopConnect</h1>

      <p className="mt-6 text-lg text-blue-200 leading-relaxed max-w-3xl">
        At <span className="text-white font-semibold">CopConnect</span>, we’re more than just a platform. We’re a bridge between
        communities and law enforcement. Whether you're a vigilant citizen or a dedicated officer, everything here is built <span className="italic text-blue-100">for you</span>.
      </p>

      <div className="mt-10 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-900/50 border border-blue-700 p-6 rounded-xl shadow-lg hover:shadow-blue-800 transition">
          <h2 className="text-2xl font-bold text-blue-100 mb-3">For Citizens</h2>
          <p className="text-blue-200">
            Stay informed, connected, and protected. Receive updates, request help, and engage with your community — all while knowing your data is safe.
          </p>
        </div>

        <div className="bg-blue-900/50 border border-blue-700 p-6 rounded-xl shadow-lg hover:shadow-blue-800 transition">
          <h2 className="text-2xl font-bold text-blue-100 mb-3">For Officers</h2>
          <p className="text-blue-200">
            Empower your service with modern tools. Communicate clearly, respond faster, and gain real-time insights to serve better and safer.
          </p>
        </div>

        <div className="bg-blue-900/50 border border-blue-700 p-6 rounded-xl shadow-lg hover:shadow-blue-800 transition md:col-span-2">
          <h2 className="text-2xl font-bold text-blue-100 mb-3">Our Mission</h2>
          <p className="text-blue-200">
            We believe in trust, transparency, and teamwork. CopConnect redefines how safety is delivered — not top-down, but side-by-side.
          </p>
        </div>
      </div>

      <div className="mt-16 text-center">
        <h3 className="text-xl text-white font-medium">Together, we build stronger, safer communities.</h3>
        <p className="text-blue-200 mt-2">CopConnect — made for connection, driven by trust.</p>
      </div>
    </div>
  );
};

export default About;
