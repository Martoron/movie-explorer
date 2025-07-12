import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, removeFavorite } from "../firebase/favorites";
import toast from "react-hot-toast";

function Favorites() {
  // State to store the list of favorite movies
  const [favorites, setFavorites] = useState([]);

  // Fetch favorites from Firestore on component mount
  useEffect(() => {
    const fetchFavorites = async () => {
      const data = await getFavorites();
      setFavorites(data);
    };
    fetchFavorites();
  }, []);

  // Remove a movie from favorites and update UI
  const handleRemove = async (movieId) => {
    await removeFavorite(movieId);
    toast("Removed from favorites", { icon: "❌" });
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-8">
      {/* Favorites List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {favorites.length === 0 ? (
          <p>No favorite movies yet.</p>
        ) : (
          favorites.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg p-4 shadow-lg flex flex-col items-center"
            >
              {/* Link to detailed movie view */}
              <Link to={`/movie/${movie.id}`} className="w-full">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="h-80 object-cover rounded-lg mb-4 mx-auto"
                  style={{ maxWidth: "200px" }} // Prevents oversized images
                />
                <h2 className="text-lg font-bold text-center">
                  {movie.title}
                </h2>
              </Link>

              {/* Button to remove from favorites */}
              <button
                className="mt-4 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold cursor-pointer"
                onClick={() => handleRemove(movie.id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Favorites;
