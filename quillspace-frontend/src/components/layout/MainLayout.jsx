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
    <div className="flex min-h-screen bg-ink-bg font-sans text-ink-text">
      <Sidebar setIsLoggedIn={setIsLoggedIn} setUser={setUser} />

      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <Header
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          user={user}
          setUser={setUser}
        />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
