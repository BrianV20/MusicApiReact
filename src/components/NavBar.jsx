import { useEffect, useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";
import { GetUserFromToken } from "../services/User";

export default function NavBar({ option }) {
  const [isChecked, setIsChecked] = useState(false);
  // const [options, setOptions] = useState(['Releases', 'Reviews', 'Lists', 'News']);
  const [selectedOption, setSelectedOption] = useState("");
  const [user, setUser] = useState({});
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOverlayClick = () => {
    setIsChecked(false);
  };

  useEffect(() => {
    setSelectedOption(option);
    GetUserFromToken().then(data => setUser(data));
  }, []);

  return (
    <>
      {isChecked && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black opacity-70 z-10"
        ></div>
      )}
      <nav className="bg-orange-600">
        <div className="text-white flex justify-between py-3 px-2 md:w-[80%] md:mx-auto h-14">
          <input
            type="checkbox"
            id="menu"
            onChange={handleCheckboxChange}
            className="hidden peer/menuCheckbox"
          />
          <label
            htmlFor="menu"
            className={
              isChecked
                ? "burgerMenuIconDefault fa-solid fa-xmark bg-orange-600 ml-2 px-2 rounded-md"
                : "burgerMenuIconDefault fa-solid fa-bars"
            }
          ></label>
          {/* acá estoy usando una funcion para manejar las clases del label en base a si el checkbox está check o no. Uso una funcion y no la clase peer de Tailwind, porque con esa clase no puedo desactivar clases del label en base a l estado del checkbox, solo puedo agregar clases, con una funcion en cambio le pongo x clases segun el estado del checkbox. */}

          <div className="peer-checked/menuCheckbox:translate-x-0 absolute inset-0 bg-[#2d4c8f] w-[70%] translate-x-[-150rem] pt-14 transition-all duration-300 ease-in-out z-20">
            <ul>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-house"></i>
                <Link to="/">Home</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-magnifying-glass"></i>
                <Link to="/search">Search</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-user"></i>
                <Link to="/profile">Profile</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-regular fa-clock"></i>
                <Link to="/WishList">Wishlist</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-bars-staggered"></i>
                <Link to="/reviews">Reviews</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-list"></i>
                <a href="">Lists</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-gear"></i>
                <Link to="/settings">Settings</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <Link to="/SignIn" onClick={() => localStorage.clear("token")}>
                  Sign out
                </Link>
              </li>
            </ul>
          </div>

          <Link
            to="/"
            className="w-full text-2xl pl-5 flex items-center md:pl-2 md:text-4xl"
          >
            Popular
          </Link>

          <div className="hidden md:flex md:flex-col">
            {<div className={showUserMenu ? "hidden md:flex min-w-[15rem] items-center gap-x-2 font-medium bg-blue-300 pb-2 pt-1 px-2 text-black" : "hidden md:flex min-w-[15rem] items-center gap-x-2 font-medium pb-2 pt-1 px-2"} onClick={() => setShowUserMenu(!showUserMenu)}>
              <img src={user.img} alt={user.name + "pic"} className="rounded-full w-[3rem] min-h-[3rem] border-2 border-slate-400" />
              <p className="text-xl">{user.username}</p>
              <i className="fa-solid fa-chevron-down text-xl"></i>
            </div>}

            {showUserMenu ? (
              <div className="bg-blue-300 z-20 border-t-2 border-t-slate-400 text-black text-2xl">
                <ul>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-house"></i>
                    <Link to="/">Home</Link>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <Link to="/search">Search</Link>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-user"></i>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-regular fa-clock"></i>
                    <Link to="/WishList">Wishlist</Link>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-bars-staggered"></i>
                    <Link to="/reviews">Reviews</Link>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-list"></i>
                    <a href="">Lists</a>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-gear"></i>
                    <Link to="/settings">Settings</Link>
                  </li>
                  <li className="mdBurgerMenuLi">
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <Link to="/SignIn" onClick={() => localStorage.clear("token")}>
                      Sign out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : ''}
          </div>

          <Link to="/search" className="self-center md:pr-2 md:text-2xl">
            <i className="fa-solid fa-magnifying-glass px-3 flex items-center"></i>
          </Link>
        </div>

        <div className="text-white px-2 flex justify-around text-center text-base md:w-[80%] md:mx-auto md:pt-3 md:text-2xl md:mt-3">
          <Link
            to="/"
            // className="navItem"
            className={
              selectedOption == 'Releases'
                ? "font-semibold border-b-2 border-blue-500 "
                : "navItem"
            }
          >
            Releases
          </Link>
          <Link to="/reviews"
            // className="navItem"
            className={
              selectedOption == 'Reviews'
                ? "font-semibold border-b-2 border-blue-500 "
                : "navItem"
            }
          >
            Reviews
          </Link>
          <a href="#"
            // className="navItem"
            className={
              selectedOption == 'Lists'
                ? "font-semibold border-b-2 border-blue-500 "
                : "navItem"
            }
          >
            Lists
          </a>
          <a href="#"
            // className="navItem"
            className={
              selectedOption == 'News'
                ? "font-semibold border-b-2 border-blue-500"
                : "navItem"
            }
          >
            News
          </a>
        </div>
      </nav>
    </>
  );
}
