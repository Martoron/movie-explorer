import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Toggle for showing password
  const [showPassword, setShowPassword] = useState(false);

  // Auth and navigation
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Error and loading state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true); // Show loading state
    try {
      await signup(email, password); // Call Firebase signup
      navigate("/"); // Redirect to home on success
    } catch (error) {
      // Convert Firebase errors to user-friendly messages
      let message = "Failed to create an account";
      if (error.code === "auth/weak-password") {
        message = "Password should be at least 6 characters.";
      } else if (error.code === "auth/email-already-in-use") {
        message = "This email is already registered.";
      } else if (error.code === "auth/invalid-email") {
        message = "Please enter a valid email address.";
      }
      setError(message); // Show error message
    } finally {
      setLoading(false); // Reset loading state
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg w-full max-w-md shadow-md">
        {/* Title */}
        <h2 className="text-2xl mb-6 font-bold">Sign Up</h2>

        {/* Error message */}
        {error && <div className="mb-4 text-red-500">{error}</div>}

        {/* Email input */}
        <input
          type="email"
          placeholder="Email"
          className="bg-gray-400 w-full mb-4 p-2 rounded text-black"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        {/* Password input */}
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className="bg-gray-400 w-full mb-2 p-2 rounded text-black"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        {/* Toggle password visibility */}
        <button
          type="button"
          className="text-sm text-indigo-400 hover:underline mb-4"
          onClick={() => setShowPassword(prev => !prev)}
        >
          {showPassword ? "Hide Password" : "Show Password"}
        </button>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        {/* Navigation links */}
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log In
          </Link>
        </p>
        <p className="mt-4 text-center">
          <Link to="/" className="text-indigo-400 hover:underline">
            Home
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
