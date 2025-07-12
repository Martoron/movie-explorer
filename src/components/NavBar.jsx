import { Link, useNavigate } from "react-router-dom"; // For navigation and links
import { useAuth } from "../contexts/AuthContext";   // Custom hook for authentication context
import UserAvatar from "./UserAvatar";                 // Component to display user avatar

export default function Navbar() {
  const { user, logout } = useAuth();                  // Destructure current user and logout method from context
  console.log("User in Navbar:", user);                // Debug: log current user to console
  const navigate = useNavigate();                       // React Router hook to programmatically navigate

  // Handles logout process, then redirects to login page
  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);          // Log any logout errors
    }
  };

  return (
    // Navbar container with background, padding, flex layout, rounded corners and bottom margin
    <nav className="bg-gray-900 p-4 flex justify-between items-center rounded-lg mb-6">
      
      {/* Site title/logo linking to homepage */}
      <div className="text-2xl font-bold text-indigo-400">
        <Link to="/">🎬 Movie Explorer</Link>
      </div>

      {/* Navigation links and user controls container */}
      <div className="flex items-center gap-4">
        
        {/* Link to home page */}
        <Link to="/">Home</Link>
        
        {/* Link to favorites page */}
        <Link to="/favorites">Favorites</Link>

        {/* Conditionally render user avatar and logout button if logged in */}
        {user ? (
          <>
            <div className="flex items-center gap-2">
              {/* User avatar component */}
              <UserAvatar user={user} />

              {/* Logout button with styles and cursor pointer */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded font-medium text-sm cursor-pointer text-white"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          // Show login link if no user is logged in
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded font-medium text-sm"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
