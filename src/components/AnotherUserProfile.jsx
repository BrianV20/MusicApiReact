import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../services/User";
import { GetLikedReleases } from "../services/User";
import { getReviews } from "../services/Review";
import { getRatings } from "../services/Rating";
import { getWishlistByUser } from "../services/Wishlist";

export default function AnotherUserProfile() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [numberOfReleasesOnWishlist, setNumberOfReleasesOnWishlist] =
    useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    getUser(params.id).then((data) => {
      setUser(data);
      GetLikedReleases(data.id).then((likes) => {
        const number = likes.split(",");
        setNumberOfLikes(number.length);
      });
      getReviews().then((reviews) => {
        const number = reviews.filter((r) => r.userId == data.id).length;
        setNumberOfReviews(number);
      });
      getRatings().then((ratings) => {
        const number = ratings.filter((r) => r.userId == data.id).length;
        setNumberOfRatings(number);
      });
      getWishlistByUser(data.id).then((wishlist) => {
        const number = wishlist.releasesIds.split(",").length;
        setNumberOfReleasesOnWishlist(number - 1);
      });
    });
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
      <div className="bg-slate-200 w-full">
        <div className="relative">
          <img
            className="w-[40%] mx-auto rounded-full py-2"
            src={user.img}
            alt="user profile pic"
          />
        </div>

        <p className="text-xl text-center mb-3">{user.username}</p>

        <div className="px-2 border-t-2 border-red-500 pt-2">
          <div className="flex items-center">
            <p>FAVORITES</p>
          </div>
          <div>discos favs</div>
        </div>
        <div className="px-2 border-t-2 border-red-500 pt-2">
          <p>RECENT ACTIVITY</p>
          <div>actividad reciente</div>
        </div>

        <div className="px-2 border-t-2 border-red-500 pt-2">
          <ul>
            <li>Ratings - {numberOfRatings}</li>
            <li>Reviews - {numberOfReviews}</li>
            <li>Likes - {numberOfLikes}</li>
            <li>Wishlist - {numberOfReleasesOnWishlist}</li>
            <li>Lists</li>
          </ul>
        </div>
      </div>
    </>
  );
}
