const isBrowser = typeof window !== "undefined";

const getFromLocalStorage = (key: string) => {
  if (!isBrowser) return null;
  const value = localStorage.getItem(key);
  if (value) {
    try {
      return JSON.parse(value);
    } catch (err) {
      return null;
    }
  }
  return null;
};

const setToLocalStorage = (key: string, value: string) => {
  if (!isBrowser) return;
  localStorage.setItem(key, value);
};

const removeFromLocalStorage = (key: string) => {
  if (!isBrowser) return;
  localStorage.removeItem(key);
};

const clearLocalStorage = () => {
  if (!isBrowser) return;
  localStorage.clear();
};

export {
  getFromLocalStorage,
  setToLocalStorage,
  removeFromLocalStorage,
  clearLocalStorage,
};
