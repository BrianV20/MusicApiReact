import { useParams, Link } from "react-router-dom";
import { getRelease } from "../../services/Release";
import { useEffect, useState } from "react";
import { getArtist } from "../../services/Artist";
import { extractYear } from "../../utils/services";

export default function ReleaseById() {
  const params = useParams();
  const [release, setRelease] = useState({});
  const [artist, setArtist] = useState({});

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
    </>
  );
}
