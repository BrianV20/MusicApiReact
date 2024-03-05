import { useParams, Link, useNavigate } from "react-router-dom";
import { getRelease, getReleases, getGenresOfRelease } from "../../services/Release";
import { useEffect, useState } from "react";
import { getArtist } from "../../services/Artist";
import { extractYear } from "../../utils/services";
import {
  addReleaseToWishlist,
  deleteReleaseFromWishlist,
} from "../../services/Wishlist";
import {
  GetUserFromToken,
  LikeRelease,
  GetLikedReleases,
} from "../../services/User";
import { getWishlistByUser } from "../../services/Wishlist";
import { getRating, updateRating, getRatings } from "../../services/Rating";
import { addReview, getReviews } from "../../services/Review";
import Review from "../Review/Review";
import Release from "./Release";
import swal from "sweetalert";
import { getGenre } from "../../services/Genre";

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
  const [likeStyle, setLikeStyle] = useState("fa-regular fa-heart text-2xl");
  const [ratingAverage, setRatingAverage] = useState(0);
  const [numberOfRatings, setNumberOfRatings] = useState(0);
  const [releaseReviews, setReleaseReviews] = useState([]);
  const [releasesByReleaseArtist, setReleasesByReleaseArtist] = useState([]);
  const [genresOfRelease, setGenresOfRelease] = useState([]);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuStyles(
      "bg-gradient-to-b from-orange-200 to-orange-400 h-[50%] translate-y-full transition-all duration-300 ease-in-out fixed bottom-0 inset-0 z-20"
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

  const checkIfReleaseIsAlreadyLiked = async () => {
    const data = await GetUserFromToken();
    const likedReleases = await GetLikedReleases(data.id);
    // console.log("LOS LIKED RELEASES: " + likedReleases);
    if (likedReleases.includes(params.id + ",")) {
      // console.log("YA LO TEINE");
      setLikeStyle("fa-solid fa-heart text-2xl");
    }
  };

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

  const likeRelease = () => {
    var likeInfo = userId + "+-+-+-" + params.id;
    var result = LikeRelease(likeInfo);
    if (result != null) {
      console.log("BIEN");
    }
    console.log("MAL");
    if (likeStyle == "fa-regular fa-heart text-2xl") {
      setLikeStyle("fa-solid fa-heart text-2xl");
    } else {
      setLikeStyle("fa-regular fa-heart text-2xl");
    }
  };

  const uploadReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(formJson);

    const response = addReview(
      userId + "-+-+-+-" + params.id + "-+-+-+-" + formJson.reviewText
    ).then((data) => {
      console.log(data);
      if (!data.ok) {
        swal("Error", "You already reviewed this release", "error");
      } else {
        swal("Success", "Your review has been uploaded", "success");
      }
    });

    // console.log("subir review");
  };

  const getReleaseReviews = async () => {
    const reviews = await getReviews();
    const temp = await reviews.filter((r) => r.releaseId == params.id);
    setReleaseReviews(temp);
  };

  const getReleasesByArtist = async (id) => {
    const temp = await getReleases();
    const temp2 = temp.filter((r) => r.artistId == id);
    setReleasesByReleaseArtist(temp2);
  };
  
  // const functionToSetGenresOfRelease = async (genresArray) => {
  //   var newArray = [];
  //   genresArray.map((g) => {
  //     await getGenre(g);
  //   })
  // };

  // const getGenreById = async (id) => {
  //   var genre = await getGenre(id);
  //   return genre;
  //   // console.log(genre);
  // };

  const getGenresByIds = async (genresIds) => {
    const promises = genresIds.map(id => getGenre(id));
    const genres = await Promise.all(promises);
    // console.log(genres);
    return genres;
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await getRelease(params.id);
      setRelease(data);
  
      if (data.artistId) {
        const artistData = await getArtist(data.artistId);
        setArtist(artistData);
        getReleasesByArtist(artistData.id);
      }
  
      const releaseId = data.id;
  
      const ratingsData = await getRatings();
      const ratingsOfRelease = ratingsData.filter((r) => r.releaseId == releaseId);
      const sumOfRatingsOfRelease = ratingsOfRelease.reduce((sum, r) => sum + Number(r.ratingValue), 0);
      const numberOfRatingsOfRelease = ratingsOfRelease.length;
      setNumberOfRatings(numberOfRatingsOfRelease);
  
      if (numberOfRatingsOfRelease > 0) {
        setRatingAverage(Number((sumOfRatingsOfRelease / numberOfRatingsOfRelease).toFixed(2)));
      } else {
        setRatingAverage(0);
      }
  
      const genres = await getGenresOfRelease(releaseId);
      var temp = genres.split(',');
      var index = temp.indexOf('');
      if(index !== -1){
        temp.splice(index, 1);
      }
  
      const genresData = await getGenresByIds(temp);
      // console.log(genresData);
      setGenresOfRelease(genresData);
  
      const userData = await GetUserFromToken();
      setUserId(userData.id);
  
      const ratingData = await getRating(userData.id + "-" + params.id);
      if (ratingData.id != undefined) {
        setNumberOfStars(ratingData.ratingValue);
      }
  
      checkIfTheReleaseIsOnWishlist();
      checkIfReleaseIsAlreadyLiked();
      getReleaseReviews();
    };
  
    fetchData();
  }, [params.id]);

  // useEffect(() => {
  //   getRelease(params.id)
  //     .then((data) => {
  //       setRelease(data);
  //       if (data.artistId) {
  //         getArtist(data.artistId).then((artistData) => {
  //           setArtist(artistData);
  //           getReleasesByArtist(artistData.id);
  //         });
  //       }
  //       return data.id; // pass the release id to the next then block
  //     })
  //     .then((releaseId) => {
  //       getRatings().then((ratingsData) => {
  //         const ratingsOfRelease = ratingsData.filter(
  //           (r) => r.releaseId == releaseId
  //         );
  //         // console.log(ratingsOfRelease);
  //         const sumOfRatingsOfRelease = ratingsOfRelease.reduce(
  //           (sum, r) => sum + Number(r.ratingValue),
  //           0
  //         );
  //         const numberOfRatingsOfRelease = ratingsOfRelease.length;
  //         // console.log(sumOfRatingsOfRelease / numberOfRatingsOfRelease);
  //         setNumberOfRatings(numberOfRatingsOfRelease);
  //         if (numberOfRatingsOfRelease > 0) {
  //           setRatingAverage(Number((sumOfRatingsOfRelease / numberOfRatingsOfRelease).toFixed(2)));
  //         } else {
  //           setRatingAverage(0);
  //         }
  //       });
  //       getGenresOfRelease(releaseId).then((genres) => {
  //         var temp = genres.split(',');
  //         var index = temp.indexOf('');
  //         if(index !== -1){
  //           temp.splice(index, 1);
  //         }

  //         setGenresOfRelease(getGenresByIds(temp));
  //         // console.log(typeof getGenresByIds(temp))
          
  //         // console.log(temp);
  //         // functionToSetGenresOfRelease(temp);
  //         // var genresArray = [];
  //         // temp.map((g) => {
  //         //   genresArray.push(getGenreById(g));
  //         // });
  //         // console.log(genresArray);
  //         // setGenresOfRelease(genresArray);
  //         // setGenresIdsOfRelease(temp)
  //         // var prueba = genres.split(',').map((s, i) => {
  //         //   if(s != '') return s;
  //         // });
  //         // console.log(prueba.map((s, i) => {
  //         //   if(s != undefined){
  //         //     return s;
  //         //   }
  //         //   else {
  //         //     prueba[i]
  //         //   }
  //         // }));
  //         // console.log(genres.split(',').map((s, i) => {
  //         //   if(s != '') return s;
  //         // }));
  //       })
  //     });

  //   GetUserFromToken()
  //     .then((data) => {
  //       setUserId(data.id);
  //       return getRating(data.id + "-" + params.id);
  //     })
  //     .then((data) => {
  //       // console.log("data: ", data);
  //       if (data.id != undefined) {
  //         setNumberOfStars(data.ratingValue);
  //       }
  //     });
  //   checkIfTheReleaseIsOnWishlist();
  //   checkIfReleaseIsAlreadyLiked();
  //   getReleaseReviews();
  // }, [params.id]);

  return (
    <>
      <div className="bg-blue-400" onClick={() => navigate(-1)}>
        <div>
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </div>
      </div>

      <div className="grid grid-cols-2 p-2 bg-slate-200">
        <div>
          <h2 className="text-2xl font-semibold">{release.title}</h2>
          <Link to={`/artists/${artist.id}`}>
            <p className="text-slate-500 mt-3 mb-1">By: {artist.name}</p>
          </Link>
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
        <div className="flex m-1 border-slate-400">
          <p className="flex-1">Rating</p>
          {/* <p className="flex-1">3.43 / 5.0 with 2.218 ratings PENDIENTE</p> */}
          <p className="flex-1">
            {ratingAverage !== undefined && numberOfRatings !== undefined
              ? ratingAverage + " / 5.0 with " + numberOfRatings + " ratings."
              : ""}
            {/* {ratingAverage + " / 5.0 with " + numberOfRatings + " ratings."} */}
          </p>
        </div>
        <div className="flex mx-1 my-4">
          <p className="flex-1">Genres</p>
          {/* {genresOfRelease != undefined ? <p>{genresOfRelease}</p> : <p>nada</p>} */}
          {/* {console.log(typeof genresOfRelease)} */}
          {/* {console.log(genresOfRelease)} */}
          <div className="flex-1 flex flex-wrap">
          {genresOfRelease && genresOfRelease.map((genre, index) => (
            <div key={index}>
              {genresOfRelease[index+1] == undefined ? 
              <p className="mr-1">{genre.name}</p>
              :
              <p className="mr-1">{genre.name + ","}</p>}
            </div>
          ))}
          </div>
        </div>
        <div className="flex m-1 flex-col">
          <div className="mx-auto">
            <p>Reviews</p>
          </div>
          <div className="flex flex-wrap">
            {releaseReviews.map((review) => {
              let reviewInfo = {
                reviewId: review.id,
                href: "/reviews/" + review.id,
                userId: review.userId,
                releaseId: review.releaseId,
                reviewText: review.reviewText,
              };
              return (
                <Review
                  key={review.id}
                  reviewInfo={reviewInfo}
                  onClick={() => navigate(href)}
                />
              );
            })}
          </div>
          {/* <p className="flex-1">generos... PENDIENTE</p> */}
        </div>
      </div>

      <div className="bg-blue-300 mx-2 pt-2 px-1 mt-12 rounded-xl pb-3">
        <p className="text-xl mx-1 font-semibold mb-5">Other releases by {artist.name}</p>
        <div>
          {releasesByReleaseArtist.map((release) => {
            let releaseInfo = {
              href: "/releases/" + release.id,
              src: release.cover,
              alt: release.title,
            }
            // console.log(releaseInfo);
            return (
              <div
                className="flex bg-slate-200 mb-2 w-[95%] mx-auto items-center gap-2 rounded-lg"
                key={release.id}
                onClick={() => navigate(releaseInfo.href)}
              >
                <Release key={release.id} albumInfo={releaseInfo} />
                <p className="text-lg">{release.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="px-2 py-5 text-lg text-white bg-[#0CE959] rounded-full sticky inline-block left-2 bottom-4 z-30">
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
            <div onClick={likeRelease}>
              <i className={likeStyle}></i>
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
              <form onSubmit={uploadReview}>
                <textarea
                  className="w-full h-20"
                  placeholder="Write your review here..."
                  name="reviewText"
                ></textarea>
                <button type="submit" className="bg-gray-300 h-10 w-full">
                  Submit
                </button>
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
