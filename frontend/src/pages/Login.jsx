import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await axios.post(
            "http://localhost:4001/api/auth/login",
            {
                email,
                password
            }
        );

        console.log("Logged in as:", response.data.name);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userName", response.data.name);

        navigate("/dashboard");

    } catch (error) {
        console.error(error);
    }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="w-full max-w-4xl min-h-[400px] bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side - Login Form */}
        <div className="p-6 md:p-8 flex flex-col justify-center">

          <div className="max-w-sm w-full mx-auto">

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>

            <p className="text-gray-500 mb-6">
              Sign in to continue to your account
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </div>

              {/* Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                />
              </div>

              {/* Options */}
              <div className="flex items-center justify-between mb-5">

                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-emerald-500"
                  />
                  Remember me
                </label>

                <button className="text-sm text-emerald-600 font-medium hover:text-emerald-700">
                  Forgot password?
                </button>

              </div>

              {/* Login Button */}
              <button
                type='submit'
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md">
                Sign In
              </button>

            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-gray-200"></div>

              <span className="text-sm text-gray-400">
                or continue with
              </span>

              <div className="flex-1 h-px bg-gray-200"></div>
            </div>

            {/* Social buttons */}
            <div className="flex justify-center gap-3">

              <button className="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                G
              </button>

              <button className="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                f
              </button>

              <button className="w-10 h-10 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                GH
              </button>

            </div>

            {/* Register */}
            <p className="text-center text-gray-500 mt-5 text-sm">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-emerald-600 font-semibold hover:text-emerald-700"
              >
                Sign up
              </a>
            </p>

          </div>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex bg-gradient-to-br from-emerald-500 to-emerald-700 text-white items-center justify-center p-8 relative overflow-hidden">

          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-black/10 rounded-full"></div>

          <div className="relative text-center max-w-sm">

            <div className="text-5xl mb-5">
              📋
            </div>

            <h2 className="text-3xl font-bold mb-4">
              Task Manager
            </h2>

            <p className="text-emerald-50 text-base leading-relaxed">
              Organize your work, manage your tasks,
              stay productive and achieve more every day.
            </p>

            <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
              <p className="text-base font-medium">
                "Plan better. Work smarter. Get things done."
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;