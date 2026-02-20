import { useState, useEffect } from 'react';

const useLocalStorage = (key: string) => {
  const [storedValue, setStoredValue] = useState(() => {
    const item =
      typeof window !== 'undefined' ? localStorage.getItem(key) : null;
    return item ? JSON.parse(item) : null;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const jsonValue = JSON.stringify(storedValue);
      localStorage.setItem(key, jsonValue);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
