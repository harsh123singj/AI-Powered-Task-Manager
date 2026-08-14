import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-200 mt-12">
            <div className="max-w-6xl mx-auto px-6 py-6">

                <div className="flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Logo */}
                    <div className="flex items-center gap-2">
                        <span className="text-lg">📋</span>

                        <p className="text-sm font-semibold text-gray-700">
                            Task Manager
                        </p>
                    </div>


                    {/* Tagline */}
                    <p className="text-sm text-gray-500 text-center">
                        Stay organized. Stay productive.
                    </p>


                    {/* Social Links + Copyright */}
                    <div className="flex items-center gap-4">

                        {/* GitHub */}
                        <a
                            href="https://github.com/harsh123singj"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition"
                        >
                            GitHub
                        </a>

                        {/* LinkedIn */}
                        <a
                            href="https://www.linkedin.com/in/harsh-singh-b44575327/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-gray-500 hover:text-emerald-600 transition"
                        >
                            LinkedIn
                        </a>

                        <span className="text-gray-300">|</span>

                        <p className="text-sm text-gray-400">
                            © 2026 Task Manager
                        </p>

                    </div>

                </div>

            </div>
        </footer>
    );
};

export default Footer;