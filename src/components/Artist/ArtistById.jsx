import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtist } from "../../services/Artist";
import { getReleases } from "../../services/Release";
import Release from "../Release/Release";

export default function ArtistById() {
  const params = useParams();
  const [artist, setArtist] = useState({});
  const [releases, setReleases] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getArtist(params.id).then((data) => {
      setArtist(data);
    });

    getReleases().then((data) => {
      setReleases(data);
    });
    // getRelease(params.id).then((data) => {
    //   return data.artistId;
    // })
    // .then((artistId) => {
    //     getArtist(artistId).then((data) => {
    //         setArtist(data);
    //     });
    // })
  }, []);

  return (
    <>
      <div className="bg-blue-400">
        {/* <Link to="/releases"> */}
        <div onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </div>
        {/* </Link> */}
      </div>

      <div className="grid grid-cols-2 p-2 bg-slate-200">
        <div>
          <h2 className="text-2xl font-semibold">{artist.name}</h2>
          {/* <p className="text-slate-500 mt-3 mb-1">By: {artist.name}</p> */}
          {/* {release.releaseDate && typeof release.releaseDate === "string" ? (
            <p className="text-slate-500">{extractYear(release.releaseDate)}</p>
          ) : (
            ""
          )} */}
        </div>

        <div>
          <img
            className="border-2 border-slate-400"
            src={artist.img}
            alt={artist.name}
          />
        </div>
      </div>

      <div>
      <div className="bg-slate-200 pt-2 px-3">
          <p className="text-xl">Releases</p>
          <div>
            {releases
              ? releases.map((rel) => {
                  if (rel.artistId == artist.id) {
                    let releaseInfo = {
                      href: "/releases/" + rel.id,
                      src: rel.cover,
                      alt: rel.title,
                    };
                    return <div className="flex" key={rel.id}>
                        <Release albumInfo={releaseInfo} />
                        <p className="text-xl">{rel.title}</p>
                    </div>
                    //   <Link to='/releases/'>
                    //     <div className="m-1 bg-green-200" key={rel.id}>
                    //       {rel.title}
                    //     </div>
                    //   </Link>
                    // );
                  }
                })
              : // setReleasesFiltered(releases.map(rel => rel.artistId == artist.id)),
                // releasesFiltered.map((rel) => {
                //     return <div className="bg-green-300 m-1" key={rel.id}>{rel.title}</div>
                // })
                ""}
          </div>
        </div>
      </div>
    </>
  );
}
