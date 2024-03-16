import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRelease } from "../../services/Release";
import { getUser, GetUserFromToken } from "../../services/User";
import { getRating } from "../../services/Rating";
import { getReview } from "../../services/Review";
import { extractYear } from "../../utils/services";
import GoBackNavbar from "../GoBackNavbar";

export default function ReviewById() {
  const params = useParams();
  const [release, setRelease] = useState({});
  const [user, setUser] = useState({});
  const [rating, setRating] = useState({});
  const [review, setReview] = useState({});
  const [loggedUser, setLoggedUser] = useState({});
  const navigate = useNavigate();

  const handleUserReviewClick = () => {
    {
      /* <Link to={loggedUser.id == review.userId ? `/profile` : `/users/${review.userId}`} className="flex"> */
    }
    if (loggedUser.id == review.userId) {
      navigate("/profile");
    } else {
      navigate(`/users/${review.userId}`);
    }
  };

  useEffect(() => {
    getReview(params.id).then((data) => {
      setReview(data);
      getRelease(data.releaseId).then((data) => {
        setRelease(data);
      });
      getUser(data.userId).then((data) => {
        setUser(data);
      });
      getRating(data.userId + "-" + data.releaseId).then((data) => {
        setRating(data);
      });
    });
    GetUserFromToken().then((data) => {
      setLoggedUser(data);
    });
  }, []);
  return (
    <>
      <GoBackNavbar />

      <div className="p-2 bg-slate-200 min-h-screen">
        <div className="flex text-slate-500 p-5">
          <div className="w-[55%]">
            <div className="mb-1 flex" onClick={handleUserReviewClick}>
              {/* <Link to={loggedUser.id == review.userId ? `/profile` : `/users/${review.userId}`} className="flex"> */}
              <img
                src={user.img}
                alt="user pic"
                className="userImgStyleSmall md:w-[5rem] md:min-h-[5rem]"
              />
              <p className="text-[0.8rem] self-center ml-2 md:text-2xl">{user.username}</p>
              {/* </Link> */}
            </div>
            <div className="mb-1">
              <p className="text-[1.2rem] font-semibold text-black md:text-4xl md:mt-5">
                {release.title}
              </p>
              {release.releaseDate &&
              typeof release.releaseDate === "string" ? (
                <p className="text-slate-500 text-[0.9rem] md:text-3xl md:my-2">
                  {extractYear(release.releaseDate)}
                </p>
              ) : (
                ""
              )}
            </div>
            {rating && rating.ratingValue
              ? (console.log(
                  "EL RATING VALUE DEL RELEASE: " + rating.ratingValue
                ),
                // Number.isInteger(rating.ratingValue) ? (
                rating.ratingValue.includes(".") == false ? (
                  Array.from({ length: rating.ratingValue }).map((_, i) => (
                    <i key={i} className="fa-solid fa-star text-[#0CE959] md:text-2xl" />
                  ))
                ) : (
                  <>
                    {Array.from({ length: Math.floor(rating.ratingValue) }).map(
                      (_, i) => (
                        <i
                          key={i}
                          className="fa-solid fa-star text-[#0CE959] md:text-2xl"
                        />
                      )
                    )}
                    <i className="fa-regular fa-star-half-stroke text-[#0CE959] md:text-2xl"></i>
                  </>
                ))
              : ""}
          </div>
          <div className="w-[45%]">
            <Link
              to={`/releases/${release.id}`}
              onClick={() => navigate(`/releases/${release.id}`)}
            >
              <img
                className="border-2 border-slate-400 h-full max-h-[8rem] md:w-[17rem] md:min-h-[17rem]"
                src={release.cover}
                alt={release.title}
              />
            </Link>
          </div>
        </div>
        <div className="mt-2 border-2 pb-3 border-b-slate-400 md:px-5">
          <p className="text-slate-500 text-[0.8rem] overflow-ellipsis whitespace-pre-wrap md:text-2xl md:leading-8">
            {review.reviewText}
          </p>
        </div>
      </div>
    </>
  );
}
