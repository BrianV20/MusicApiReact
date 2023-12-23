import { useState } from "react";
import "../index.css";

export default function NavBar() {
  return (
    <>
      <nav className="bg-green-800">
        <div className="text-white flex justify-between border-2 border-pink-400 py-3 px-2">
          <i className="fa-solid fa-bars text-xl flex items-center"></i>
          <h1 className="w-full text-2xl pl-5 flex items-center">Popular</h1>
          <i className="fa-solid fa-magnifying-glass px-3 flex items-center"></i>
        </div>

        <div className="text-white border-2 border-blue-400 px-2 flex justify-around text-center text-base">
          <a href="#" className="navItem">Releases</a>
          <a href="#" className="navItem">Reviews</a>
          <a href="#" className="navItem">Lists</a>
          <a href="#" className="navItem">News</a>
        </div>
        {/* <i className="fa-solid fa-compact-disc text-white"></i> */}
      </nav>
    </>
  );
}
