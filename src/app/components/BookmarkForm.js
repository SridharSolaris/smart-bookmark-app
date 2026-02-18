"use client";

import { useState } from "react";

/**
 * Form component for adding new bookmarks
 * Handles validation and submission
 */
export const BookmarkForm = ({ onAddBookmark, loading }) => {
  // Form state
  const [url, setUrl] = useState("");
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate required fields
    if (!url || !title) {
      setError("Title and URL are required");
      return;
    }

    // Validate URL format
    try {
      new URL(url);
    } catch {
      setError("Please enter a valid URL");
      return;
    }

    // Submit bookmark
    setIsSubmitting(true);
    try {
      await onAddBookmark(url, title);
      // Clear form on success
      setUrl("");
      setTitle("");
    } catch (err) {
      setError(err.message || "Failed to add bookmark");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-md">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Add New Bookmark
      </h2>

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Title input */}
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter bookmark title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* URL input */}
      <div className="mb-6">
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          URL
        </label>
        <input
          id="url"
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-gray-900 placeholder:text-gray-400"
        />
      </div>

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting || loading}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Adding..." : "Add Bookmark"}
      </button>
    </form>
  );
};
