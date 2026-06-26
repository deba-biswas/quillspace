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
    <header className="h-20 flex items-center justify-between px-8 bg-ink-bg sticky top-0 z-10 border-b border-teal-100/50">
      {/* Search input */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-200 bg-white/50 focus:outline-none focus:ring-2 focus:ring-ink-btn/50"
        />
      </div>

      {/* User actions */}
      <div className="flex items-center gap-4 relative">
        {/* Notification indicator */}
        <button className="relative p-2 hover:bg-black/5 rounded-full transition-colors">
          <Bell className="w-5 h-5 text-gray-600" />
          {isLoggedIn && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          )}
        </button>

        {/* Profile menu trigger */}
        <div
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="w-10 h-10 rounded-full bg-ink-sidebar flex items-center justify-center text-ink-btn cursor-pointer border-2 border-transparent hover:border-ink-btn transition-all"
        >
          <User className="w-5 h-5" />
        </div>

        {/* User account dropdown */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-50">
            {isLoggedIn ? (
              <>
                {/* Logged-in user details */}
                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                  <p className="text-sm font-bold text-ink-text truncate">
                    {user?.name || "User"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email || "No email"}
                  </p>
                </div>

                <Link
                  to="/account"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-ink-bg transition-colors"
                >
                  <Settings className="w-4 h-4" /> Account Settings
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <>
                {/* Guest menu */}
                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                  <p className="text-sm font-semibold text-gray-500">
                    Welcome to QuillSpace
                  </p>
                </div>

                <Link
                  to="/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-ink-bg transition-colors"
                >
                  <LogIn className="w-4 h-4" /> Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2 text-sm text-ink-btn font-medium hover:bg-ink-bg transition-colors"
                >
                  <UserPlus className="w-4 h-4" /> Create Account
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
