import { useState } from "react";
import {
  Save,
  Edit3,
  CheckCircle,
  AlertCircle,
  Loader2,
  Lock,
  X,
} from "lucide-react";

export default function Account({ user, setUser }) {
  // Profile state
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: "", text: "" });

  // Password state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ type: "", text: "" });

  // Update profile information
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ type: "", text: "" });

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("inkwell_user", JSON.stringify(data));
        setUser(data);
        setProfileMsg({
          type: "success",
          text: "Profile updated successfully!",
        });

        // Exit edit mode after a successful update
        setIsEditing(false);
      } else {
        setProfileMsg({
          type: "error",
          text: data.message || "Failed to update profile.",
        });
      }
    } catch (err) {
      setProfileMsg({
        type: "error",
        text: "Cannot connect to the server.",
      });
    } finally {
      setProfileLoading(false);
    }
  };

  // Update account password
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordMsg({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({
        type: "error",
        text: "New passwords do not match.",
      });
      return;
    }

    if (newPassword.length < 8) {
      setPasswordMsg({
        type: "error",
        text: "New password must be at least 8 characters.",
      });
      return;
    }

    setPasswordLoading(true);

    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}/password`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setPasswordMsg({
          type: "success",
          text: "Password changed successfully!",
        });

        // Reset password fields
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordMsg({
          type: "error",
          text: data.message || "Failed to change password.",
        });
      }
    } catch (err) {
      setPasswordMsg({
        type: "error",
        text: "Cannot connect to the server.",
      });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto font-sans text-ink-text dark:text-white pb-20 space-y-8 transition-colors duration-300">
      <div>
        <h2 className="text-2xl font-bold font-serif mb-2">Account Settings</h2>

        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Manage your personal information and security preferences.
        </p>
      </div>

      {/* Profile information */}
      <div className="bg-white dark:bg-ink-dark-card rounded-2xl shadow-sm dark:shadow-black/30 border border-gray-200 dark:border-ink-dark-border overflow-hidden transition-colors duration-300">
        <div className="bg-gray-50 dark:bg-ink-dark-sidebar px-8 py-5 border-b border-gray-100 dark:border-ink-dark-border flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white">
            Profile Information
          </h3>

          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 text-sm font-semibold text-white hover:text-opacity-80 transition-colors bg-ink-btn px-3 py-1.5 rounded-md"
            >
              <Edit3 className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>

        <div className="p-8">
          {profileMsg.text && (
            <div
              className={`mb-6 p-4 border rounded-lg text-sm font-medium flex items-start gap-2 ${
                profileMsg.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {profileMsg.type === "success" ? (
                <CheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}

              <span>{profileMsg.text}</span>
            </div>
          )}

          {!isEditing ? (
            /* Read-only profile view */
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-ink-sidebar flex items-center justify-center text-ink-btn border-4 border-white shadow-sm overflow-hidden shrink-0">
                <img
                  src={`https://api.dicebear.com/7.x/notionists/svg?seed=${
                    user?.name || "User"
                  }`}
                  alt="Avatar"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  Display Name
                </p>

                <p className="text-xl font-bold text-white mb-3">
                  {user?.name}
                </p>

                <p className="text-sm text-gray-400 font-semibold uppercase tracking-wider">
                  Email Address
                </p>

                <p className="text-base text-white">{user?.email}</p>
              </div>
            </div>
          ) : (
            /* Profile edit form */
            <form onSubmit={handleUpdateProfile} className="space-y-5">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 rounded-full bg-ink-sidebar overflow-hidden shrink-0 border-2 border-white shadow-sm">
                  <img
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${name || "User"}`}
                    alt="Avatar preview"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>

                <p className="text-sm text-gray-500 font-medium">
                  Your avatar is generated automatically based on your display
                  name.
                </p>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Display Name
                </label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-ink-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white dark:bg-ink-dark-sidebar dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 dark:border-ink-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white dark:bg-ink-dark-sidebar dark:text-white"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 rounded-lg font-semibold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-[#313943] flex items-center gap-2 transition-all"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={profileLoading}
                  className="bg-ink-btn text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-opacity-90 flex items-center gap-2 transition-all shadow-sm disabled:opacity-50"
                >
                  {profileLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}

                  {profileLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Security settings */}
      <div className="bg-white dark:bg-ink-dark-card rounded-2xl shadow-sm dark:shadow-black/30 border border-gray-200 dark:border-ink-dark-border overflow-hidden transition-colors duration-300">
        <div className="bg-gray-50 dark:bg-ink-dark-sidebar px-8 py-5 border-b border-gray-100 dark:border-ink-dark-border flex items-center gap-3">
          <Lock className="w-5 h-5 text-gray-500 dark:text-gray-300" />
          <h3 className="font-bold text-gray-900 dark:text-white">
            Security & Password
          </h3>
        </div>

        <div className="p-8">
          {passwordMsg.text && (
            <div
              className={`mb-6 p-4 border rounded-lg text-sm font-medium flex items-start gap-2 ${
                passwordMsg.type === "success"
                  ? "bg-green-50 border-green-200 text-green-700"
                  : "bg-red-50 border-red-200 text-red-600"
              }`}
            >
              {passwordMsg.type === "success" ? (
                <CheckCircle className="w-5 h-5 shrink-0" />
              ) : (
                <AlertCircle className="w-5 h-5 shrink-0" />
              )}

              <span>{passwordMsg.text}</span>
            </div>
          )}

          <form onSubmit={handlePasswordChange} className="max-w-md space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-400 mb-1">
                Current Password
              </label>

              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-ink-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white dark:bg-ink-dark-sidebar dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-1">
                New Password
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-ink-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white dark:bg-ink-dark-sidebar dark:text-white"
              />

              <p className="text-xs text-gray-400 mt-1">
                Must be at least 8 characters long.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-400 mb-1">
                Confirm New Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-ink-dark-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white dark:bg-ink-dark-sidebar dark:text-white"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={passwordLoading}
                className="bg-gray-800 dark:bg-ink-btn text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-black dark:hover:opacity-90 flex items-center gap-2 transition-all shadow-sm dark:shadow-black/30 disabled:opacity-50"
              >
                {passwordLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4" />
                )}

                {passwordLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
