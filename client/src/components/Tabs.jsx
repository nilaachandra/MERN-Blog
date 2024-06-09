import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGlobalContext } from "../contexts/GlobalContext";
import Recents from "./Recents";
import Sports from "./Sports";
import Tech from "./Tech";
import General from "./General";

const Tabs = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("recent");
const {light} = useGlobalContext()
  useEffect(() => {
    const hash = location.hash.substring(1); // Remove the '#' from the hash
    if (["recent", "sports", "tech", "general"].includes(hash)) {
      setActiveTab(hash);
    }
  }, [location.hash]);

  const handleTabClick = (tab) => {
    setActiveTab(tab.toLowerCase());
    window.location.hash = tab.toLowerCase();
  };

  return (
    <>
      <div className="w-full body-bold mt-4">
        <ul className="flex justify-between items-center ">
          {["Recent", "Sports", "Tech", "General"].map((item, index) => (
            <li
              key={index}
              className={`lg:text-xl p-1 text-lg font-bold cursor-pointer ${
                activeTab === item.toLowerCase()
                  ? `border-b-2 rounded-[3px]` 
                  : ""
              } ${light ? 'border-dark-bg' : 'border-light-bg'} `}
              onClick={() => handleTabClick(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full">
        {activeTab === 'recent' && <Recents/>}
        {activeTab === 'sports' && <Sports/>}
        {activeTab === 'tech' && <Tech/>}
        {activeTab === 'general' && <General/>}
      </div>
    </>
  );
};

export default Tabs;
