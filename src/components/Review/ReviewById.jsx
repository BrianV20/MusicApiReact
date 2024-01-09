import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRelease } from "../../services/Release";
import { getUser } from "../../services/User";
import { getRating } from "../../services/Rating";
import { getReview } from "../../services/Review";
import { extractYear } from "../../utils/services";

export default function ReviewById() {
  const params = useParams();
  const [release, setRelease] = useState({});
  const [user, setUser] = useState({});
  const [rating, setRating] = useState({});
  const [review, setReview] = useState({});

  useEffect(() => {
    getReview(params.id).then((data) => {
      setReview(data);
      getRelease(data.releaseId).then((data) => {
        setRelease(data);
      });
      getUser(data.userId).then((data) => {
        setUser(data);
      });
      getRating(data.releaseId, data.userId).then((data) => {
        setRating(data);
      });
    });
  }, []);
  return (
    <>
      <div className="bg-blue-400">
        <Link to="/releases">
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </Link>
      </div>

      <div className="p-2 bg-slate-200">
        <div className="flex text-slate-500">
          <div className="w-[55%]">
            <div className="mb-1 flex">
              <img src={user.img} alt="user pic" className="userImgStyleSmall" />
              <p className="text-[0.8rem] self-center ml-2">{user.username}</p>
            </div>
            <div className="mb-1">
              <p className="text-[1.2rem] font-semibold text-black">{release.title}</p>
              {release.releaseDate &&
              typeof release.releaseDate === "string" ? (
                <p className="text-slate-500 text-[0.9rem]">
                  {extractYear(release.releaseDate)}
                </p>
              ) : (
                ""
              )}
            </div>
            {rating && rating.ratingValue ? (
              Number.isInteger(rating.ratingValue) ? (
                // si el numero es entero...
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
          </div>
          <div className="w-[45%]">
            <img
              className="border-2 border-slate-400 h-full max-h-[8rem]"
              src={release.cover}
              alt={release.title}
            />
          </div>
        </div>
        <div className="mt-2">
          <p className="text-slate-500 text-[0.8rem] overflow-ellipsis whitespace-pre-wrap">
            {review.reviewText}
          </p>
        </div>
      </div>
    </>
  );
}
