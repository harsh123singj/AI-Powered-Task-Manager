import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BACKEND_URL from "../api/url";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        // Required field validation
        if (!email.trim()) {
            setError("Email is required");
            return;
        }

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address");
            return;
        }

        try {
            setLoading(true);

            const response = await axios.post(
                `${BACKEND_URL}/api/auth/login`,
                {
                    email: email.trim(),
                    password
                }
            );

            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userName", response.data.name);

            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response?.status === 404) {
                setError("No account found with this email");
            } else if (error.response?.status === 401) {
                setError("Wrong password");
            } else {
                setError(
                    error.response?.data?.message ||
                    "Unable to login. Please try again."
                );
            }

        } finally {
            setLoading(false);
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

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">

                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-600">
                                        !
                                    </span>

                                    <p className="text-sm font-medium text-red-600">
                                        {error}
                                    </p>

                                </div>
                            )}

                            {/* Email */}
                            <div className="mb-4">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setError("");
                                    }}
                                    type="email"
                                    placeholder="Enter your email"
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${
                                        error && !email.trim()
                                            ? "border-red-300 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    }`}
                                />

                            </div>

                            {/* Password */}
                            <div className="mb-4">

                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Password
                                </label>

                                <input
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setError("");
                                    }}
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`w-full px-4 py-2.5 border rounded-lg outline-none transition ${
                                        error && !password.trim()
                                            ? "border-red-300 focus:ring-2 focus:ring-red-200"
                                            : "border-gray-200 focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
                                    }`}
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

                                <button
                                    type="button"
                                    onClick={() =>
                                        setError("Password reset is not available yet.")
                                    }
                                    className="text-sm text-emerald-600 font-medium hover:text-emerald-700"
                                >
                                    Forgot password?
                                </button>

                            </div>

                            {/* Login Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition shadow-md"
                            >
                                {loading ? "Signing In..." : "Sign In"}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="flex items-center gap-3 my-5">
                            <div className="flex-1 h-px bg-gray-200"></div>
                            <div className="flex-1 h-px bg-gray-200"></div>
                        </div>

                        {/* Social buttons */}
                        <div className="flex justify-center gap-3">
                        </div>

                        {/* Register */}
                        <p className="text-center text-gray-500 mt-5 text-sm">

                            Don't have an account?{" "}

                            <button
                                type="button"
                                onClick={() => navigate("/register")}
                                className="text-emerald-600 font-semibold hover:text-emerald-700"
                            >
                                Sign up
                            </button>

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