import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const initials = user.name
    ? user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "U";

  const handleProfile = () => {
    navigate("/profile");
    setIsOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="bg-white shadow-sm border-b px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          AI Resume Analyzer
        </h1>
      </div>

      {/* User Menu */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 hover:bg-slate-100 px-3 py-2 rounded-xl transition"
        >
          <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
            {initials}
          </div>

          <div className="hidden md:block text-left">
            <p className="font-medium text-slate-800">
              {user.name || "User"}
            </p>

            <p className="text-xs text-slate-500">
              {user.email}
            </p>
          </div>

          <ChevronDown
            size={18}
            className={`transition ${isOpen ? "rotate-180" : ""
              }`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border z-50 overflow-hidden">
            {/* User Info */}
            <div className="px-4 py-4 border-b">
              <p className="font-semibold text-slate-800">
                {user.name || "User"}
              </p>

              <p className="text-sm text-slate-500">
                {user.email}
              </p>
            </div>

            {/* Profile */}
            <button
              onClick={handleProfile}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 text-left"
            >
              <User size={18} />
              Profile
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-red-600 text-left"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}