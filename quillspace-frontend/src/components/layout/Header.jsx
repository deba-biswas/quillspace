import { useState } from "react";
import {
  Search,
  Bell,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Header({ isLoggedIn, setIsLoggedIn, user, setUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Clear authentication data and reset the user session
  const handleLogout = () => {
    localStorage.removeItem("QuillSpace_token");
    localStorage.removeItem("QuillSpace_user");

    setIsLoggedIn(false);
    setUser(null);

    setIsMenuOpen(false);
  };

  return (
    <header className="h-20 flex items-center justify-between px-8 bg-ink-bg dark:bg-ink-dark-bg sticky top-0 z-10 border-b border-teal-100/50 dark:border-ink-dark-border transition-colors duration-300">
      {/* Search input */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />

        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 dark:border-ink-dark-border bg-white/70 dark:bg-ink-dark-card text-ink-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ink-btn/50 transition-colors duration-300"
        />
      </div>

      {/* User actions */}
      <div className="flex items-center gap-4 relative">
        {/* Notification indicator */}
        <button className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />

          {isLoggedIn && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Profile menu trigger */}
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full bg-ink-sidebar dark:bg-ink-dark-sidebar flex items-center justify-center text-ink-btn cursor-pointer border-2 border-transparent hover:border-ink-btn transition-all duration-300"
        >
          <User className="w-5 h-5" />
        </div>

        {/* User account dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-ink-dark-card rounded-xl shadow-lg dark:shadow-black/30 border border-gray-100 dark:border-ink-dark-border py-2 z-50 transition-colors duration-300">
            {isLoggedIn ? (
              <>
                {/* Logged-in user details */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-ink-dark-border mb-2">
                  <p className="text-sm font-bold text-ink-text dark:text-white truncate">
                    {user?.name || "User"}
                  </p>

                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>

                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-ink-bg dark:hover:bg-ink-dark-sidebar transition-colors"
                >
                  <Settings className="w-4 h-4" />
                  Account Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest menu */}
                <div className="px-4 py-3 border-b border-gray-100 dark:border-ink-dark-border mb-2">
                  <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Welcome to QuillSpace
                  </p>
                </div>

                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-ink-bg dark:hover:bg-ink-dark-sidebar transition-colors"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-ink-btn font-medium hover:bg-ink-bg dark:hover:bg-ink-dark-sidebar transition-colors"
                >
                  <UserPlus className="w-4 h-4" />
                  Create Account
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
