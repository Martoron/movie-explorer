import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { addFavorite, removeFavorite, isFavorite } from "../firebase/favorites";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function MovieDetail() {
  const { id } = useParams(); // Extract movie ID from URL
  const { user } = useAuth(); // Get current user from AuthContext
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null); // Store fetched movie data
  const [loading, setLoading] = useState(true); // Track loading state
  const [favorite, setFavorite] = useState(false); // Track if movie is a favorite

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY; // Get API key from environment variables

  // Fetch movie data from OMDb API when the component mounts or ID changes
  useEffect(() => {
    async function fetchMovie() {
      setLoading(true);
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`);
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        toast.error("Something went wrong");
        console.error("Failed to fetch movie details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [id]);

  // Check if the movie is already marked as favorite (after movie data loads)
  useEffect(() => {
    const checkFavorite = async () => {
      const result = await isFavorite(movie.imdbID);
      setFavorite(result);
    };

    if (movie?.imdbID) {
      checkFavorite();
    }
  }, [movie]);

  // Show loading indicator while fetching data
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 text-white px-4 py-8 flex items-center justify-center">
        <p>Loading movie details...</p>
      </div>
    );
  }

  // Show fallback if movie is not found
  if (!movie || movie.Response === "False") {
    return (
      <div className="min-h-screen bg-gray-950 text-white px-4 py-8 flex items-center justify-center">
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">

      {/* Main movie layout section */}
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Left: Poster and basic info */}
        <div className="md:w-1/3">
          <img
            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
            alt={movie.Title}
            className="rounded-lg shadow-md w-full"
          />
          <div className="mt-4 space-y-2">
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Released:</strong> {movie.Released}</p>
            <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>

        {/* Right: Plot and favorite button */}
        <div className="md:w-2/3">
          <h2 className="text-xl font-semibold mb-2">Plot Summary</h2>
          <p className="text-gray-300">{movie.Plot}</p>

          {/* Add/Remove Favorite Button */}
          <button
            className={`px-4 py-2 rounded-lg font-semibold mt-6 transition-colors duration-300 cursor-pointer ${
              favorite
                ? "bg-red-600 hover:bg-red-800"
                : "bg-green-600 hover:bg-green-800"
            }`}
            onClick={async () => {
              // Require login to use favorites
              if (!user) {
                toast.error("You must be logged in to add favorites");
                navigate("/login");
                return;
              }

              // Toggle favorite status
              if (favorite) {
                await removeFavorite(movie.imdbID);
                toast("Removed from favorites", { icon: "❌" });
                setFavorite(false);
              } else {
                await addFavorite({
                  imdbID: movie.imdbID,
                  title: movie.Title,
                  poster: movie.Poster,
                  year: movie.Year,
                });
                toast.success("Added to favorites!");
                setFavorite(true);
              }
            }}
          >
            {favorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
