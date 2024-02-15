import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Search() {
  return (
    <>
      <div className="bg-blue-400">
        <Link to="/releases">
            <div className="flex">
                <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
                <div className="border-2 border-b-black">
                    Buscar
                </div>
            </div>
        </Link>
      </div>
      <p>pruebaaa</p>
    </>
  );
}
