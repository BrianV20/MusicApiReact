import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import Release from "./Release/Release";
import { getReleases, getRelease } from "../services/Release";
import { GetUserFromToken } from "../services/User";
import { getWishlistByUser } from "../services/Wishlist";

export default function WishList() {
  const [releases, setReleases] = useState([]);
  // const [releasesIds, setReleasesIds] = useState([]);-
  const [styles, setStyles] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 21;

  const getIdsFromWishlist = async (ids) => {
    const idsToSave = ids.filter(id => id !== '');
    if (idsToSave.length === 0 || idsToSave == null) return null;
    const promises = idsToSave.map((id) => getRelease(id));
    try{
      Promise.all(promises).then((releases) => {
        setReleases(releases);
        setTotalPages(Math.ceil(releases.length / itemsPerPage));
        setCurrentItems(releases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)); //esto basicamente corta el array y guarda los elementos que se mostrarian en la primer pagina
      });
    }
    catch(e){
      console.log("ESTE ES EL ERROR: " + e);
    }
    // console.log("Total pages: " + totalPages);
    // console.log("idsToSave: ", idsToSave);
  };

  const handlePageChangeByArrow = (e) => {
    // console.log(e.target.className);
    if (e.target.className.includes('right')) {
      if (currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        console.log("DERECHA");
      }
    }
    else {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
        console.log("Izquierda");
      }
    }
  }


  useEffect(() => {
    styles != null ? setStyles("w-[4.7rem] min-h-22 md:w-[8.5rem] md:min-h-full") : "";
    try {
      GetUserFromToken()
        .then((data) => getWishlistByUser(data.id))
        // .then((data) => console.log(data))
        .then((data) => {
          // console.log("data: ", data)
          if (data != undefined && data != null) {
            if (data.releasesIds != null && data.releasesIds != "") {
              getIdsFromWishlist(data.releasesIds.split(","))
            }
          }
          else {
            console.log("No hay data")
          }
        });
    }
    catch (error) {
      console.log("Error: ", error)
    }
  }, []);

  useEffect(() => {
    const newCurrentItems = releases.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    setCurrentItems(newCurrentItems);
  }, [currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <NavBar />
      <div className="bg-slate-200">
        <div className="md:w-[80%] min-h-screen md:mx-auto lg:w-[70%]">
          <div className="pt-4 md:pt-7">
            {/* <h1 className="text-center text-3xl py-2">WishList</h1> */}
            {localStorage.getItem("token") ? (
              <div>
                {/* {console.log(releases)} */}
                {currentItems.length > 0 ? (
                  <div className="flex flex-wrap justify-center gap-x-2 gap-y-2">
                    {currentItems.map((release) => {
                      if(release && release.title != undefined && release.cover != undefined){
                        let releaseInfo = {
                          href: "/releases/" + release.id,
                          src: release.cover,
                          alt: release.title,
                        };
                        return (
                          <Release
                            key={release.id}
                            albumInfo={releaseInfo}
                            styles={styles}
                          />
                        );
                      }
                    })}
                  </div>
                ) : (
                  <p className="md:text-2xl">Empty wishlist...</p>
                )}
              </div>
            ) : (
              ""
            )}
          </div>

          <div className="flex justify-center text-2xl items-center pt-7 pb-5 md:text-4xl md:pt-10 md:gap-x-6">
            <i className={totalPages > 1 ? 'fa-solid fa-arrow-left px-3 lg:hover:cursor-pointer' : 'hidden'} onClick={(e) => handlePageChangeByArrow(e)}></i>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
              <div key={pageNumber}>
                {pageNumber == currentPage ? (
                  <button onClick={() => setCurrentPage(pageNumber)} className="px-1 font-bold">
                    {pageNumber}
                  </button>
                ) : (
                  <button onClick={() => setCurrentPage(pageNumber)} className="px-1">
                    {pageNumber}
                  </button>
                )}
              </div>
            ))}
            <i className={totalPages > 1 ? 'fa-solid fa-arrow-right px-3 lg:hover:cursor-pointer' : 'hidden'} onClick={(e) => handlePageChangeByArrow(e)}></i>
          </div>
        </div>
      </div>
    </>
  );
}
