"use client";

import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "./providers";

/**
 * Custom hook for managing bookmarks
 * Provides CRUD operations and real-time sync
 */
export const useBookmarks = () => {
  const { user } = useAuth();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all bookmarks for current user
   */
  const fetchBookmarks = useCallback(async () => {
    if (!user || !supabase) {
      setBookmarks([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: fetchError } = await supabase
        .from("bookmarks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;
      setBookmarks(data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching bookmarks:", err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  /**
   * Add a new bookmark
   */
  const addBookmark = useCallback(
    async (url, title) => {
      if (!user || !supabase) {
        throw new Error("User not authenticated");
      }

      try {
        const { data, error: addError } = await supabase
          .from("bookmarks")
          .insert([{ user_id: user.id, url, title }])
          .select();

        if (addError) throw addError;

        // Optimistically update UI immediately
        if (data?.[0]) {
          setBookmarks((prev) => [data[0], ...prev]);
        }

        return data?.[0];
      } catch (err) {
        setError(err.message);
        console.error("Error adding bookmark:", err);
        throw err;
      }
    },
    [user],
  );

  /**
   * Delete a bookmark by ID
   */
  const deleteBookmark = useCallback(
    async (id) => {
      if (!supabase) {
        throw new Error("Supabase not configured");
      }

      try {
        // Optimistically remove from UI immediately
        setBookmarks((prev) => prev.filter((b) => b.id !== id));

        const { error: deleteError } = await supabase
          .from("bookmarks")
          .delete()
          .eq("id", id);

        if (deleteError) throw deleteError;
      } catch (err) {
        setError(err.message);
        console.error("Error deleting bookmark:", err);
        // Refetch on error to restore correct state
        fetchBookmarks();
        throw err;
      }
    },
    [fetchBookmarks],
  );

  /**
   * Set up real-time subscription for bookmark changes
   */
  useEffect(() => {
    if (!user || !supabase) return;

    // Fetch bookmarks on mount
    fetchBookmarks();

    // Subscribe to real-time changes for syncing across tabs/devices
    const channel = supabase
      .channel(`bookmarks:${user.id}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${user.id}`,
        },
        (payload) => {
          // Handle INSERT event (from other tabs/devices)
          if (payload.eventType === "INSERT") {
            setBookmarks((prev) => {
              // Avoid duplicates - check if already exists
              if (prev.some((b) => b.id === payload.new.id)) return prev;
              return [payload.new, ...prev];
            });
          }
          // Handle DELETE event (from other tabs/devices)
          else if (payload.eventType === "DELETE") {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id));
          }
          // Handle UPDATE event
          else if (payload.eventType === "UPDATE") {
            setBookmarks((prev) =>
              prev.map((b) => (b.id === payload.new.id ? payload.new : b)),
            );
          }
        },
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      channel.unsubscribe();
    };
  }, [user, fetchBookmarks]);

  return {
    bookmarks,
    loading,
    error,
    addBookmark,
    deleteBookmark,
    fetchBookmarks,
  };
};
