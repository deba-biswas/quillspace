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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Redirect to the login page with a success message
        navigate("/login", {
          state: {
            successMessage: "Account created successfully! Please log in.",
          },
        });
      } else {
        setError(data.message || "Failed to create account.");
      }
    } catch (err) {
      setError("Cannot connect to the server.");
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
        <div className="flex items-center justify-center gap-2 mb-6 font-serif text-3xl font-bold">
          <Feather className="w-8 h-8" />
          <span>QuillSpace</span>
        </div>

        {/* Signup error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium flex items-start gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Signup form */}
        <form onSubmit={handleSignup} className="space-y-4">
          <h2 className="text-sm font-semibold">Create an account</h2>

          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white"
            />
          </div>

          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email or address"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                placeholder="Password"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ink-sidebar bg-white"
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

            <p
              className={`text-xs mt-2 font-medium ${
                password.length > 0 && password.length < 8
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Must be at least 8 characters.
            </p>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-ink-btn text-white rounded-lg py-2.5 text-sm font-semibold hover:bg-opacity-90 transition-opacity disabled:opacity-50"
            >
              {isLoading ? "SIGNING UP..." : "SIGN UP"}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-200/60 text-center">
          <p className="text-sm text-gray-600 font-medium">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-ink-btn font-bold hover:underline"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
