import React from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/justanotherblog2.png";
import { FaRegUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { light, toggleTheme } = useGlobalContext();
  return (
    <div className={`w-full flex justify-between }`}>
      <Link to='/'
        className={`flex items-center pr-3 rounded-md ${
          light ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"
        }`}
      >
        <img src={logo} alt="" width={50} height={50} />
        <h1 className="lg:text-xl text-sm font-bold heading">JustAnotherBlog</h1>
      </Link>
      <div className="flex gap-3 items-center cursor-pointer">
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
