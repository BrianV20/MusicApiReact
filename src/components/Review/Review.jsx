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

    getRating(releaseId, userId).then((data) => {
      setRating(data);
    });
  }, []);

  return (
    <div className="border-2 border-t-slate-400 w-full pt-3 pb-2 h-[14rem] overflow-y-hidden">
      <Link to={"/reviews/" + reviewId}>
        <div className="flex flex-wrap justify-between">
          <div className="flex items-baseline w-[60%] break-words">
            <p className="font-semibold">{release.title}</p>
            {release.releaseDate && typeof release.releaseDate === "string" ? (
              <p className="text-slate-500 text-[0.8rem] ml-0.5">
                {extractYear(release.releaseDate)}
              </p>
            ) : (
              ""
            )}
          </div>
          <div className="flex flex-wrap w-[40%]">
            <p>{user.username}</p>
            <p>
              <img src={user.img} alt="user pic" />
            </p>
          </div>
        </div>

        <div>
          <div>
            <p className="text-slate-500 text-[0.8rem]">
              {/* {rating &&
                Array.from({ length: rating.ratingValue }).map(
                  (_, i) => (
                    console.log(rating.ratingValue),
                    (
                      <div>
                        {rating.ratingValue % 2 === 0 ? (
                          <i className="fa-solid fa-star-half-stroke"></i>
                        ) : (
                          ""
                        )}
                      </div>
                    )
                  )
                )} */}

              {rating && rating.ratingValue ? (
                Number.isInteger(rating.ratingValue) ? (
                  // si el numero es entero...
                  Array.from({ length: rating.ratingValue }).map((_, i) => (
                    <i key={i} className="fa-solid fa-star" />
                  ))
                ) : (
                  <>
                    {Array.from({ length: Math.floor(rating.ratingValue) }).map(
                      (_, i) => (
                        <i key={i} className="fa-solid fa-star" />
                      )
                    )}
                    <i className="fa-regular fa-star-half-stroke"></i>
                  </>
                )
              ) : (
                ""
              )}
            </p>
          </div>
          {/* <i className="fa-regular fa-star"></i> */}
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
