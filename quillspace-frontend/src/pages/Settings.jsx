import { useState } from "react";
import { Moon, Sun, AlertTriangle, Trash2, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Settings page for managing application preferences
 * and account-related actions.
 */
export default function Settings({
  user,
  setUser,
  setIsLoggedIn,
  isDarkMode,
  setIsDarkMode,
}) {
  // Controls the account deletion workflow.
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const navigate = useNavigate();

  /**
   * Permanently deletes the current user's account.
   * Clears stored authentication data and redirects
   * the user after a successful deletion.
   */
  const confirmDeleteAccount = async () => {
    setIsDeleting(true);

    try {
      // Send account deletion request to the backend.
      const response = await fetch(
        `http://localhost:5000/api/users/${user._id}`,
        {
          method: "DELETE",
        },
      );

      if (response.ok) {
        // Remove locally stored user data.
        localStorage.removeItem("QuillSpace_token");
        localStorage.removeItem("QuillSpace_user");
        localStorage.removeItem("QuillSpace_theme");

        // Reset authentication state.
        setIsLoggedIn(false);
        setUser(null);

        // Return to the landing page.
        navigate("/");
      } else {
        alert("Failed to delete account. Please try again.");
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Failed to delete account:", error);
      alert("Cannot connect to the server.");
      setShowDeleteModal(false);
    } finally {
      // Stop the loading state regardless of the result.
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="p-8 max-w-2xl mx-auto font-sans text-ink-text dark:text-white pb-20 space-y-8 transition-colors duration-300">
        <div>
          <h2 className="text-2xl font-bold font-serif mb-2">Settings</h2>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your app preferences and account status.
          </p>
        </div>

        <div className="bg-white dark:bg-ink-dark-card rounded-2xl shadow-sm dark:shadow-black/30 border border-gray-200 dark:border-ink-dark-border overflow-hidden transition-colors duration-300">
          <div className="bg-gray-50 dark:bg-ink-dark-sidebar px-8 py-5 border-b border-gray-100 dark:border-ink-dark-border flex items-center gap-3">
            {isDarkMode ? (
              <Moon className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            ) : (
              <Sun className="w-5 h-5 text-gray-500 dark:text-gray-300" />
            )}

            <h3 className="font-bold text-gray-900 dark:text-white">
              Appearance
            </h3>
          </div>

          <div className="p-8 flex items-center justify-between">
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white mb-1">
                Dark Mode
              </h4>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                Adjust the appearance of InkWell to reduce glare and rest your
                eyes.
              </p>
            </div>

            {/* Toggle between light and dark themes */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all duration-300 ${
                isDarkMode
                  ? "bg-ink-btn"
                  : "bg-gray-300 dark:bg-ink-dark-border"
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                  isDarkMode ? "translate-x-8" : "translate-x-1"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="bg-red-50/60 dark:bg-red-950/20 rounded-2xl shadow-sm dark:shadow-black/30 border-2 border-red-200 dark:border-red-900 overflow-hidden transition-colors duration-300">
          <div className="bg-red-100/60 dark:bg-red-900/20 px-8 py-5 border-b border-red-200 dark:border-red-900 flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />

            <h3 className="font-bold text-red-700 dark:text-red-400">
              Danger Zone
            </h3>
          </div>

          <div className="p-8">
            <h4 className="font-bold text-gray-900 dark:text-white mb-2">
              Delete Account
            </h4>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-6">
              Once you delete your account, there is no going back. Please be
              certain. All your data, including your profile and login
              credentials, will be permanently erased.
            </p>

            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full sm:w-auto bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white px-6 py-2.5 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all shadow-sm dark:shadow-black/30"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white dark:bg-ink-dark-card rounded-2xl shadow-2xl max-w-md w-full border border-gray-100 dark:border-ink-dark-border transform transition-all">
            <div className="flex justify-between items-center p-5 border-b border-gray-100 dark:border-ink-dark-border">
              <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="w-5 h-5" />
                <h3 className="font-bold text-lg">Confirm Deletion</h3>
              </div>

              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors disabled:opacity-50"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                Are you absolutely sure you want to delete your account? You
                will lose access to <strong>InkWell</strong> forever, and this
                action{" "}
                <span className="font-bold underline decoration-red-500">
                  cannot be undone
                </span>
                .
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3 justify-end mt-2">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-lg font-semibold text-gray-700 dark:text-gray-300 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmDeleteAccount}
                  disabled={isDeleting}
                  className="px-5 py-2.5 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Yes, Delete My Account
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
