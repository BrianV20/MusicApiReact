import { useState } from "react";
import "../index.css";

export default function NavBar() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <>
      <nav className="bg-orange-600">
        <div className="text-white flex justify-between py-3 px-2 md:w-[70%] md:mx-auto">
          {/* <a href="" className="focus:bg-slate-500">
            <i className="fa-solid fa-bars text-xl flex items-center md:hidden peer/menuIcon"></i>
          </a> */}

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
                ? "burgerMenuIconDefault fa-solid fa-xmark bg-pink-600 ml-2 px-2 rounded-md"
                : "burgerMenuIconDefault fa-solid fa-bars"
            }
          ></label>
          {/* acá estoy usando una funcion para manejar las clases del label en base a si el checkbox está check o no. Uso una funcion y no la clase peer de Tailwind, porque con esa clase no puedo desactivar clases del label en base a l estado del checkbox, solo puedo agregar clases, con una funcion en cambio le pongo x clases segun el estado del checkbox. */}

          {/* <label htmlFor="menu" className="fa-solid fa-bars text-xl flex items-center md:hidden peer-checked/menuIcon:bg-red-700 cursor-pointer"></label> */}

          <div className="peer-checked/menuCheckbox:translate-x-0 absolute inset-0 bg-orange-800 w-[70%] translate-x-[-150rem] pt-14 transition-all duration-300 ease-in-out">
            <ul>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-house"></i>
                <a href="#">Home</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-magnifying-glass"></i>
                <a href="">Search</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-user"></i>
                <a href="">Profile</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-regular fa-clock"></i>
                <a href="">Wishlist</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-bars-staggered"></i>
                <a href="">Reviews</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-list"></i>
                <a href="">Lists</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-gear"></i>
                <a href="">Settings</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                <a href="">Sign out</a>
              </li>
            </ul>
          </div>

          <h1 className="w-full text-2xl pl-5 flex items-center md:pl-4">
            Popular
          </h1>
          <div className="hidden md:flex md:w-[100%] md:justify-evenly">
            <a href="#" className="navItemLg">
              Profile
            </a>
            <a href="#" className="navItemLg">
              Albums
            </a>
            <a href="#" className="navItemLg">
              Reviews
            </a>
            <a href="#" className="navItemLg">
              Wishlist
            </a>
          </div>
          <i className="fa-solid fa-magnifying-glass px-3 flex items-center"></i>
        </div>

        <div className="text-white px-2 flex justify-around text-center text-base md:w-[70%] md:mx-auto">
          <a href="#" className="navItem">
            Releases
          </a>
          <a href="#" className="navItem">
            Reviews
          </a>
          <a href="#" className="navItem">
            Lists
          </a>
          <a href="#" className="navItem">
            News
          </a>
        </div>
        {/* <i className="fa-solid fa-compact-disc text-white"></i> */}
      </nav>
    </>
  );
}
