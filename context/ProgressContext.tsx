import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type ProgressState = {
  completedIds: Set<string>;
  bookmarkedIds: Set<string>;
  toggleComplete: (id: string) => void;
  toggleBookmark: (id: string) => void;
};

const ProgressContext = createContext<ProgressState | null>(null);

const COMPLETED_KEY = 'progress_completed_v1';
const BOOKMARK_KEY = 'progress_bookmarked_v1';

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      try {
        const [c, b] = await Promise.all([
          AsyncStorage.getItem(COMPLETED_KEY),
          AsyncStorage.getItem(BOOKMARK_KEY),
        ]);
        if (c) setCompletedIds(new Set(JSON.parse(c)));
        if (b) setBookmarkedIds(new Set(JSON.parse(b)));
      } catch {}
    })();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(COMPLETED_KEY, JSON.stringify(Array.from(completedIds)));
  }, [completedIds]);
  useEffect(() => {
    AsyncStorage.setItem(BOOKMARK_KEY, JSON.stringify(Array.from(bookmarkedIds)));
  }, [bookmarkedIds]);

  const value = useMemo<ProgressState>(() => ({
    completedIds,
    bookmarkedIds,
    toggleComplete: (id: string) => setCompletedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    }),
    toggleBookmark: (id: string) => setBookmarkedIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    }),
  }), [completedIds, bookmarkedIds]);

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}


