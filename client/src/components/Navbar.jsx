import React, { useEffect, useRef, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { useGlobalContext } from "../contexts/GlobalContext";
import logo from "../assets/justanotherblog2.png";
import { FaRegUserCircle } from "react-icons/fa";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaRegUser } from "react-icons/fa";
import { HiOutlineUserAdd } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import { FaRegPenToSquare } from "react-icons/fa6";
const Navbar = () => {
  const { light, toggleTheme } = useGlobalContext();
  const [openNav, setOpenNav] = useState(false);
  const menuRef = useRef(null);

  const { user } = useAuth();
  const navigate = useNavigate();

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
    <div className={`w-full flex justify-between  }`} ref={menuRef}>
      <Link
        to="/"
        className={`flex items-center pr-3 rounded-md ${
          light ? "bg-dark-bg text-dark-text" : "bg-light-bg text-light-text"
        }`}
      >
        <img src={logo} alt="" width={50} height={50} />
        <h1 className="text-2xl font-bold heading">27Blogs</h1>
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
            className={`w-36 h-24 border absolute z-40 flex-col flex top-12 p-4 rounded-sm right-1 ${
              light ? "border-black bg-white" : "border-white bg-black"
            }`}
          >
            {user ? (
              <div>
                <Link
                to="/profile"
                onClick={() => setOpenNav(!openNav)}
                className="flex items-center  justify-start cursor-pointer hover:underline mb-2 gap-4"
              >
                <FaRegUser size={24} />
                <span className="text-lg font-bold">Profile</span>
              </Link>
              <Link
                to="/create"
                onClick={() => setOpenNav(!openNav)}
                className="flex items-center justify-start cursor-pointer hover:underline mt-2 gap-4"
              >
                <FaRegPenToSquare  size={24} />
                <span className="text-lg font-bold">Write</span>
              </Link>
              </div>
            ) : (
              <div>
                <Link
                  to="/login"
                  onClick={() => setOpenNav(!openNav)}
                  className="flex items-center justify-start cursor-pointer hover:underline mb-2 gap-4"
                >
                  <BiLogIn size={24} />
                  <span className="text-lg font-bold">Login</span>
                </Link>

                <Link
                  to="/sign-up"
                  onClick={() => setOpenNav(!openNav)}
                  className="flex items-center  justify-start cursor-pointer hover:underline mt-2 gap-4"
                >
                  <HiOutlineUserAdd size={24} />
                  <span className="text-lg font-bold">Sign Up</span>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
