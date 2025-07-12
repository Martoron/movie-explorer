import React, { createContext, useContext, useEffect, useState } from "react";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";

// Create a context to provide authentication state and methods
const AuthContext = createContext();

// Custom hook to consume the auth context
export function useAuth() {
  return useContext(AuthContext);
}

// AuthProvider component wraps the app and provides auth state and functions
export function AuthProvider({ children }) {
  const auth = getAuth(); // Firebase Auth instance
  const [user, setUser] = useState(null); // Holds the authenticated user
  const [loading, setLoading] = useState(true); // Prevents UI from rendering until auth state is known

  // Sign up function using Firebase Auth
  function signup(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  // Login function using Firebase Auth
  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  // Logout function using Firebase Auth
  function logout() {
    return signOut(auth);
  }

  // Listen for changes in the authentication state (e.g., login/logout)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user); // Update user state
      setLoading(false); // Allow app to render once auth state is determined
    });

    // Cleanup the listener on unmount
    return unsubscribe;
  }, [auth]);

  // Values provided by the context to any component that calls useAuth()
  const value = {
    user,
    signup,
    login,
    logout
  };

  return (
    // Provide the auth context to all child components
    <AuthContext.Provider value={value}>
      {/* Only render children when auth state has finished loading */}
      {!loading && children}
    </AuthContext.Provider>
  );
}
