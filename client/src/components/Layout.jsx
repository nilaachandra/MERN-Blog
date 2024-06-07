import React from "react";
import Navbar from "./Navbar";
import { useGlobalContext } from "../contexts/GlobalContext";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  const { light, toggleTheme } = useGlobalContext();
  return (
    <div
      className={`w-full py-4 lg:px-32 md:px-32 px-4 transition-all duration-200 ${
        light ? "bg-light-bg text-light-text" : "bg-dark-bg text-dark-text"
      }`}
    >
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
