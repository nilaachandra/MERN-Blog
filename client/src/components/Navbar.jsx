import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/justanotherblog2.png";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
const Navbar = () => {
  const { light, toggleTheme } = useGlobalContext();
  const [openNav, setOpenNav] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setOpenNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`w-full flex justify-between }`}
      
      ref={menuRef}
    >
      <Link
        to="/"
        className={`flex items-center pr-3 rounded-md ${
          light ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"
        }`}
      >
        <img src={logo} alt="" width={50} height={50} />
        <h1 className="text-2xl font-bold heading">
          27Blogs
        </h1>
      </Link>
      <div className="flex relative gap-3 items-center cursor-pointer">
        {light ? (
          <MdOutlineLightMode onClick={toggleTheme} size={24} />
        ) : (
          <MdOutlineDarkMode onClick={toggleTheme} size={24} />
        )}
        <FaRegUserCircle onClick={() => setOpenNav(!openNav)} size={24} />
        {openNav && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { type: "spring", ease: "linear", duration: 0.5 },
            }}
            className={`w-36 h-28 border absolute flex-col flex justify-between top-12 px-4 py-2 rounded-sm right-1 ${
              light ? "border-black bg-white" : "border-white bg-black"
            }`}
          >
            <Link to="/login" onClick={() => setOpenNav(!openNav)}  className="flex items-center justify-start cursor-pointer hover:underline gap-4">
              <BiLogIn size={24} /><span className="text-lg font-bold">Login</span>
            </Link>
            
            <Link to="/sign-up" onClick={() => setOpenNav(!openNav)} className="flex items-center  justify-start cursor-pointer hover:underline gap-4">
              <HiOutlineUserAdd size={24} /><span className="text-lg font-bold">Sign Up</span>
            </Link>

            <Link to="" onClick={() => setOpenNav(!openNav)} className="flex items-center  justify-start cursor-pointer hover:underline gap-4">
              <FaRegUser size={24} /><span className="text-lg font-bold">Profile</span>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} ;

export default Navbar;
