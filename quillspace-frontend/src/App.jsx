import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import CreatePost from "./pages/CreatePost";
import ReadPost from "./pages/ReadPost";
import Posts from "./pages/Posts";
import EditPost from "./pages/EditPost";
import Account from "./pages/Account";

const PlaceholderPage = ({ title }) => (
  <div className="p-8">
    <h1 className="text-2xl font-bold">{title}</h1>
  </div>
);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("QuillSpace_token"),
  );

  // Initialize the authenticated user from local storage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("QuillSpace_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication routes */}
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />

        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} setUser={setUser} />}
        />

        {/* Protected application routes */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainLayout
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
                user={user}
                setUser={setUser}
              />
            ) : (
              <LandingPage />
            )
          }
        >
          {isLoggedIn && (
            <>
              <Route index element={<Home />} />
              <Route path="posts" element={<Posts />} />
              <Route path="create" element={<CreatePost />} />
              <Route path="post/:id" element={<ReadPost />} />
              <Route path="edit/:id" element={<EditPost />} />
              <Route
                path="account"
                element={<Account user={user} setUser={setUser} />}
              />
              <Route
                path="settings"
                element={<PlaceholderPage title="Settings" />}
              />
            </>
          )}
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
