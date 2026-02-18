"use client";

import { useAuth } from "./providers";
import { useBookmarks } from "./useBookmarks";
import { AuthButtons } from "./components/AuthButtons";
import { BookmarkForm } from "./components/BookmarkForm";
import { BookmarkList } from "./components/BookmarkList";

/**
 * Main page component
 * Shows landing page for logged out users, bookmark manager for logged in users
 */
export default function Home() {
  const { user, loading: authLoading } = useAuth();
  const {
    bookmarks,
    loading: bookmarksLoading,
    addBookmark,
    deleteBookmark,
  } = useBookmarks();

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with app title and auth buttons */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900">Bookmarks</h1>
          <AuthButtons />
        </div>
      </header>

      {/* Main content area */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {authLoading ? (
          // Loading state
          <div className="text-center py-16">
            <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
            <p className="text-gray-600 mt-3">Loading...</p>
          </div>
        ) : !user ? (
          // Landing page for logged out users
          <div className="flex justify-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-10 max-w-md w-full text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome</h2>
              <p className="text-gray-600 mb-8">
                Save and organize your favorite links. Your bookmarks sync
                automatically across all devices.
              </p>
              <AuthButtons />
            </div>
          </div>
        ) : (
          // Bookmark manager for logged in users
          <div className="space-y-6">
            <BookmarkForm
              onAddBookmark={addBookmark}
              loading={bookmarksLoading}
            />
            <BookmarkList
              bookmarks={bookmarks}
              onDeleteBookmark={deleteBookmark}
              loading={bookmarksLoading}
            />
          </div>
        )}
      </div>
    </main>
  );
}
