import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { GetUserFromToken, GetLikedReleases, GetFavoriteReleases } from "../services/User";
import { getReviews } from "../services/Review";
import { getRatings } from "../services/Rating";
import { getWishlistByUser } from "../services/Wishlist";
import { getRelease } from "../services/Release";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [numberOfReviews, setNumberOfReviews] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [numberOfReleasesOnWishlist, setNumberOfReleasesOnWishlist] = useState(0);
  const [favoriteReleases, setFavoriteReleases] = useState([]);
  const [favoriteReleasesIds, setFavoriteReleasesIds] = useState([]);
  const navigate = useNavigate();
  // const fileInputRef = useRef(null);

  // const addFavorites = () => {
  //   console.log("addFavorites");
  // };

  // const handleUserPicChange = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log("llego");

  //   const formData = new FormData();
  //   formData.append('file', file);
  // }

  useEffect(() => {
    const fetchData = async () => {
      var userr = await GetUserFromToken();
      setUser(userr);

      var releasess = await GetLikedReleases(userr.id);
      var number = releasess.split(',');
      setNumberOfLikes(number.length);

      var reviewss = await getReviews();
      var num = (reviewss.filter(r => r.userId == userr.id)).length;
      setNumberOfReviews(num);

      var ratingss = await getRatings();
      var numberr = (ratingss.filter(r => r.userId == userr.id)).length;
      setNumberOfRatings(numberr);

      var wishlistt = await getWishlistByUser(userr.id);
      var numm = (wishlistt.releasesIds.split(',')).length;
      setNumberOfReleasesOnWishlist(numm);

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
      // console.log("prueba.: " + favReleases.split(',').length);
    };
    // GetUserFromToken().then((data) => {
    //   setUser(data)
    //   GetLikedReleases(data.id).then((likes) => {
    //     const number = likes.split(',');
    //     setNumberOfLikes(number.length);
    //   });
    //   getReviews().then((reviews) => {
    //     const number = (reviews.filter(r => r.userId == data.id)).length;
    //     setNumberOfReviews(number);
    //   });
    //   getRatings().then((ratings) => {
    //     const number = (ratings.filter(r => r.userId == data.id)).length;
    //     setNumberOfRatings(number);
    //   });
    //   getWishlistByUser(data.id).then((wishlist) => {
    //     const number = (wishlist.releasesIds.split(',')).length;
    //     // console.log(wishlist.releasesIds.split(','));
    //     setNumberOfReleasesOnWishlist(number-1);
    //   })
    // });
    fetchData();
  }, []);

  return (
    <>
      <NavBar />

      <div className="bg-slate-200">
        <div className="md:w-[80%] md:mx-auto min-h-screen">
          <img
            className="w-[40%] mx-auto rounded-full py-2 md:w-[40%]"
            src={user.img}
            alt="user profile pic"
          />

          <p className="text-xl text-center mb-3 font-semibold md:text-3xl">{user.username}</p>

          <div className="px-2">
            <div className="mb-5 mt-2">
              <p className="mb-2 md:text-2xl">- FAVORITES</p>
              <div className="flex gap-x-2">
                {favoriteReleases && favoriteReleases.length > 0 ? favoriteReleases.map((r) => {
                  console.log("HAY MAS DE UNO: " + favoriteReleases.length)
                  return <div key={r.id}>
                    <img src={r.cover} alt={r.title} className="w-[6rem] min-h-[5rem] rounded-xl md:w-[9rem] md:min-h-[10rem] md:border-2 border-slate-400" onClick={() => navigate("/releases/" + r.id)} />
                  </div>
                }) : (
                  <div className="px-3 border-2 border-slate-400 md:w-full md:text-xl">
                    <p>Go to settings to add your favorite releases.</p>
                  </div>
                )}
              </div>
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
