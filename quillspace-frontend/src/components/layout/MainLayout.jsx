import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function MainLayout({
  isLoggedIn,
  setIsLoggedIn,
  user,
  setUser,
}) {
  return (
    <div className="flex min-h-screen bg-ink-bg dark:bg-ink-dark-bg font-sans text-ink-text dark:text-white transition-colors duration-300">
      <Sidebar setIsLoggedIn={setIsLoggedIn} setUser={setUser} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />

        <main className="flex-1 transition-colors duration-300">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
