import NavBar from "./NavBar";
import Footer from "./Footer";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import HomeContent from "./HomeContent";
import ReviewsCtnr from "./Review/ReviewsCtnr";
import ReleaseById from "./Release/ReleaseById";
import ReviewById from "./Review/ReviewById";
import UserProfile from "./UserProfile";
import Auth from "./Auth";

export default function Main() {
  const location = useLocation();

  return (
    <>
      {/* {location.pathname !== '/SignIn' && <NavBar />} */}
      
      <Routes>
        {/* MODIFICAR PARA QUE EL FOOTER SOLO APAREZCA EN PC */}
        <Route path="/" element={<HomeContent />} />
        <Route path="/releases/*" element={<HomeContent />} />
        <Route path="/releases/:id" element={<ReleaseById />} />
        <Route path="/reviews/*" element={<ReviewsCtnr />} />
        <Route path='reviews/:id' element={<ReviewById />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/SignIn" element={<Auth />} />
        <Route path='*' element={<h1>404</h1>} />
      </Routes>

      {/* {location.pathname !== '/SignIn' && <Footer />} */}
    </>
  );
}