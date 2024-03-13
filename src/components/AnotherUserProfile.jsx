import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUser } from "../services/User";
import { GetLikedReleases, GetFavoriteReleases } from "../services/User";
import { getReviews } from "../services/Review";
import { getRatings } from "../services/Rating";
import { getWishlistByUser } from "../services/Wishlist";
import { getRelease } from "../services/Release";

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

      if(favReleases != ""){
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
      <div className="bg-blue-400">
        {/* <Link to="/releases"> */}
        <div onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </div>
        {/* </Link> */}
      </div>
      <div className="bg-slate-200 w-full min-h-screen">
        <div className="relative">
          <img
            className="w-[40%] mx-auto rounded-full py-2"
            src={user.img}
            alt="user profile pic"
          />
        </div>

        <p className="text-xl text-center mb-3 font-semibold">{user.username}</p>

        <div className="px-2">
          <div className="mb-5 mt-2">
            <p className="mb-2">- FAVORITES</p>
            <div className="flex gap-x-2">
              {favoriteReleases && favoriteReleases.length > 0 ? favoriteReleases.map((r) => {
                console.log("HAY MAS DE UNO: " + favoriteReleases.length)
                return <div key={r.id}>
                  <img src={r.cover} alt={r.title} className="w-[6rem] min-h-[5rem] rounded-xl" onClick={() => navigate("/releases/" + r.id)} />
                </div>
              }) : (
                <div className="px-3 border-2 border-slate-400">
                  <p>This user has no favorite releases.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-2">
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
