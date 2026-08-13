import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.error(
                "Make sure your passwords are the same");
            return;

        }
        try{
        await axios.post(
            "http://localhost:4001/api/auth/register",
            {
                name,
                email,
                password
            }
        )
    
        navigate("/")}
        catch(error){
            console.log(error)
        }

    }



    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

            <div className="w-full max-w-4xl min-h-[500px] bg-white rounded-2xl shadow-xl overflow-hidden grid md:grid-cols-2">

                {/* Left Side - Register Form */}
                <div className="p-6 md:p-8 flex flex-col justify-center">

                    <div className="max-w-sm w-full mx-auto">

                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                            Create Account
                        </h1>

                        <p className="text-gray-500 mb-6">
                            Create your account and start managing your tasks
                        </p>

                        <form onSubmit={handleSubmit}>
                            {/* Name */}
                            <div className="mb-4">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Name
                                </label>

                                <input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    type="text"
                                    placeholder="Enter your name"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />
                            </div>

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
                                    placeholder="Create a password"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-5">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Confirm Password
                                </label>

                                <input
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    type="password"
                                    placeholder="Confirm your password"
                                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent transition"
                                />
                            </div>

                            {/* Register Button */}
                            <button
                                type="submit"
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition shadow-md"
                            >
                                Create Account
                            </button>

                        </form>

                        {/* Login */}
                        <p className="text-center text-gray-500 mt-5 text-sm">
                            Already have an account?{" "}
                            <a
                                href="/"
                                className="text-emerald-600 font-semibold hover:text-emerald-700"
                            >
                                Sign in
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
                            Join Task Manager
                        </h2>

                        <p className="text-emerald-50 text-base leading-relaxed">
                            Create your account, organize your work,
                            and stay productive every day.
                        </p>

                        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-2xl p-5">
                            <p className="text-base font-medium">
                                "Turn your plans into progress."
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Register;