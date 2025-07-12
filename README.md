# React Movie Favorites App

A sleek React app for browsing movie details and managing your favorite movies list, with Firebase authentication and real-time favorites storage.

---

## Features

- **User Authentication**  
  Sign up, log in, and manage sessions using Firebase Authentication.

- **Browse Movies**  
  Fetch detailed movie information from the OMDb API.

- **Favorites Management**  
  Add and remove movies from your personal favorites list stored in Firebase Firestore.

- **Responsive Design**  
  Fully responsive UI styled with Tailwind CSS for mobile and desktop.

- **Notifications**  
  Instant feedback with toast notifications using `react-hot-toast`.

---

## Technologies Used

- React (with hooks)  
- React Router DOM (client-side routing)  
- Firebase Authentication & Firestore (backend for auth and favorites)  
- OMDb API (movie data)  
- Tailwind CSS (styling)  
- react-hot-toast (notifications)  

---

## Setup & Installation

1. Clone the repo:

git clone https://github.com/your-username/your-repo.git
cd your-repo

2. Install dependencies:

npm install

3. Set up Firebase:

- Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
- Enable **Email/Password Authentication** under Authentication
- Create a Firestore database
- Add a web app to your Firebase project and copy the config keys

4. Configure environment variables:

Create a `.env` file in your project root with:
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_OMDB_API_KEY=your_omdb_api_key
```
5. Start the app:

npm run dev

Open your browser at [http://localhost:5173](http://localhost:5173)

---

## Project Structure
```
/src
  /components
  - Layout.jsx # Main layout wrapper for pages
  - NavBar.jsx # Navigation bar component
  - PrivateRoute.jsx # Route wrapper that protects private routes
  - UserAvatar.jsx # User avatar component
  /pages
  - Favorites.jsx # Favorites list and removal
  - Login.jsx # User login form
  - Signup.jsx # User registration form
  - MovieDetail.jsx # Movie detail page with favorite toggle
  /contexts
  - AuthContext.jsx # Firebase auth context provider
  /firebase
  - favorites.js # Functions to add/remove/check favorites in Firestore
App.jsx # Main app component with routes
main.jsx # App entry point, rendering with ReactDOM
```
---

## Usage

- Sign up or log in to start managing your favorites.
- Browse movies by their IDs or search externally.
- Add movies to favorites and view them on your Favorites page.
- Remove favorites anytime with instant UI feedback.

---

## License

MIT License © 2025 Martin

---

## Acknowledgments

- [OMDb API](http://www.omdbapi.com/) for movie data  
- [Firebase](https://firebase.google.com/) for authentication and database  
- React and community libraries powering this app
