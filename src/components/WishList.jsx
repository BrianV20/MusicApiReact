import NavBar from "./NavBar";
import { useState, useEffect } from "react";
import Release from "./Release/Release";
import { getReleases, getRelease } from "../services/Release";
import { GetUserFromToken } from "../services/User";
import { getWishlistByUser } from "../services/Wishlist";

export default function WishList() {
  const [releases, setReleases] = useState([]);
  const [releasesIds, setReleasesIds] = useState([]);
  const [styles, setStyles] = useState("");

  const getIdsFromWishlist = async (ids) => {
    const idsToSave = ids.filter(id => id !== '');
    if(idsToSave.length === 0) return;
    const promises = idsToSave.map((id) => getRelease(id));
    Promise.all(promises).then((releases) => setReleases(releases));
    console.log("idsToSave: ", idsToSave);
  };


  useEffect(() => {
    styles != null ? setStyles("w-[4.7rem] min-h-22") : "";
    GetUserFromToken()
      .then((data) => getWishlistByUser(data.id))
      // .then((data) => console.log(data))
      .then((data) => {
        if (data != undefined) {
          if(data.releasesIds != null && data.releasesIds != "") {
            getIdsFromWishlist(data.releasesIds.split(","));
          }
        }
        // console.log("data type: ", typeof data, "data content: ", data),
        // setReleasesIds(data.releasesIds.split(","));
        // const promises = data.releasesIds.split(",").map((releaseId, index) => (
        //   releaseId != "" ? getRelease(releaseId) : promises.pop()
        // ));
        // Promise.all(promises).then((releases) => setReleases(releases));
        //   "releasesIds type: ",
        //   typeof releasesIds,
        //   "releasesIds content: ",
        //   releasesIds
        // )
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-violet-300 w-full">
        {/* <h1 className="text-center text-3xl py-2">WishList</h1> */}
        <div className="flex flex-wrap justify-center gap-2">
          {localStorage.getItem("token") ? (
            <div className="flex flex-wrap bg-red-300">
              {console.log(releases)}
              {releases.length > 0 ? (
                <div>
                  {releases.map((release) => {
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
                  })}
                </div>
              ) : (
                <div>todavia se esta cargando supongo</div>
              )}
              {/* {releasesIds != null ? (
                <div>
                  {console.log("releasesIds: ", releasesIds)}
                  {releasesIds.map((releaseId) => {
                    {console.log("releaseId: ", releaseId)}
                    getRelease(releaseId).then((data) => {
                      let releaseInfo = {
                        href: "/releases/" + data.id,
                        src: data.cover,
                        alt: data.title,
                      };
                      return (
                        <Release
                          key={data.id}
                          albumInfo={releaseInfo}
                          styles={styles}
                        />
                      );
                    });
                  })}
                </div>
              ) : (
                console.log("todavia se esta cargando supongo")
              )} */}
              {/* {localStorage.getItem("token")} */}
              {/* {releases.map((release) => {
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
              })} */}
            </div>
          ) : (
            ""
          )}
          {/* TERMINAR ESTO, EL ARRAY DE RELEASES LO CREE SOLAMENTE PARA PROBAR LOS ESTILOS, ESTAN BIEN. 
            EN REALIDAD DEBO HACER UN FETCH A LA API Y MOSTRAR LOS RELEASES QUE TIENE EL USUARIO QUE TIENE LA SESION INICIADA */}
          {/* {releases.map((release) => {
            let releaseInfo = {
              href: "/releases/" + release.id,
              src: release.cover,
              alt: release.title,
            };
            return <Release key={release.id} albumInfo={releaseInfo} styles={styles} />;
          })} */}
        </div>
      </div>
    </>
  );
}
