import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getArtist, getGenresOfArtist } from "../../services/Artist";
import { getReleases } from "../../services/Release";
import { getGenre } from "../../services/Genre";
import Release from "../Release/Release";
import GoBackNavbar from "../GoBackNavbar";
import NavBar from "../NavBar";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      {window.innerWidth < 900 ? (<GoBackNavbar />) : <NavBar />}

      <div className="bg-slate-200">
        <div className="md:w-[80%] md:mx-auto min-h-screen lg:w-[70%] pt-4">
          <div className="grid grid-cols-2 p-2 md:p-5">
            <div>
              <h2 className="text-2xl font-semibold md:text-4xl">{artist.name}</h2>
              <div className="inline-flex items-center mt-3 mb-1 flex-wrap md:text-2xl md:mt-4">
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
                className="border-2 border-slate-400 lg:w-[25rem]"
                src={artist.img}
                alt={artist.name}
              />
            </div>
          </div>

          <div className="bg-blue-300 mx-2 pt-2 px-1 mt-12 rounded-xl pb-3">
            <p className="text-xl mx-1 font-semibold mb-5 md:text-2xl">Other releases by {artist.name}</p>
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
                    className="flex bg-slate-200 mb-2 w-[95%] mx-auto items-center gap-2 rounded-lg lg:hover:cursor-pointer"
                    key={release.id}
                    onClick={() => navigate(releaseInfo.href)}
                  >
                    <Release key={release.id} albumInfo={releaseInfo} />
                    <p className="text-lg md:text-2xl">{release.title}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
