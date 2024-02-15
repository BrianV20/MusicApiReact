import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import { GetUserFromToken } from "../services/User";

export default function UserProfile() {
  const [user, setUser] = useState({});

  const addFavorites = () => {
    console.log('addFavorites');
  };

  useEffect(() => {
    GetUserFromToken().then((data) => setUser(data));
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-slate-200 w-full">
        <img
          className="w-[40%] mx-auto rounded-full py-2"
          src={user.img}
          alt='user profile pic'
        />

        <p className="text-xl text-center mb-3">{user.username}</p>


        <div className="px-2 border-t-2 border-red-500 pt-2">
          <div className="flex items-center">
            <p>FAVORITES</p>
            <button className="mx-3 px-2 py-[0.10rem] rounded-full border-2 border-blue-900" onClick={addFavorites}>
              <i className="fa-solid fa-plus text-xl"></i>
            </button>
          </div>
          <div>discos favs</div>
        </div>
        <div className="px-2 border-t-2 border-red-500 pt-2">
          <p>RECENT ACTIVITY</p>
          <div>actividad reciente</div>
        </div>

        <div>
          Ratings
        </div>

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
