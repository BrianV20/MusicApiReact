import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getReleases } from "../services/Release";
import { getArtists } from "../services/Artist";
import { getReviews } from "../services/Review";
import Release from "./Release/Release";
import Review from "./Review/Review";
import Artist from "./Artist/Artist";

export default function Search() {
  const [textToSearch, setTextToSearch] = useState("");
  const [releases, setReleases] = useState([]);
  const [artists, setArtists] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [searchRequest, setSearchRequest] = useState(false);
  const navigate = useNavigate();


  const handleSearchChange = (e) => {
    setTextToSearch(e.target.value);
  };

  const handleSearch = () => {
    getReleases().then((data) => {
      setReleases(data);

      getArtists().then((data) => {
        setArtists(data);

        getReviews().then((data) => {
          setReviews(data);

          if (searchRequest == false) {
            setSearchRequest(true);
          } else {
            setSearchRequest(false);
            setSearchRequest(true);
          }
        });
      });
    });
  };

  return (
    <>
      <div className="bg-blue-400 md:p-2 md:text-2xl border-2 border-b-black border-r-blue-400 border-t-blue-400 border-l-blue-400 flex">
        <div onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1 lg:hover:cursor-pointer"></i>
        </div>

        <div className="flex items-center mx-2">
          <div className="flex">
            <input
              type="text"
              className="w-full md:w-[20rem] bg-white pl-1 outline-0"
              placeholder="Search releases, artists, etc"
              defaultValue={setTextToSearch}
              onChange={handleSearchChange}
            />
            <input
              type="button"
              value="Search"
              className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors lg:hover:cursor-pointer"
              onClick={handleSearch}
            />
          </div>
        </div>
      </div>

      {searchRequest == true ? (
        <div className="bg-slate-200">
          <div className="md:w-[80%] md:mx-auto pt-4 min-h-screen">
            <div className="text-3xl bg-green-300 w-fit p-2 mx-auto mb-3 font-semibold rounded-xl">Releases</div>
            <div className="flex flex-nowrap overflow-scroll">
              {releases.map((rel) => {
                if (
                  rel.title.toLowerCase().includes(textToSearch.toLowerCase())
                ) {
                  let releaseInfo = {
                    href: "/releases/" + rel.id,
                    src: rel.cover,
                    alt: rel.title,
                  };
                  return <div key={rel.id} className="min-w-[5.7rem] text-center bg-blue-300 min-h-full rounded-lg mx-1 pt-3 px-1 md:min-w-[10rem]">
                    <Release albumInfo={releaseInfo} styles="w-[6.5rem] min-h-28 md:w-36 md:min-h-[10rem] md:w-full" />
                    <p className="md:text-xl">{rel.title}</p>
                  </div>
                }
              })}
            </div>

            <div className="text-3xl bg-green-300 w-fit p-2 mt-7 mb-3 mx-auto font-semibold rounded-xl">Artists</div>
            <div className="flex flex-nowrap overflow-scroll">
              {artists.map((art) => {
                if (art.name.toLowerCase().includes(textToSearch.toLowerCase())) {
                  let artInfo = {
                    href: "/artists/" + art.id,
                    src: art.img,
                    name: art.name,
                  };
                  return <div key={art.id} className="min-w-[5.7rem] bg-blue-300 min-h-full rounded-lg mx-1 pt-3 md:min-w-[10rem] pb-2">
                    <Artist artistInfo={artInfo} />
                  </div>
                }
              })}
            </div>

            <div className="text-3xl bg-green-300 w-fit p-2 mt-7 mb-3 mx-auto font-semibold rounded-xl">Reviews</div>
            <div>
              {reviews.map((rev) => {
                if (
                  rev.reviewText
                    .toLowerCase()
                    .includes(textToSearch.toLowerCase())
                ) {
                  let reviewInfo = {
                    reviewId: rev.id,
                    href: "/reviews/" + rev.id,
                    userId: rev.userId,
                    releaseId: rev.releaseId,
                    reviewText: rev.reviewText,
                  };
                  return <Review key={rev.id} reviewInfo={reviewInfo} />;
                }
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
