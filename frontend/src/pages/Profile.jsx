import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Calendar,
  FileText,
  Pencil,
  Save,
  X,
} from "lucide-react";

import API from "../api/api";

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    status: "Active",
    uploadedResumes: 0,
    joined: "",
  });

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // Fetch Profile
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(data);

      setFormData({
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Save Updated Profile
  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await API.put(
        "/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      // Update Profile State
      setProfile((prev) => ({
        ...prev,
        name: data.user.name,
        email: data.user.email,
      }));

      // Update Form State
      setFormData({
        name: data.user.name,
        email: data.user.email,
      });

      // Update Local Storage
      const user =
        JSON.parse(localStorage.getItem("user")) || {};

      user.name = data.user.name;
      user.email = data.user.email;

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      // Exit Edit Mode
      setEditMode(false);

      // Refresh Profile Data
      fetchProfile();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update profile"
      );
    }
  };

  const initials = profile.name
    ? profile.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "U";

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <div className="flex items-center gap-3">
            <User
              size={36}
              className="text-blue-600"
            />
            <h1 className="text-4xl font-bold">
              Profile
            </h1>
          </div>

          <p className="text-slate-500 mt-2">
            Manage your account information
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <Pencil size={18} />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl"
            >
              <Save size={18} />
              Save
            </button>

            <button
              onClick={() => {
                setEditMode(false);

                setFormData({
                  name: profile.name,
                  email: profile.email,
                });
              }}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-xl"
            >
              <X size={18} />
              Cancel
            </button>
          </div>
        )}
      </div>

      {/* Profile Card */}
      <div className="bg-white rounded-3xl shadow-md p-8">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center text-3xl font-bold">
            {initials}
          </div>

          <div className="flex-1">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3 mb-3"
                />

                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full border rounded-xl p-3"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold">
                  {profile.name}
                </h2>

                <p className="text-slate-500">
                  {profile.email}
                </p>
              </>
            )}
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">

          <div className="bg-slate-50 p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Mail className="text-blue-600" />
              <span>Email</span>
            </div>

            <p className="mt-3 font-semibold">
              {profile.email}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" />
              <span>Account Status</span>
            </div>

            <p className="mt-3 font-semibold text-green-600">
              {profile.status}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <FileText className="text-blue-600" />
              <span>Uploaded Resumes</span>
            </div>

            <p className="mt-3 text-3xl font-bold text-blue-600">
              {profile.uploadedResumes}
            </p>
          </div>

          <div className="bg-slate-50 p-5 rounded-2xl">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-600" />
              <span>Member Since</span>
            </div>

            <p className="mt-3 font-semibold">
              {profile.joined
                ? new Date(
                  profile.joined
                ).toLocaleDateString()
                : "-"}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}