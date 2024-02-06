import { useState } from "react";
import "../index.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleOverlayClick = () => {
    setIsChecked(false);
  };

  return (
    <>
    {isChecked && <div onClick={handleOverlayClick}  className="fixed inset-0 bg-black opacity-70 z-10"></div>}
      <nav className="bg-orange-600">
        <div className="text-white flex justify-between py-3 px-2 md:w-[70%] md:mx-auto h-14">

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
                <Link to='/'>Home</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-magnifying-glass"></i>
                <a href="">Search</a>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-user"></i>
                <Link to='/profile'>Profile</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-regular fa-clock"></i>
                <Link to='/WishList'>Wishlist</Link>
              </li>
              <li className="burgerMenuLi">
                <i className="fa-solid fa-bars-staggered"></i>
                <Link to='/reviews'>Reviews</Link>
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
                <Link to='/SignIn'>Sign out</Link>
              </li>
            </ul>
          </div>

          <Link to='/' className="w-full text-2xl pl-5 flex items-center md:pl-4">
            Popular
          </Link>
          <i className="fa-solid fa-magnifying-glass px-3 flex items-center"></i>
        </div>

        <div className="text-white px-2 flex justify-around text-center text-base md:w-[70%] md:mx-auto">
          <Link to='/' className="navItem">
            Releases
          </Link>
          <Link to='/reviews' className="navItem">
            Reviews
          </Link>
          <a href="#" className="navItem">
            Lists
          </a>
          <a href="#" className="navItem">
            News
          </a>
        </div>
      </nav>
    </>
  );
}
