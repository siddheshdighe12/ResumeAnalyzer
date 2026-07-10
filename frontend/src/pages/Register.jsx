import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  ArrowRight,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await registerUser(formData);

      setMessage(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
          <h2 className="text-4xl font-bold text-slate-800">
            Create Account
          </h2>

          <p className="text-slate-500 mt-2">
            Start analyzing resumes today
          </p>

          {message && (
            <div className="mt-4 p-3 rounded-lg bg-blue-100 text-blue-700">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div className="relative">
              <User
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <Mail
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-4 top-4 text-slate-400"
                size={20}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl flex justify-center items-center gap-2 transition"
            >
              Create Account
              <ArrowRight size={18} />
            </button>
          </form>

          <p className="text-center text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}