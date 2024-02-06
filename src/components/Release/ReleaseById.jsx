import { useParams, Link } from "react-router-dom";
import { getRelease } from "../../services/Release";
import { useEffect, useState } from "react";
import { getArtist } from "../../services/Artist";
import { extractYear } from "../../utils/services";

export default function ReleaseById() {
  const params = useParams();
  const [release, setRelease] = useState({});
  const [artist, setArtist] = useState({});
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const toggleMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const addToWatchlist = () => {
    console.log('agregado a wishlist');
  }

  useEffect(() => {
    getRelease(params.id)
      .then((data) => {
        setRelease(data);
        return data.artistId; // returns the artistId for the next .then
      })
      .then((artistId) => {
        if (artistId) {
          getArtist(artistId).then((data) => setArtist(data));
        }
      });
  }, []);

  return (
    <>
      <div className="bg-blue-400">
        <Link to="/releases">
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </Link>
      </div>

      <div className="grid grid-cols-2 p-2 bg-slate-200">
        <div>
          <h2 className="text-2xl font-semibold">{release.title}</h2>
          <p className="text-slate-500 mt-3 mb-1">By: {artist.name}</p>
          {release.releaseDate && typeof release.releaseDate === "string" ? (
            <p className="text-slate-500">{extractYear(release.releaseDate)}</p>
          ) : (
            ""
          )}
        </div>

        <div>
          <img
            className="border-2 border-slate-400"
            src={release.cover}
            alt={release.title}
          />
        </div>
      </div>

      <div className="bg-slate-200 mt-5 p-1 border-2 border-slate-400 m-2">
        <div className="flex m-1 border-b-2 border-slate-400">
          <p className="flex-1">Rating</p>
          <p className="flex-1">3.43 / 5.0 with 2.218 ratings PENDIENTE</p>
        </div>
        <div className="flex m-1">
          <p className="flex-1">Genres</p>
          <p className="flex-1">generos... PENDIENTE</p>
        </div>
      </div>
      <div className="px-2 py-5 text-lg text-white bg-[#0CE959] rounded-full absolute right-4 bottom-4 z-30">
        <i
          className="fa-solid fa-plus px-3 flex items-center"
          onClick={toggleMenu}
        ></i>
      </div>

      {isMenuVisible && (
        <div className="bg-blue-500 inset-0 absolute h-[50%] translate-y-full transition-all duration-300 ease-in-out z-20">
          {/* <div className={isMenuVisible ? 'bg-blue-500 inset-0 absolute h-[50%] transition-all duration-300 ease-in-out translate-y-full' : 'bg-blue-500 inset-0 absolute h-[60%] transition-all duration-300 ease-in-out hidden'}> */}
          <div className="flex bg-red-400 justify-around text-center py-1">
            <div>
              <i className="fa-regular fa-eye text-2xl"></i>
              <p>Watch</p>
            </div>
            <div>
              <i className="fa-regular fa-heart text-2xl"></i>
              <p>Like</p>
            </div>
            <div>
              <i className="fa-regular fa-clock text-2xl" onClick={addToWatchlist}></i>
              <p>Wishlist</p>
            </div>
          </div>
          <div className="text-center">
            agregar las estrellas para el rating
          </div>
        </div>
      )}
      {isMenuVisible && (
        <div className="fixed inset-0 bg-black opacity-70 z-10" />
      )}
    </>
  );
}
