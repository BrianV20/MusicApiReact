import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../services/User";
import { GetLikedReleases, GetFavoriteReleases } from "../services/User";
import { getReviews } from "../services/Review";
import { getRatings } from "../services/Rating";
import { getWishlistByUser } from "../services/Wishlist";
import { getRelease } from "../services/Release";
import GoBackNavbar from "./GoBackNavbar";

export default function AnotherUserProfile() {
  const params = useParams();
  const [user, setUser] = useState({});
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [numberOfReleasesOnWishlist, setNumberOfReleasesOnWishlist] =
    useState(0);
  const [favoriteReleases, setFavoriteReleases] = useState([]);
  const [favoriteReleasesIds, setFavoriteReleasesIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      var userr = await getUser(params.id);
      setUser(userr);

      var likedreleasess = await GetLikedReleases(userr.id);
      let number = likedreleasess.split(';');
      setNumberOfLikes(number.length);
      0
      var reviewss = await getReviews();
      let numberreviewss = reviewss.filter((r) => r.userId == userr.id).length;
      setNumberOfReviews(numberreviewss);

      var ratingss = await getRatings();
      let numberratingss = ratingss.filter((r) => r.userId == userr.id).length;
      setNumberOfRatings(numberratingss);

      var wishlistt = await getWishlistByUser(userr.id);
      let numberwishlistt = wishlistt.releasesIds.split(',').length;
      setNumberOfReleasesOnWishlist(numberwishlistt - 1);

      var favReleases = await GetFavoriteReleases(userr.id);
      setFavoriteReleasesIds(favReleases.split(','));

      if (favReleases != "") {
        var arrayOfReleases = await Promise.all(favReleases.split(',').map(r => getRelease(r)));
        setFavoriteReleases(arrayOfReleases);
        console.log("hay un release");
      }
      else {
        console.log("no hay ningun release");
      }
    };
    fetchData();
    // getUser(params.id).then((data) => {
    //   setUser(data);
    //   GetLikedReleases(data.id).then((likes) => {
    //     const number = likes.split(",");
    //     setNumberOfLikes(number.length);
    //   });
    //   getReviews().then((reviews) => {
    //     const number = reviews.filter((r) => r.userId == data.id).length;
    //     setNumberOfReviews(number);
    //   });
    //   getRatings().then((ratings) => {
    //     const number = ratings.filter((r) => r.userId == data.id).length;
    //     setNumberOfRatings(number);
    //   });
    //   getWishlistByUser(data.id).then((wishlist) => {
    //     const number = wishlist.releasesIds.split(",").length;
    //     setNumberOfReleasesOnWishlist(number - 1);
    //   });
    // });
  }, []);

  return (
    <>
      <GoBackNavbar />

      <div className="bg-slate-200">
        <div className="md:w-[80%] md:mx-auto min-h-screen">
          <div className="md:pb-3 md:pt-6">
            <img
              className="w-[40%] mx-auto rounded-full py-2 md:w-[40%]"
              src={user.img}
              alt="user profile pic"
            />
          </div>

          <p className="text-xl text-center mb-3 font-semibold md:text-3xl">{user.username}</p>

            <div className="px-2 mb-5 mt-2">
              <p className="mb-2 md:text-2xl">- FAVORITES</p>
              <div className="flex gap-x-2">
                {favoriteReleases && favoriteReleases.length > 0 ? favoriteReleases.map((r) => {
                  return <div key={r.id}>
                    <img src={r.cover} alt={r.title} className="w-[6rem] min-h-[5rem] rounded-xl md:w-[9rem] md:min-h-[10rem] md:border-2 border-slate-400" onClick={() => navigate("/releases/" + r.id)} />
                  </div>
                }) : (
                  <div className="px-3 border-2 border-slate-400 md:w-full md:text-xl">
                    <p>This user has no favorite releases.</p>
                  </div>
                )}
              </div>
            </div>

          <div className="px-2 md:text-2xl">
            <ul>
              <li>Ratings - {numberOfRatings}</li>
              <li>Reviews - {numberOfReviews}</li>
              <li>Likes - {numberOfLikes}</li>
              <li>Wishlist - {numberOfReleasesOnWishlist}</li>
              <li>Lists</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
