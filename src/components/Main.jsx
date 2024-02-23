import { Route, Routes, useLocation } from "react-router-dom";
import HomeContent from "./HomeContent";
import ReviewsCtnr from "./Review/ReviewsCtnr";
import ReleaseById from "./Release/ReleaseById";
import ReviewById from "./Review/ReviewById";
import UserProfile from "./UserProfile";
import Wishlist from "./WishList";
import Auth from "./Auth";
import Search from "./Search";
import ArtistById from "./Artist/ArtistById";
import Settings from "./Setings";
import AnotherUserProfile from "./AnotherUserProfile";

export default function Main() {
  // const location = useLocation();

  return (
    <>
      {/* {location.pathname !== '/SignIn' && <NavBar />} */}
      
      <Routes>
        {/* MODIFICAR PARA QUE EL FOOTER SOLO APAREZCA EN PC */}
        <Route path="/" element={<HomeContent />} />
        <Route path="/search" element={<Search />} />
        <Route path="/releases/*" element={<HomeContent />} />
        <Route path="/releases/:id" element={<ReleaseById />} />
        <Route path="/reviews/*" element={<ReviewsCtnr />} />
        <Route path='reviews/:id' element={<ReviewById />} />
        <Route path="/artists/:id" element={<ArtistById />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/users/:id" element={<AnotherUserProfile />} />
        <Route path="/WishList" element={<Wishlist />} />
        <Route path="/SignIn" element={<Auth />} />
        <Route path="/settings" element={<Settings />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>

      {/* {location.pathname !== '/SignIn' && <Footer />} */}
    </>
  );
}