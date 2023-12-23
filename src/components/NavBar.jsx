import { useState } from "react";
import "../index.css";

export default function NavBar() {
  return (
    <>
      <nav className="bg-orange-600">
        <div className="text-white flex justify-between py-3 px-2 md:w-[70%] md:mx-auto">
          <i className="fa-solid fa-bars text-xl flex items-center md:hidden"></i>
          <h1 className="w-full text-2xl pl-5 flex items-center md:pl-4">Popular</h1>
          <div className="hidden md:flex md:w-[100%] md:justify-evenly">
            <a href="#" className="navItemLg">Profile</a>
            <a href="#" className="navItemLg">Albums</a>
            <a href="#" className="navItemLg">Reviews</a>
            <a href="#" className="navItemLg">Wishlist</a>
          </div>
          <i className="fa-solid fa-magnifying-glass px-3 flex items-center"></i>
        </div>

        <div className="text-white px-2 flex justify-around text-center text-base md:w-[70%] md:mx-auto">
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
