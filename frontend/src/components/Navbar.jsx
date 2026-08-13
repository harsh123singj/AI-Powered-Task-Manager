import React from "react";
import{ useNavigate} from "react-router-dom"

const Navbar = () => {


  const navigate = useNavigate();
  const handleLogout =()=>{
    localStorage.removeItem("token");
    navigate("/")
  }
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center text-xl">
            📋
          </div>

          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Task Manager
            </h1>

            <p className="text-xs text-gray-500">
              Stay organized. Stay productive.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-gray-800">
              Welcome, Harsh
            </p>

            <p className="text-xs text-gray-500">
              Manage your tasks
            </p>
          </div>

          <button
          onClick={handleLogout}
            className="px-4 py-2 text-sm font-semibold text-emerald-600 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </nav>
  );
};

export default Navbar;