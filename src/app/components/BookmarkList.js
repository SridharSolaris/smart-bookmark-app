"use client";

import { useState } from "react";

/**
 * Component to display list of bookmarks
 * Handles deletion with confirmation
 */
export const BookmarkList = ({ bookmarks, onDeleteBookmark, loading }) => {
  const [deletingId, setDeletingId] = useState(null);

  // Handle bookmark deletion
  const handleDelete = async (id) => {
    if (confirm("Delete this bookmark?")) {
      setDeletingId(id);
      try {
        await onDeleteBookmark(id);
      } catch (error) {
        console.error("Failed to delete bookmark:", error);
      } finally {
        setDeletingId(null);
      }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-gray-600 text-sm mt-3">Loading bookmarks...</p>
      </div>
    );
  }

  // Empty state
  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
        <p className="text-gray-700 font-semibold">No bookmarks saved</p>
        <p className="text-gray-500 text-sm mt-1">
          Create your first bookmark above
        </p>
      </div>
    );
  }

  // Bookmark list
  return (
    <div className="space-y-4">
      {/* Header with count */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Your Bookmarks</h2>
        <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
          {bookmarks.length}
        </span>
      </div>

      {/* Bookmark cards */}
      <div className="space-y-3">
        {bookmarks.map((bookmark) => (
          <div
            key={bookmark.id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start gap-4">
              {/* Bookmark info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">
                  {bookmark.title}
                </h3>
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 hover:underline text-sm truncate block mt-1"
                  title={bookmark.url}
                >
                  {bookmark.url}
                </a>
                <p className="text-gray-500 text-xs mt-2">
                  {new Date(bookmark.created_at).toLocaleString()}
                </p>
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDelete(bookmark.id)}
                disabled={deletingId === bookmark.id}
                className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-sm font-medium rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {deletingId === bookmark.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
