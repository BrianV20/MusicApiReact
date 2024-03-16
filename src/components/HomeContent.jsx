import FeaturedAlbumsCtnr from "./Release/FeaturedReleasesCtnr";
import RecentAlbumsCtnr from "./Release/RecentReleasesCtnr";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomeContent() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/SignIn");
    }
    else {
      // localStorage.clear('token');
      console.log("token", localStorage.getItem("token"));
    }
  }, []);
  return (
    <>
    <div className="bg-slate-200">
      <NavBar option='Releases'/>
      <div className="md:w-[80%] md:mx-auto min-h-screen">
        <FeaturedAlbumsCtnr />
        <RecentAlbumsCtnr />
        <div className="px-2 py-5 text-lg text-white bg-[#0CE959] rounded-full fixed inline-block right-4 bottom-4 md:px-4 md:py-7 md:text-4xl" onClick={() => navigate('/search')}>
          <i className="fa-solid fa-magnifying-glass px-3 flex items-center"></i>
        </div>
      </div>
    </div>
    </>
  );
}
