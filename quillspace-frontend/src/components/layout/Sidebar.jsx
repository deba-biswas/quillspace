import { Home, FileText, Edit3, User, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ setIsLoggedIn }) {
  const navItems = [
    {
      icon: <Home className="w-5 h-5" />,
      label: "Home",
      path: "/",
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: "Posts",
      path: "/posts",
    },
    {
      icon: <Edit3 className="w-5 h-5" />,
      label: "Create Post",
      path: "/create",
    },
    {
      icon: <User className="w-5 h-5" />,
      label: "Account",
      path: "/account",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      path: "/settings",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("QuillSpace_token");
    localStorage.removeItem("QuillSpace_user");
    localStorage.removeItem("QuillSpace_theme");

    setIsLoggedIn(false);
  };

  return (
    <aside className="fixed h-screen w-64 flex flex-col px-4 py-8 bg-ink-sidebar dark:bg-ink-dark-sidebar border-r border-teal-200/50 dark:border-ink-dark-border transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 mb-10">
        <div className="w-10 h-10 rounded-xl bg-ink-btn text-white flex items-center justify-center shadow-sm">
          <Edit3 className="w-5 h-5" />
        </div>

        <div>
          <h1 className="font-serif text-2xl font-bold text-ink-text dark:text-white">
            QuillSpace
          </h1>

          <p className="text-xs text-gray-500 dark:text-gray-400">
            Share your stories
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                isActive
                  ? "bg-ink-btn text-white shadow-md"
                  : "text-gray-700 dark:text-gray-300 hover:bg-white/60 dark:hover:bg-[#2F3741] hover:text-ink-text dark:hover:text-white"
              }`
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="mt-6 flex items-center justify-center gap-2 bg-white dark:bg-ink-dark-card border border-gray-300 dark:border-ink-dark-border text-gray-700 dark:text-gray-200 py-3 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-[#313943] transition-all duration-300 shadow-sm dark:shadow-black/30"
      >
        <LogOut className="w-4 h-4" />
        Logout
      </button>
    </aside>
  );
}
