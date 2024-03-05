import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtist, getGenresOfArtist } from "../../services/Artist";
import { getReleases } from "../../services/Release";
import { getGenre } from "../../services/Genre";
import Release from "../Release/Release";

export default function ArtistById() {
  const params = useParams();
  const [artist, setArtist] = useState({});
  // const [releases, setReleases] = useState([]);
  const [releasesByArtist, setReleasesByArtist] = useState([]);
  const [genres, setGenres] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   getArtist(params.id).then((data) => {
  //     setArtist(data);
  //   });

  //   getReleases().then((data) => {
  //     setReleases(data);
  //   });
  // }, []);

  const getGenresByIds = async (genresIds) => {
    const promises = genresIds.map(id => getGenre(id));
    const genress = await Promise.all(promises);
    // console.log(genres);
    return genress;
  }

  useEffect(() => {
    const fetchData = async () => {
      var arti = await getArtist(params.id);
      await setArtist(arti);
      var genr = await getGenresOfArtist(arti.id);
      var temp = genr.split(',');
      var index = temp.indexOf('');
      if (index !== -1) {
        temp.splice(index, 1);
      }
      // console.log(temp);
      // console.log(await getGenresByIds(temp));
      await setGenres(await getGenresByIds(temp));
      // var prueba = [];
      // temp.map(g => prueba.push(getGenre(g)))
      // console.log(await prueba);

      var relea = await getReleases();
      await setReleasesByArtist(relea.filter(r => r.artistId == arti.id));
    };
    fetchData();
  }, [])

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
          <div className="inline-flex items-center mt-3 mb-1 flex-wrap">
            <p className="font-medium mr-1">Genres: </p>
            {genres && genres.length > 0 ? genres.map((genre, i) => {
              // return <div key={i} className="bg-yellow-200">
              //   <p key={i}>{genre.name}</p>
              // </div>
              return <div key={i}>
                {genres[i + 1] == undefined ?
                  <p className="mr-1">{genre.name}</p>
                  :
                  <p className="mr-1">{genre.name + ","}</p>}
              </div>
            }) : ''}
          </div>
        </div>

        <div>
          <img
            className="border-2 border-slate-400"
            src={artist.img}
            alt={artist.name}
          />
        </div>
      </div>

      <div className="bg-blue-300 mx-2 pt-2 px-1 mt-12 rounded-xl pb-3">
        <p className="text-xl mx-1 font-semibold mb-5">Other releases by {artist.name}</p>
        <div>
          {releasesByArtist && releasesByArtist.map((release) => {
            let releaseInfo = {
              href: "/releases/" + release.id,
              src: release.cover,
              alt: release.title,
            }
            console.log(releasesByArtist);
            return (
              <div
                className="flex bg-slate-200 mb-2 w-[95%] mx-auto items-center gap-2 rounded-lg"
                key={release.id}
                onClick={() => navigate(releaseInfo.href)}
              >
                <Release key={release.id} albumInfo={releaseInfo} />
                <p className="text-lg">{release.title}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div>
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
      </div> */}
    </>
  );
}
