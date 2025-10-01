import { useEffect, useState } from 'react';

// PUBLIC_INTERFACE
export function useLocalStorage(key, initialValue) {
  /** Persist a value in localStorage with state sync. */
  const [stored, setStored] = useState(() => {
    try {
      const raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(stored));
    } catch {
      // ignore
    }
  }, [key, stored]);

  return [stored, setStored];
}
