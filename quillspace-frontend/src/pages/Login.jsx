import { useState } from "react";
import {
  Feather,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function Login({ setIsLoggedIn, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const successMessage = location.state?.successMessage;

  // Authenticate the user and initialize the session
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("QuillSpace_token", data.token);
        localStorage.setItem("QuillSpace_user", JSON.stringify(data.user));

        setIsLoggedIn(true);
        setUser(data.user);

        navigate("/");
      } else {
        setError(data.message || "Failed to log in.");
      }
    } catch (err) {
      setError(
        "Cannot connect to the server. Make sure your Node.js backend is running!",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ink-sidebar dark:bg-ink-dark-bg flex flex-col items-center justify-center p-4 font-sans text-ink-text dark:text-white transition-colors duration-300 relative">
      {/* Back */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-ink-text dark:text-white hover:text-ink-btn transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      {/* Login Card */}
      <div className="w-full max-w-sm bg-ink-bg dark:bg-ink-dark-card rounded-2xl p-8 shadow-xl dark:shadow-black/30 border border-teal-100 dark:border-ink-dark-border transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8 font-serif text-3xl font-bold">
          <Feather className="w-8 h-8 text-ink-btn" />
          <span>QuillSpace</span>
        </div>

        {/* Success */}
        {successMessage && (
          <div className="mb-5 p-3 rounded-lg border border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 flex items-start gap-2 text-sm">
            <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-start gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-semibold mb-2">Email</label>

            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-ink-dark-border bg-white dark:bg-ink-dark-sidebar text-ink-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ink-btn transition-colors"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-semibold mb-2">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-ink-dark-border bg-white dark:bg-ink-dark-sidebar text-ink-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ink-btn transition-colors"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="flex justify-end mt-2">
              <button
                type="button"
                className="text-xs text-gray-500 dark:text-gray-400 hover:text-ink-btn transition-colors"
              >
                Forgot Password?
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-ink-btn text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-sm dark:shadow-black/30 disabled:opacity-50"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 py-2">
            <div className="flex-1 h-px bg-gray-200 dark:bg-ink-dark-border" />

            <span className="text-xs text-gray-400 dark:text-gray-500">
              or continue with
            </span>

            <div className="flex-1 h-px bg-gray-200 dark:bg-ink-dark-border" />
          </div>

          {/* Google */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 dark:border-ink-dark-border bg-white dark:bg-ink-dark-sidebar hover:bg-gray-50 dark:hover:bg-[#313943] transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />

            <span className="font-medium">Continue with Google</span>
          </button>

          {/* GitHub */}
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 py-3 rounded-lg border border-gray-300 dark:border-ink-dark-border bg-white dark:bg-ink-dark-sidebar hover:bg-gray-50 dark:hover:bg-[#313943] transition-colors"
          >
            <img
              src="https://www.svgrepo.com/show/512317/github-142.svg"
              alt="GitHub"
              className="w-5 h-5"
            />

            <span className="font-medium">Continue with GitHub</span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-ink-dark-border text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-ink-btn hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
