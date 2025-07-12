// ✅ React's StrictMode helps highlight potential problems during development
import { StrictMode } from 'react';

// ✅ React 18+ rendering API
import { createRoot } from 'react-dom/client';

// ✅ BrowserRouter provides client-side routing via React Router
import { BrowserRouter } from 'react-router-dom';

// ✅ Toast notifications
import { Toaster } from "react-hot-toast";

// ✅ AuthProvider manages global authentication state
import { AuthProvider } from './contexts/AuthContext';

// ✅ Global styles
import './index.css';

// ✅ Main application component
import App from './App.jsx';

// ✅ Attach React app to the root DOM element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* 🔒 Wrap the app with AuthProvider to share auth state across components */}
      <AuthProvider>
        <App />
        {/* 🔔 Toast notification container (top-right of the screen) */}
        <Toaster position="top-right" reverseOrder={false} />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
