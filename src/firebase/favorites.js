import { db } from "../firebase";
import { doc, setDoc, deleteDoc, getDoc, getDocs, collection } from "firebase/firestore";

// 🔹 Fetch all favorite movies from the "favorites" collection in Firestore
export const getFavorites = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "favorites")); // Get all documents in 'favorites'
    const favorites = [];

    // Loop through each document and push the data into the favorites array
    querySnapshot.forEach((doc) => {
      favorites.push({
        id: doc.id,        // Use the document ID (usually the movie ID)
        ...doc.data(),     // Spread the remaining data (title, poster, etc.)
      });
    });

    return favorites; // Return the complete list of favorites
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return []; // Return an empty list if something goes wrong
  }
};

// 🔹 Add a movie to the favorites collection using its imdbID as the document ID
export async function addFavorite(movie) {
  const docRef = doc(db, "favorites", movie.imdbID); // Reference to the document
  await setDoc(docRef, movie); // Create or overwrite the document with movie data
}

// 🔹 Remove a movie from the favorites collection using its imdbID
export async function removeFavorite(id) {
  const docRef = doc(db, "favorites", id); // Reference to the document
  await deleteDoc(docRef); // Delete the document
}

// 🔹 Check if a movie is already marked as a favorite
export async function isFavorite(id) {
  const docRef = doc(db, "favorites", id); // Reference to the document
  const snapshot = await getDoc(docRef);   // Fetch the document
  return snapshot.exists();                // Return true if it exists
}
