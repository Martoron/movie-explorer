import React, { useRef } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Import custom authentication context
import toast from "react-hot-toast";               // Notification library for toasts

// Component that protects routes from being accessed without authentication
function PrivateRoute({ children }) {
  const { user } = useAuth();                       // Get current user from AuthContext
  const hasShownToast = useRef(false);              // Ref to prevent multiple toasts on re-renders

  // If user is not authenticated
  if (!user) {
    // Show toast only once
    if (!hasShownToast.current) {
      toast.error("You must be logged in to access this page");
      hasShownToast.current = true;
    }

    // Redirect user to login page
    return <Navigate to="/login" />;
  }

  // If user is authenticated, render the protected content
  return children;
}

export default PrivateRoute;
