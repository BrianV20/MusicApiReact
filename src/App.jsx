import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import FeaturedAlbumsCtnr from "./components/FeaturedAlbumsCtnr";
import RecentAlbumsCtnr from "./components/RecentAlbumsCtnr";

function App() {
  return (
    <>
      <NavBar />
      <FeaturedAlbumsCtnr />
      <RecentAlbumsCtnr />
    </>
  );
}

export default App;