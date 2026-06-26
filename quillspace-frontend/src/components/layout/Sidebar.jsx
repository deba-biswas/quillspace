import { Home, FileText, Edit3, User, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ setIsLoggedIn }) {
  const navItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", path: "/" },
    { icon: <FileText className="w-5 h-5" />, label: "Posts", path: "/posts" },
    {
      icon: <Edit3 className="w-5 h-5" />,
      label: "Create Post",
      path: "/create",
    },
    { icon: <User className="w-5 h-5" />, label: "Account", path: "/account" },
    {
      icon: <Settings className="w-5 h-5" />,
      label: "Settings",
      path: "/settings",
    },
  ];

  // Clear authentication data and update the application state
  const handleLogout = () => {
    localStorage.removeItem("QuillSpace_token");
    setIsLoggedIn(false);
  };

  return (
    <aside className="w-64 bg-ink-sidebar flex flex-col pt-8 pb-8 px-4 border-r border-teal-200/50 fixed h-full">
      <div className="flex items-center gap-2 px-4 mb-10 font-serif text-2xl font-bold">
        <Edit3 className="w-6 h-6" />
        QuillSpace
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-black/5 text-ink-text"
                  : "text-gray-600 hover:bg-black/5"
              }`
            }
          >
            {item.icon}
            {item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="mt-auto bg-white border border-gray-300 py-2 rounded-md font-medium text-sm hover:bg-gray-50 transition-colors"
      >
        Logout
      </button>
    </aside>
  );
}
