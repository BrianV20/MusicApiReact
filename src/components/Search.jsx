import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        {/* <Link to="/releases"> */}
        <div onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </div>
        {/* </Link> */}
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
      <div className="bg-green-300"></div>

      {searchRequest == true ? (
        <div>
          <div className="text-3xl bg-green-300 w-fit p-2 mx-auto mt-2 mb-3 font-semibold rounded-xl">Releases</div>
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
                return <div key={rel.id} className="min-w-[5.7rem] text-center bg-blue-300 min-h-full rounded-lg mx-1 pt-3 px-1">
                  <Release albumInfo={releaseInfo} />
                  <p>{rel.title}</p>
                </div>
                // return (
                //   <div className="bg-red-400 mx-3 my-2" key={rel.id}>
                //     <p>{rel.title}</p>
                //   </div>
                // );
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
                return <div key={art.id} className="min-w-[5.7rem] bg-blue-300 min-h-full rounded-lg mx-1 pt-3">
                  <Artist artistInfo={artInfo} />
                </div>
                // return (
                //   <div className="bg-red-400 mx-3 my-2" key={art.id}>
                //     <p>{art.name}</p>
                //   </div>
                // );
              }
            })}
          </div>

          <div className="text-3xl bg-green-300 w-fit p-2 mt-7 mb-3 mx-auto font-semibold rounded-xl">Reviews</div>
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
