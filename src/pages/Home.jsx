// src/pages/Home.jsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

function Home() {
  // State for the input field
  const [searchTerm, setSearchTerm] = useState("");

  // State to track loading and fetched results
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Flag to detect manual submit (Enter key)
  const [manualSubmit, setManualSubmit] = useState(false);

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  /**
   * Fetch movies from OMDb API
   */
  const fetchMovies = async (term) => {
    if (!term.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`);
      const result = await res.json();
      setData(result.Search || []);
    } catch (err) {
      toast.error("Something went wrong");
      console.error("Failed to fetch movies:", err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Debounced effect for search input
   * Skips debounce if triggered by Enter key
   */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setData(null);
      return;
    }

    // Skip debounce if we just pressed Enter
    if (manualSubmit) return;

    // Debounce search by 1000ms
    const delay = setTimeout(() => {
      fetchMovies(searchTerm);
    }, 1000);

    return () => clearTimeout(delay);
  }, [searchTerm, manualSubmit]);

  /**
   * Trigger immediate fetch if Enter was pressed
   */
  useEffect(() => {
    if (manualSubmit) {
      fetchMovies(searchTerm);
      setManualSubmit(false); // Reset so debounce resumes
    }
  }, [manualSubmit]);

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">

      {/* Search input */}
      <div className="flex justify-center mb-8">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              setManualSubmit(true);
            }
          }}
          className="px-4 py-2 w-full max-w-md rounded-lg text-white bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Loading indicator */}
      {loading && (
        <div className="text-center text-gray-400 mb-4">Loading...</div>
      )}

      {/* Movie results */}
      {data && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {data.map((movie) => (
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID}>
              <div className="bg-gray-900 rounded-lg shadow-md p-2 hover:shadow-lg transition">
                <img
                  src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
                  alt={movie.Title}
                  className="w-full h-64 object-cover rounded"
                />
                <h2 className="mt-2 text-lg font-semibold">{movie.Title}</h2>
                <p className="text-gray-400">{movie.Year}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
