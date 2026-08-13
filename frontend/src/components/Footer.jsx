import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-6 py-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-3">

          <div className="flex items-center gap-2">
            <span className="text-lg">📋</span>
            <p className="text-sm font-semibold text-gray-700">
              Task Manager
            </p>
          </div>

          <p className="text-sm text-gray-500 text-center">
            Stay organized. Stay productive.
          </p>

          <p className="text-sm text-gray-400">
            © 2026 Task Manager
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;