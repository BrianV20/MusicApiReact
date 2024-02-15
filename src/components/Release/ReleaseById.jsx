import { useParams, Link } from "react-router-dom";
import { getRelease } from "../../services/Release";
import { useEffect, useState } from "react";
import { getArtist } from "../../services/Artist";
import { extractYear } from "../../utils/services";
import { addReleaseToWishlist, deleteReleaseFromWishlist } from "../../services/Wishlist";
import { GetUserFromToken } from "../../services/User";
import { getWishlistByUser } from "../../services/Wishlist";
import { getRating, updateRating } from "../../services/Rating";
import { addReview } from "../../services/Review";
import swal from "sweetalert";

export default function ReleaseById() {
  const params = useParams();
  const [release, setRelease] = useState({});
  const [artist, setArtist] = useState({});
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [userId, setUserId] = useState(0);
  // const [alreadyOnWishlist, setAlreadyOnWishlist] = useState(false);
  const [wishlistIcons, setWishlistIcons] = useState([]);
  const [numberOfStars, setNumberOfStars] = useState(0.0);
  const [menuStyles, setMenuStyles] = useState("");

  const toggleMenu = () => {
    setMenuStyles(
      "bg-gradient-to-b from-orange-200 to-orange-400 inset-0 absolute h-[50%] translate-y-full transition-all duration-300 ease-in-out z-20"
    );
    setIsMenuVisible(!isMenuVisible);
  };

  const addToWatchlist = () => {
    //SEGUIR CON ESTA FUNCION PARA AGREGAR A WISHLIST
    if (wishlistIcons[1] == "fa-solid fa-plus") {
      // significa que no esta en wishlist
      console.log(
        "no esta en wishlist por lo que se va a agregar a la wishlist"
      );
      addReleaseToWishlist(userId + "-" + params.id);
      setWishlistIcons(["fa-solid fa-clock text-2xl", "fa-solid fa-minus"]);
    } else {
      // significa que ya esta en wishlist
      console.log(
        "ya esta en wishlist por lo que no se puede agregar y se va a eliminar de la wishlist"
      );
      deleteReleaseFromWishlist(userId + "-" + params.id);
      setWishlistIcons(["fa-regular fa-clock text-2xl", "fa-solid fa-plus"]);
      return;
    }
  };

  function checkIfTheReleaseIsOnWishlist() {
    GetUserFromToken()
      .then((data) => getWishlistByUser(data.id))
      .then((datas) => {
        // console.log(datas);
        return datas.releasesIds;
      })
      .then((releasesIds) => {
        const ids = releasesIds ? releasesIds.split(",") : "";
        if (ids.includes(params.id)) {
          // console.log("ya esta en wishlist");
          setWishlistIcons(["fa-solid fa-clock text-2xl", "fa-solid fa-minus"]);
          return true;
        } else {
          // console.log("no esta en wishlist");
          setWishlistIcons([
            "fa-regular fa-clock text-2xl",
            "fa-solid fa-plus",
          ]);
          return false;
        }
      });
  }

  const addStar = () => {
    if (numberOfStars < 5) {
      setNumberOfStars(parseFloat(numberOfStars) + 0.5);
    }
    console.log("agregar estrella");
  };

  const removeStar = () => {
    if (numberOfStars > 0) {
      setNumberOfStars(numberOfStars - 0.5);
    }
    console.log("quitar estrella");
  };

  const rateRelease = () => {
    console.log("calificar release");
    updateRating(userId + "-" + params.id + "-" + numberOfStars).then(
      (data) => {
        console.log(data);
      }
    );
    // console.log("se le ha dado " + numberOfStars + " estrellas");
  };

  const reviewRelease = () => {
    if (menuStyles.includes("translate-z-full")) {
      setMenuStyles(
        "bg-gradient-to-b from-orange-200 to-orange-400 inset-0 absolute h-[50%] translate-y-full transition-all duration-300 ease-in-out z-20"
      );
    } else {
      setMenuStyles(
        "bg-gradient-to-b from-orange-200 to-orange-400 inset-0 absolute h-[100%] translate-z-full transition-all duration-300 ease-in-out z-20"
      );
    }
  };

  const uploadReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    const response = addReview(userId + "-+-+-+-" + params.id + "-+-+-+-" + formJson.reviewText).then((data) => {
      console.log(data);
      if(!data.ok) {
        swal("Error", "You already reviewed this release", "error");
      }
      else {
        swal("Success", "Your review has been uploaded", "success");
      }
    });

    // console.log("subir review");
  };

  useEffect(() => {
    getRelease(params.id)
      .then((data) => {
        setRelease(data);
        return data.artistId; // returns the artistId for the next .then
      })
      .then((artistId) => {
        if(artistId) {
          getArtist(artistId).then((data) => setArtist(data));
        }
      });

    GetUserFromToken()
      .then((data) => {
        setUserId(data.id);
        return getRating(data.id + "-" + params.id);
      })
      .then((data) => {
        console.log("data: ", data);
        if(data.id != undefined) {
          setNumberOfStars(data.ratingValue);
        }
      }); //ARREGLAR ESTO PARA QUE NO DE ERROR CUANDO NO HAYA RATING

    checkIfTheReleaseIsOnWishlist();
  }, []);

  return (
    <>
      <div className="bg-blue-400">
        <Link to="/releases">
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </Link>
      </div>

      <div className="grid grid-cols-2 p-2 bg-slate-200">
        <div>
          <h2 className="text-2xl font-semibold">{release.title}</h2>
          <p className="text-slate-500 mt-3 mb-1">By: {artist.name}</p>
          {release.releaseDate && typeof release.releaseDate === "string" ? (
            <p className="text-slate-500">{extractYear(release.releaseDate)}</p>
          ) : (
            ""
          )}
        </div>

        <div>
          <img
            className="border-2 border-slate-400"
            src={release.cover}
            alt={release.title}
          />
        </div>
      </div>

      <div className="bg-slate-200 mt-5 p-1 border-2 border-slate-400 m-2">
        <div className="flex m-1 border-b-2 border-slate-400">
          <p className="flex-1">Rating</p>
          <p className="flex-1">3.43 / 5.0 with 2.218 ratings PENDIENTE</p>
        </div>
        <div className="flex m-1">
          <p className="flex-1">Genres</p>
          <p className="flex-1">generos... PENDIENTE</p>
        </div>
      </div>
      <div className="px-2 py-5 text-lg text-white bg-[#0CE959] rounded-full absolute right-4 bottom-4 z-30">
        <i
          className="fa-solid fa-plus px-3 flex items-center"
          onClick={toggleMenu}
        ></i>
      </div>

      {isMenuVisible && (
        <div className={menuStyles}>
          {/* <div className={isMenuVisible ? 'bg-blue-500 inset-0 absolute h-[50%] transition-all duration-300 ease-in-out translate-y-full' : 'bg-blue-500 inset-0 absolute h-[60%] transition-all duration-300 ease-in-out hidden'}> */}
          <div className="flex justify-around text-center py-1">
            <div>
              <i className="fa-regular fa-eye text-2xl"></i>
              <p>Watch</p>
            </div>
            <div>
              <i className="fa-regular fa-heart text-2xl"></i>
              <p>Like</p>
            </div>
            <div onClick={reviewRelease}>
              <i className="fa-solid fa-plus text-2xl"></i>
              <p>Review</p>
            </div>
            <div>
              <div onClick={addToWatchlist}>
                <i className={wishlistIcons[0]}></i>
                <i className={wishlistIcons[1]}></i>
                <p>Wishlist</p>
              </div>
            </div>
          </div>
          <div className="text-2xl my-4 mx-2 border-2 border-black flex justify-center text-center">
            <div className="flex border-2 border-blue-400 w-[40%] justify-center">
              <div className="">
                <i className="fa-solid fa-chevron-up" onClick={addStar}></i>
                <p>{numberOfStars ? numberOfStars : 0}</p>
                <i
                  className="fa-solid fa-chevron-down"
                  onClick={removeStar}
                ></i>
              </div>
              <div className="self-center ml-2">
                <i className="fa-solid fa-star text-[#0CE959]"></i>
              </div>
              {/* <i
              className="fa-solid fa-times text-2xl"
              onClick={toggleMenu}
              ></i> */}
            </div>
            <div className="w-[40%] self-center">
              <button
                className="bg-gray-300 h-10 w-[5rem] m-auto"
                onClick={rateRelease}
              >
                Rate
              </button>
            </div>
          </div>
          {menuStyles.includes("translate-z-full") && (
            <div className="bg-white p-2 m-2">
              <form onSubmit={uploadReview}> //VER QUE PASA AL SUBIR LA REVIEW QUE ME TIRA UN ERROR DE VALIDACION
                <textarea
                  className="w-full h-20"
                  placeholder="Write your review here..."
                  name="reviewText"
                ></textarea>
                <button type="submit" className="bg-gray-300 h-10 w-full">Submit</button>
              </form>
            </div>
          )}
        </div>
      )}
      {isMenuVisible && (
        <div className="fixed inset-0 bg-black opacity-70 z-10" />
      )}
    </>
  );
}
