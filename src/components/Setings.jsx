import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetLikedReleases, GetUserFromToken } from "../services/User";
import { updateUser, GetFavoriteReleases } from "../services/User";
import { getRelease, getReleases } from "../services/Release";
import GoBackNavbar from "./GoBackNavbar";

export default function Settings() {
  const [options, setOptions] = useState(["Profile", "Auth"]);
  const [selectedOption, setSelectedOption] = useState("Profile");
  const [user, setUser] = useState({});
  const [showFavoriteReleases, setShowFavoriteReleases] = useState(false);
  const [releases, setReleases] = useState([]);
  const [favoriteReleases, setFavoriteReleases] = useState({
    fav1: '',
    fav1Id: 0,
    fav2: '',
    fav2Id: 0,
    fav3: '',
    fav3Id: 0,
    fav4: '',
    fav4Id: 0,
  });
  const navigate = useNavigate();

  const handleSelectOption = (item) => {
    console.log(item);
    setSelectedOption(item);
  };

  // const handleFileChange = async (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const changeUserPic = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    // console.log("asdasdasdasdas");
  };

  const handleProfileChangesSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(user);
    // console.log(formJson);

    // var newFavoriteReleases = "";
    // if(showFavoriteReleases){
    //   console.log(favoriteReleases);
    //   // console.log((favoriteReleases.fav1 + ',' + favoriteReleases.fav2 + ',' + favoriteReleases.fav3 + ',' + favoriteReleases.fav4));
    //   newFavoriteReleases = favoriteReleases.fav1Id + ',' + favoriteReleases.fav2Id + ',' + favoriteReleases.fav3Id + ',' + favoriteReleases.fav4Id;
    // }

    var favs = "";
    {showFavoriteReleases ? (
      favs = favoriteReleases.fav1Id + ',' + favoriteReleases.fav2Id + ',' + favoriteReleases.fav3Id + ',' + favoriteReleases.fav4Id,
      console.log(favs)
    ) : (
      favs = user.favoriteReleases
    )}

    const updateUserDto = {
      // id: user.id,
      username: formJson.username,
      email: formJson.email,
      img: user.img,
      password: user.password,
      gender: formJson.gender,
      likedReleases: user.likedReleases,
      favoriteReleases: favs, //probar
    };
    // console.log(formJson);

    updateUser(user.id, updateUserDto);
  };

  const handleFavoriteReleasesButton = () => {
    // console.log("releases");
    setShowFavoriteReleases(!showFavoriteReleases);
  };

  // const displayReleases = () => {
  //   console.log(releases);
  // };

  const saveFavorites = () => {
    console.log(favoriteReleases);
  }

  const functionToSetFavoriteReleases = (array) => {
    if(array == "" || array == undefined){
      return;
    }
    else {
      var newArray = array.split(",");
      console.log("newArray: " + newArray);
      // if(array.length == 4){

      // }
    }
  };

  const handleFavChange = (e) => {
    const classes = e.target.className.split(' ');
    var rel = (releases.filter(r => r.title == e.target.value))[0];
  
    if(classes.includes('fav1')){
      setFavoriteReleases(prevState => ({
        ...prevState, fav1: e.target.value, fav1Id: rel.id
      }));
    }
    else if(classes.includes('fav2')){
      setFavoriteReleases(prevState => ({
        ...prevState, fav2: e.target.value, fav2Id: rel.id
      }));
    }
    else if(classes.includes('fav3')){
      setFavoriteReleases(prevState => ({
        ...prevState, fav3: e.target.value, fav3Id: rel.id
      }));
    }
    else if(classes.includes('fav4')){
      setFavoriteReleases(prevState => ({
        ...prevState, fav4: e.target.value, fav4Id: rel.id
      }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      var use = await GetUserFromToken();
      await setUser(use);

      var relea = await getReleases();
      await setReleases(relea);

      // console.log(await GetFavoriteReleases(user.id));
      // var favRelea = await GetFavoriteReleases(user.id);
      // await functionToSetFavoriteReleases(favRelea);
    }

    fetchData();
    // GetUserFromToken().then((data) => {
    //   setUser(data);
    // });
  }, []);

  useEffect(() => {
    if (releases && releases.length >= 4) {
      setFavoriteReleases({
        fav1: releases[0].title,
        fav1Id: 1,
        fav2: releases[1].title,
        fav2Id: 2,
        fav3: releases[2].title,
        fav3Id: 3,
        fav4: releases[3].title,
        fav4Id: 4
      });
    }
  }, [releases]);

  return (
    <>
      <GoBackNavbar />

      <div className="bg-slate-200">
        <div className="md:w-[80%] md:mx-auto min-h-screen">
          <p className="md:text-3xl py-5 px-2 text-xl">Account settings</p>

          <ul className="flex gap-x-3 px-2 md:text-4xl md:gap-x-5 md:pb-5">
            {options.map((opt, index) => (
              <li
              key={index}
              className={
                selectedOption == opt
                ? "font-semibold border-b-2 border-blue-500 md:border-b-4"
                : ""
              }
              onClick={() => handleSelectOption(opt)}
              >
                {opt}
              </li>
            ))}
          </ul>

          {selectedOption == "Profile" ? (
            <div className="bg-slate-200 px-2 min-h-screen pt-2">
              <p className="text-2xl font-semibold md:text-3xl">Profile options</p>
              <form onSubmit={handleProfileChangesSubmit}>
                <div className="flex flex-col mt-2 mb-3 md:text-2xl">
                  <label htmlFor="username">Username: </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="border-2 border-gray-300"
                    defaultValue={user ? user.username : ""}
                  />
                </div>

                <div className="flex flex-col mb-3 md:text-2xl">
                  <label htmlFor="email">Email: </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="border-2 border-gray-300"
                    defaultValue={user ? user.email : ""}
                  />
                </div>

                <div className="flex flex-col mb-3 md:text-2xl">
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="border-2 border-gray-300"
                    defaultValue={user ? user.password : ""}
                  />
                </div>

                {/* <label htmlFor="UserImage">User image: </label>
                    <input type="file" name="UserImage" id="UserImage" onChange={handleFileChange} /> */}

                <div className="flex flex-col mb-3 md:text-2xl">
                  <label htmlFor="gender">Gender: </label>
                  <select name="gender" id="gender">
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                  </select>
                </div>

                <div className="mt-5 mb-7 md:mt-10">
                  <div className="flex flex-col">
                    <p className="text-xl md:text-2xl">Favorite releases: </p>
                    <button type="button" onClick={handleFavoriteReleasesButton} className="bg-blue-400 py-1 font-semibold border-2 border-black text-xl md:text-2xl md:mt-4">Show</button>
                  </div>
                  {showFavoriteReleases ? (
                    <div className="bg-blue-300 pl-4 flex flex-col gap-y-2 py-2 rounded-b-xl md:text-2xl">
                      <select type="text" className="w-[80%] md:w-fit fav1" value={favoriteReleases.fav1} onChange={(e) => handleFavChange(e)}>
                        {releases ? releases.map((r, i) => {
                          return <option value={r.title} key={i} >{r.title}</option>
                        }): ''}
                      </select>

                      <select type="text" className="w-[80%] md:w-fit fav2" value={favoriteReleases.fav2} onChange={(e) => handleFavChange(e)}>
                        {releases ? releases.map((r, i) => {
                          return <option value={r.title} key={i} >{r.title}</option>
                        }): ''}
                      </select>

                      <select type="text" className="w-[80%] md:w-fit fav3" value={favoriteReleases.fav3} onChange={(e) => handleFavChange(e)}>
                        {releases ? releases.map((r, i) => {
                          return <option value={r.title} key={i} >{r.title}</option>
                        }): ''}
                      </select>

                      <select type="text" className="w-[80%] md:w-fit fav4" value={favoriteReleases.fav4} onChange={(e) => handleFavChange(e)}>
                        {releases ? releases.map((r, i) => {
                          return <option value={r.title} key={i} >{r.title}</option>
                        }): ''}
                      </select>

                      <button type="button" className="bg-green-200 p-2 rounded-lg w-fit mx-auto font-semibold border-2 border-black mt-2" onClick={saveFavorites}>Save favorites</button>
                    </div>
                  ) : ''}
                </div>

                <button type="submit" className="bg-green-400 rounded-md px-2 py-1 my-5 font-semibold border-2 border-black text-lg md:text-2xl">
                  Save changes
                </button>
              </form>
            </div>
          ) : (
            ""
          )}

          {selectedOption == "Auth" ? (
            <div className="min-h-screen bg-slate-200 pt-2">
              <form onSubmit={changeUserPic}>
                <p className="text-2xl font-semibold px-2">Auth options</p>
                {/* <label htmlFor="UserImage">User image: </label>
                <img
                  src={user.img}
                  alt="user image"
                  className="w-[6rem] rounded-full"
                />
                <input
                  type="file"
                  name="UserImage"
                  id="UserImage"
                  onChange={handleFileChange}
                />

                <button type="submit" className="bg-green-400 rounded-md px-2 py-1">
                  Save changes
                </button> */}
              </form>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>

    </>
  );
}
