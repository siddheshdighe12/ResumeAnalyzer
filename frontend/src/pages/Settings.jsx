import { Settings, User, Mail, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="flex items-center gap-3">
          <Settings size={36} className="text-blue-600" />

          <h1 className="text-4xl font-bold">
            Settings
          </h1>
        </div>

        <p className="text-slate-500 mt-2">
          Manage your account settings
        </p>
      </div>

      <div className="space-y-6">

        {/* Profile Settings */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <User size={24} />
            Profile Information
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              defaultValue="Shubham Kumar"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              defaultValue="shubham@gmail.com"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
              Save Changes
            </button>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Lock size={24} />
            Change Password
          </h2>

          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="New Password"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl">
              Update Password
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}