import Navbar from "./NavBar";           // Import Navbar component for the site navigation
import { Outlet } from "react-router-dom"; // Outlet is used to render matched child routes

export default function Layout() {
  return (
    // Wrapper div providing full viewport height, background, text color, and padding
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      {/* Navbar displayed at the top of every page */}
      <Navbar />
      
      {/* Main content area where nested routes will be rendered */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}