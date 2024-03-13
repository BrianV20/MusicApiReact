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

      if(favReleases != ""){
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
      <div className="bg-slate-200 min-h-screen">
        <div className="relative">
          <img
            className="w-[40%] mx-auto rounded-full py-2"
            src={user.img}
            alt="user profile pic"
          />
          {/* <input type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
          <i className="fa-solid fa-plus bg-green-400 rounded-full text-xl py-1 px-2 absolute right-[5rem] bottom-[0.1rem]" onClick={handleUserPicChange}></i> */}
        </div>

        <p className="text-xl text-center mb-3 font-semibold">{user.username}</p>

        <div className="px-2">
          <div className="mb-5 mt-2">
            <p className="mb-2">- FAVORITES</p>
            <div className="flex gap-x-2">
              {favoriteReleases && favoriteReleases.length > 0 ? favoriteReleases.map((r) => {
                console.log("HAY MAS DE UNO: " + favoriteReleases.length)
                return <div key={r.id}>
                  <img src={r.cover} alt={r.title} className="w-[6rem] min-h-[5rem] rounded-xl" onClick={() => navigate("/releases/" + r.id)}/>
                </div>
              }) : (
                <div className="px-3 border-2 border-slate-400">
                  <p>Go to settings to add your favorite releases.</p>
                </div>
              )}
            </div>
            {/* <button className="mx-3 px-2 py-[0.10rem] rounded-full border-2 border-blue-900" onClick={addFavorites}>
              <i className="fa-solid fa-plus text-xl"></i>
            </button> */}
          </div>
        </div>
        {/* <div className="px-2 border-t-2 border-red-500 pt-2">
          <p>RECENT ACTIVITY</p>
          <div>actividad reciente</div>
        </div> */}

        <div className="px-2">
          {/* Other options */}
          <ul>
            <li>Ratings - {numberOfRatings}</li>
            <li>Reviews - {numberOfReviews}</li>
            <li>Likes - {numberOfLikes}</li>
            <li>Wishlist - {numberOfReleasesOnWishlist}</li>
            {/* <li>Releases</li> */}
            <li>Lists</li>
          </ul>
        </div>
      </div>
    </>
  );
}
