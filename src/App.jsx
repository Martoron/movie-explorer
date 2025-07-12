import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import MovieDetails from "./pages/MovieDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

/**
 * Main App component handling client-side routing
 * Defines routes and renders corresponding page components
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* Route for Home page, showing movie search and listings */}
        <Route path="/" element={<Home />} />

        {/* Route for Favorites page to display saved favorite movies */}
        <Route path="/favorites" element={<PrivateRoute><Favorites /></PrivateRoute>} />

        {/* Dynamic route for Movie Detail page with movie ID param */}
        <Route path="/movie/:id" element={<MovieDetails />} />

        {/* Route for Login page to handle user authentication */}
        <Route path="/login" element={<Login />} />

        {/* Route for Signup page to handle user registration */}
        <Route path="/signup" element={<Signup />} />

        {/* Fallback route for any unmatched paths, redirecting to Home */}
        <Route path="*" element={<Home />} />

        {/* Add more pages here */}
      </Route>

    </Routes>
  );
}

export default App;