import { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [light, setLight] = useState(true);

  useEffect(() => {
    // Check if system prefers dark mode
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem("theme");

    // Set initial theme based on system preference or saved theme
    setLight(savedTheme === "dark" ? false : savedTheme === "light" ? true : prefersDarkMode);
  }, []);

  const toggleTheme = () => {
    setLight((prevLight) => {
      const newTheme = !prevLight;
      // Save theme to local storage
      localStorage.setItem("theme", newTheme ? "light" : "dark");
      return newTheme;
    });
  };

  return (
    <GlobalContext.Provider value={{ light, toggleTheme }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
