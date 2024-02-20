import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

  const handleSearchChange = (e) => {
    setTextToSearch(e.target.value);
  };

  const handleSearch = () => {
    // console.log("Esto es lo que se buscaria: " + textToSearch);
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

  // useEffect(() => {
  //   console.log("reviews: " + reviews);
  // }, [reviews])

  return (
    <>
      <div className="bg-blue-400 flex">
        <Link to="/releases">
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </Link>
        <div className="flex items-center mx-2">
          <div className="">
            <div className="flex">
              <input
                type="text"
                className="w-full bg-white pl-1 outline-0"
                placeholder="Search releases, artists, etc"
                defaultValue={setTextToSearch}
                onChange={handleSearchChange}
              />
              <input
                type="button"
                value="Search"
                className="bg-blue-500 p-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {searchRequest == true ? (
        <div>
          <div className="text-3xl bg-yellow-200 w-fit p-2">Releases</div>
          <div className="flex flex-wrap">
            {releases.map((rel) => {
              if (
                rel.title.toLowerCase().includes(textToSearch.toLowerCase())
              ) {
                let releaseInfo = {
                  href: "/releases/" + rel.id,
                  src: rel.cover,
                  alt: rel.title,
                };
                return <Release key={rel.id} albumInfo={releaseInfo} />;
                // return (
                //   <div className="bg-red-400 mx-3 my-2" key={rel.id}>
                //     <p>{rel.title}</p>
                //   </div>
                // );
              }
            })}
          </div>

          <div className="text-3xl bg-yellow-200 w-fit p-2">Artists</div>
          <div className="flex flex-wrap">
            {artists.map((art) => {
              if (art.name.toLowerCase().includes(textToSearch.toLowerCase())) {
                let artInfo = {
                  href: "/artists/" + art.id,
                  src: art.img,
                  name: art.name,
                };
                return <Artist key={art.id} artistInfo={artInfo} />;
                // return (
                //   <div className="bg-red-400 mx-3 my-2" key={art.id}>
                //     <p>{art.name}</p>
                //   </div>
                // );
              }
            })}
          </div>

          <div className="text-3xl bg-yellow-200 w-fit p-2">Reviews</div>
          <div>
            {reviews.map((rev) => {
              // console.log("REVIEW NRO " + rev.id + ": " + Object.keys(rev));
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
                // return (
                //   <div className="bg-red-400 mx-3 my-2" key={rev.id}>
                //     <p>{rev.reviewText}</p>
                //   </div>
                // );
              }
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
