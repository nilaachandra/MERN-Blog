import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

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

  //get blogs from backend through react query
const {data: blogs, isLoading, onSuccess, refetch } = useQuery({
  queryKey : ['data'],
  queryFn: async () => {
    try {
      const response = await axios.get('http://localhost:8080/all-blogs');
      return response.data;
    } catch (error) {
      throw new Error(error.message)
    }
  }
})

  return (
    <GlobalContext.Provider value={{ light, toggleTheme, blogs, isLoading, onSuccess, refetch }}>
      {children}
    </GlobalContext.Provider>
  );
};



export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
