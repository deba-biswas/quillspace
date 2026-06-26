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

  // Retrieve the success message after a successful signup
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
        // Persist the authenticated user session
        localStorage.setItem("QuillSpace_token", data.token);
        localStorage.setItem("QuillSpace_user", JSON.stringify(data.user));

        // Update the application state
        setIsLoggedIn(true);
        setUser(data.user);

        // Redirect to the home page
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
    <div className="min-h-screen bg-ink-sidebar flex flex-col items-center justify-center p-4 font-sans text-ink-text relative">
      {/* Back navigation */}
      <Link
        to="/"
        className="absolute top-6 left-6 md:top-10 md:left-10 flex items-center gap-2 text-ink-text hover:text-ink-btn font-semibold transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="hidden sm:inline">Back to Home</span>
      </Link>

      <div className="bg-ink-bg w-full max-w-sm rounded-2xl p-8 shadow-sm border border-teal-100 mt-8">
        {/* Application logo */}
        <div className="flex items-center justify-center gap-2 mb-8 font-serif text-3xl font-bold">
          <Feather className="w-8 h-8" />
          <span>QuillSpace</span>
        </div>

        {/* Signup success message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium flex items-start gap-2">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Login error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email or address"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Password</label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <div className="flex justify-end mt-2">
              <a
                href="#"
                className="text-xs text-gray-500 hover:text-ink-btn font-medium"
              >
                Forgot Password?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ink-btn text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-opacity-90 transition-opacity shadow-sm disabled:opacity-50"
            >
              {isLoading ? "LOGGING IN..." : "LOG IN"}
            </button>
          </div>

          <div className="flex items-center gap-2 w-full my-4">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400 font-medium">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-4 h-4"
              />
              Google
            </button>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-lg py-2.5 text-sm font-semibold hover:bg-gray-50 transition-colors"
            >
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="GitHub"
                className="w-4 h-4"
              />
              GitHub
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-ink-btn font-bold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
