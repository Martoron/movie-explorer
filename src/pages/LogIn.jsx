import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext"; // Custom auth context hook
import { useNavigate, Link } from "react-router-dom"; // Routing utilities

function Login() {
  // Local state for form inputs and error message
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Login function from context
  const navigate = useNavigate(); // Used for redirection
  const [error, setError] = useState("");
   // Toggle for showing password
  const [showPassword, setShowPassword] = useState(false);

  // Handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); // Reset error before new attempt
    try {
      await login(email, password); // Attempt login
      navigate("/"); // Redirect to home page on success
    } catch {
      setError("Failed to log in"); // Show error on failure
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      {/* Login form container */}
      <form 
        onSubmit={handleSubmit} 
        className="bg-gray-800 p-8 rounded-lg w-full max-w-md"
      >
        <h2 className="text-2xl mb-6 font-bold">Log In</h2>

        {/* Show error if login fails */}
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
          className="bg-gray-400 w-full mb-6 p-2 rounded text-black"
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded font-semibold"
        >
          Log In
        </button>

        {/* Link to sign up page */}
        <p className="mt-4 text-center">
          Need an account?{" "}
          <Link to="/signup" className="text-indigo-400 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Link to go back to homepage */}
        <p className="mt-4 text-center">
          <Link to="/" className="text-indigo-400 hover:underline">
            Home
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
