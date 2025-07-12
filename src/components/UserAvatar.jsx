import React from "react";

/**
 * Converts a string (e.g., an email) to a consistent hex color.
 * Useful for generating a unique background color for avatar placeholders.
 */
function stringToColor(str) {
  let hash = 0;

  // Create a numeric hash from the string
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Convert hash to hex color
  let color = "#";
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += ("00" + value.toString(16)).slice(-2);
  }

  return color;
}

/**
 * Component to render a user avatar.
 * - Uses `photoURL` if available.
 * - Falls back to a generated avatar using `ui-avatars.com` and email hash.
 */
export default function UserAvatar({ user }) {
  if (!user) return null;

  // If the user has a custom photo URL, use it directly
  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt="Profile"
        className="w-8 h-8 rounded-full border border-gray-400"
      />
    );
  }

  // Generate background color from email for fallback avatar
  const bgColor = stringToColor(user.email);

  // Construct avatar image URL with dynamic background color
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    user.email
  )}&background=${bgColor.slice(1)}&color=fff`;

  return (
    <img
      src={avatarUrl}
      alt="Profile"
      className="w-8 h-8 rounded-full border border-gray-400"
    />
  );
}
