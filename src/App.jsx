import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import FeaturedAlbumsCtnr from "./components/FeaturedAlbumsCtnr";
import RecentAlbumsCtnr from "./components/RecentAlbumsCtnr";

function App() {
  return (
    <>
      <NavBar />
      <div className="md:w-[70%] bg-pink-400 md:flex md:justify-center md:flex-col md:mx-auto">
        <FeaturedAlbumsCtnr />
        <RecentAlbumsCtnr />
      </div>
    </>
  );
}

export default App;
