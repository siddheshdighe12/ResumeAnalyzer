import { useState } from "react";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
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
      const res = await loginUser(formData);

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setMessage("Login successful!");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      {/* Left Section */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700"></div>

        <div className="relative z-10 flex flex-col justify-center px-20 text-white">
          <div className="mb-10">
            <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center text-3xl font-bold">
              AI
            </div>
          </div>

          <h1 className="text-6xl font-bold leading-tight">
            Resume Analysis
            <br />
            Powered by AI
          </h1>

          <p className="mt-6 text-lg text-blue-100">
            Upload resumes, analyze ATS scores,
            discover missing skills, and get
            AI-powered suggestions.
          </p>

          <div className="mt-12 flex gap-4">
            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">
                89%
              </h3>
              <p>Best ATS Score</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl">
              <h3 className="text-3xl font-bold">
                500+
              </h3>
              <p>Resumes Analyzed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex items-center justify-center p-6 backdrop-blur-sm">
        <div className="w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20">
            <h2 className="text-4xl font-bold text-slate-800">
              Welcome Back
            </h2>

            <p className="text-slate-500 mt-2">
              Sign in to continue
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
                Login
                <ArrowRight size={18} />
              </button>
            </form>

            <p className="text-center text-slate-500 mt-6">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}