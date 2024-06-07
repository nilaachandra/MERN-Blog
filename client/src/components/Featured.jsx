import React, { useState } from "react";
import Button from "./Button";
import { useGlobalContext } from "../contexts/GlobalContext";

const Featured = () => {
  const [isReadMore, setIsReadMore] = useState(false);
const {light} = useGlobalContext()
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <h1 className="mt-3 lg:text-4xl text-base font-bold">Featured Blog</h1>
      <div className={`w-full border ${light ? "border-black" : "border-white"} p-2 rounded-lg mt-3`}>
      <div className="w-full grid lg:grid-cols-2 grid-cols-1 gap-4">
        <div className="w-full lg:h-[44vh] h-[22vh]">
          <img
            src="https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="w-full h-full rounded-lg"
          />
        </div>
        <div className="w-full gap-1 flex flex-col justify-between">
          <h1 className="lg:text-5xl text-xl font-bold">
            The Benefits of Playing Football
          </h1>
          <p className="leading-0 lg:flex hidden tracking-tight text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque sit
            facilis voluptates in eligendi, aliquid tempora at iure? The quick
            brown fox jumps over the lazy dog consequatur reiciendis labore
            laudantium itaque quis ullam obcaecat ab non veritatis dolorum
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
            sapiente ut cupiditate pariatur nisi nesciunt? Facilis, expedita.
          </p>
          

          <div className="flex lg:flex-row flex-col justify-between lg:items-end">
            <div>
              <h1>By Nila Chandra Laishram</h1>
              <h1>Posted At 12:57 PM, 8th August 2024</h1>
            </div>
            
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Featured;
