import { Link } from "react-router-dom";
import { getRelease } from "../../services/Release";
import { useState, useEffect } from "react";
import { extractYear } from "../../utils/services";
import { getUser } from "../../services/User";
import { getRating } from "../../services/Rating";

export default function Review({ reviewInfo }) {
  const { userId, releaseId, reviewText, reviewId } = reviewInfo;
  const [release, setRelease] = useState([]);
  const [user, setUser] = useState([]);
  const [rating, setRating] = useState({});

  useEffect(() => {
    getRelease(releaseId).then((data) => {
      setRelease(data);
    });

    getUser(userId).then((data) => {
      setUser(data);
    });

    getRating(userId + "-" + releaseId).then((data) => {
      setRating(data);
    });
  }, []);

  return (
    <div className="border-2 border-t-slate-400 w-full pt-3 pb-2 h-[14rem] overflow-y-hidden">
      <Link to={"/reviews/" + reviewId}>
        <div className="flex flex-wrap justify-between">
          <div className="flex items-baseline w-[50%] break-words flex-wrap">
            <p className="font-semibold">{release.title}</p>
            {release.releaseDate && typeof release.releaseDate === "string" ? (
              <p className="text-slate-500 text-[0.8rem] ml-0.5">
                {extractYear(release.releaseDate)}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="w-[50%]">
            <div className="flex flex-wrap justify-end align-top">
              <p className="text-slate-500 text-[0.8rem] self-center mx-1">
                {user.username}
              </p>
              <p>
                <img
                  src={user.img}
                  className="userImgStyleSmall"
                  alt="user pic"
                />
              </p>
            </div>
          </div>
        </div>

        <div>
          <div>
            <p className="text-slate-500 text-[0.8rem]">
            {rating && rating.ratingValue ? (
              // Number.isInteger(rating.ratingValue) ? (
                rating.ratingValue.includes(".") == false ? (
                Array.from({ length: rating.ratingValue }).map((_, i) => (
                  <i key={i} className="fa-solid fa-star text-[#0CE959]" />
                ))
              ) : (
                <>
                  {Array.from({ length: Math.floor(rating.ratingValue) }).map(
                    (_, i) => (
                      <i key={i} className="fa-solid fa-star text-[#0CE959]" />
                    )
                  )}
                  <i className="fa-regular fa-star-half-stroke text-[#0CE959]"></i>
                </>
              )
            ) : (
              ""
            )}
            </p>
          </div>
        </div>

        <div className="break-words flex pt-3">
          <img
            className="w-[5rem] h-[5.5rem] border-2 border-slate-400 mr-2"
            src={release.cover}
            alt={release.title}
          />
          <p className="text-slate-500 text-[0.8rem] overflow-ellipsis whitespace-pre-wrap">
            {reviewText}
          </p>
        </div>
      </Link>
    </div>
  );
}
