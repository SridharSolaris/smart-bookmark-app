"use client";

import { useAuth } from "../providers";

/**
 * Authentication buttons component
 * Shows Sign In button or user info with Sign Out button
 */
export const AuthButtons = () => {
  const { user, signInWithGoogle, logout, loading } = useAuth();

  if (loading) {
    return <div className="text-gray-500 text-sm">Loading...</div>;
  }

  // User is logged in
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">
          {user.user_metadata?.name || user.email}
        </span>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // User is not logged in
  return (
    <button
      onClick={signInWithGoogle}
      className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors"
    >
      Sign In
    </button>
  );
};
