import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/justanotherblog2.png";
import { FaRegUserCircle } from "react-icons/fa";
const Navbar = () => {
  const { light, toggleTheme } = useGlobalContext();
  return (
    <div className={`w-full flex justify-between }`}>
      <div
        className={`flex items-center pr-3 rounded-md ${
          light ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"
        }`}
      >
        <img src={logo} alt="" width={50} height={50} />
        <h1 className="lg:text-xl text-sm font-bold">JustAnotherBlog</h1>
      </div>
      <div className="flex gap-3 items-center">
        {light ? (
          <MdOutlineLightMode onClick={toggleTheme} size={24} />
        ) : (
          <MdOutlineDarkMode onClick={toggleTheme} size={24} />
        )}
        <FaRegUserCircle size={24}/>
      </div>
    </div>
  );
};

export default Navbar;
