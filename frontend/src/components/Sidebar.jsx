import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Upload,
  FileText,
  History,
  Brain,
} from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-64 bg-slate-900 text-white h-screen p-5">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
          <Brain size={22} />
        </div>

        <div>
          <h2 className="text-xl font-bold">
            Resume Analyzer
          </h2>

          <p className="text-xs text-slate-400">
            ATS Scanner
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-3">
        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        {/* Upload Resume */}
        <NavLink
          to="/upload"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <Upload size={20} />
          Upload Resume
        </NavLink>

        {/* Analysis */}
        <NavLink
          to="/analysis"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <FileText size={20} />
          Analysis
        </NavLink>

        {/* History */}
        <NavLink
          to="/history"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-xl transition-all ${
              isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "hover:bg-slate-800"
            }`
          }
        >
          <History size={20} />
          History
        </NavLink>
      </nav>
    </div>
  );
}