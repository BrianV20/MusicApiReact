import { useEffect, useState, useRef } from "react";
import NavBar from "./NavBar";
import { GetUserFromToken } from "../services/User";

export default function UserProfile() {
  const [user, setUser] = useState({});
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
    GetUserFromToken().then((data) => setUser(data));
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-slate-200 w-full">
        <div className="relative">
          <img
            className="w-[40%] mx-auto rounded-full py-2"
            src={user.img}
            alt="user profile pic"
          />
          {/* <input type="file" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
          <i className="fa-solid fa-plus bg-green-400 rounded-full text-xl py-1 px-2 absolute right-[5rem] bottom-[0.1rem]" onClick={handleUserPicChange}></i> */}
        </div>

        <p className="text-xl text-center mb-3">{user.username}</p>

        <div className="px-2 border-t-2 border-red-500 pt-2">
          <div className="flex items-center">
            <p>FAVORITES</p>
            {/* <button className="mx-3 px-2 py-[0.10rem] rounded-full border-2 border-blue-900" onClick={addFavorites}>
              <i className="fa-solid fa-plus text-xl"></i>
            </button> */}
          </div>
          <div>discos favs</div>
        </div>
        <div className="px-2 border-t-2 border-red-500 pt-2">
          <p>RECENT ACTIVITY</p>
          <div>actividad reciente</div>
        </div>

        <div>Ratings</div>

        <div className="px-2 border-t-2 border-red-500 pt-2">
          {/* Other options */}
          <ul>
            <li>Releases</li>
            <li>Reviews</li>
            <li>Lists</li>
            <li>Wishlist</li>
            <li>Likes</li>
          </ul>
        </div>
      </div>
    </>
  );
}
