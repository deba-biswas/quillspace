import { useState } from "react";
import { Feather, Eye, EyeOff, ArrowLeft, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Register a new user account
  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login", {
          state: {
            successMessage: "Account created successfully! Please log in.",
          },
        });
      } else {
        setError(data.message || "Failed to create account.");
      }
    } catch {
      setError("Cannot connect to the server.");
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

      {/* Card */}
      <div className="w-full max-w-sm bg-ink-bg dark:bg-ink-dark-card rounded-2xl p-8 shadow-xl dark:shadow-black/30 border border-teal-100 dark:border-ink-dark-border transition-colors duration-300">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8 font-serif text-3xl font-bold">
          <Feather className="w-8 h-8 text-ink-btn" />
          <span>QuillSpace</span>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-3 rounded-lg border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-start gap-2 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-5">
          <h2 className="text-lg font-semibold">Create your account</h2>

          {/* Name */}
          <input
            type="text"
            required
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-ink-dark-border bg-white dark:bg-ink-dark-sidebar text-ink-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ink-btn transition-colors"
          />

          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-ink-dark-border bg-white dark:bg-ink-dark-sidebar text-ink-text dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-ink-btn transition-colors"
          />

          {/* Password */}
          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
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

            <p
              className={`mt-2 text-xs ${
                password.length > 0 && password.length < 8
                  ? "text-red-500"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              Must be at least 8 characters.
            </p>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg bg-ink-btn text-white font-semibold hover:opacity-90 transition-all duration-300 shadow-sm dark:shadow-black/30 disabled:opacity-50"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-ink-dark-border text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-ink-btn hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
