import { useState, useEffect } from "react";
import Release from "./Release";
import { getReleases } from "../../services/Release";
import { getRatings } from "../../services/Rating";

export default function FeaturedAlbumsCtnr() {
  const [releases, setReleases] = useState([]);
  const [ratings, setRatings] = useState([]);

  // function shuffleArray(array) {
  //     for (let i = array.length - 1; i > 0; i--) {
  //         const j = Math.floor(Math.random() * (i + 1));
  //         [array[i], array[j]] = [array[j], array[i]];
  //     }
  //     return array;
  // }

  // const orderFunction = (a, b) => {
  //     return a
  // };

  // const orderByRatings = async (array) => {
  //     let newArray = [];
  //     console.log(ratings);
  //     for(let i = 0; i < array.length; i++) {
  //         if(array[i + 1] != undefined) {
  //             // console.log(("este es uno"));
  //             // let ratingsA =  ratings.filter(r => r.releaseId == array[i].id);
  //             // let ratingsB =  ratings.filter(r => r.releaseId == array[i + 1].id);
  //         }
  //         else {
  //             // console.log("ESTE ES EL ULTIMO");
  //         }
  //     }
  // };

  // const orderByNumberOfRatings = (array) => {
  //   let newArray = [];
  //   console.log(array);
  //   let ratingsA = [];
  //   let ratingsB = [];
  //   for (let i = 0; i < array.length; i++) {
  //     if (array[i + 1] != undefined) {
  //       // console.log(("este es uno"));
  //       ratingsA = ratings.filter((r) => r.releaseId == array[i].id);
  //       ratingsB = ratings.filter((r) => r.releaseId == array[i + 1].id);

  //       if (ratingsA > ratingsB) {
  //         console.log("a es mayor");
  //         // newArray.push(array[i]);
  //         // newArray.push(array[i + 1]);
  //       } else {
  //         console.log("b es mayor");
  //         // newArray.push(array[i + 1]);
  //         // newArray.push(array[i]);
  //       }
  //     } else {
  //       // console.log("ESTE ES EL ULTIMO");
  //     }
  //   }
  //   // console.log(newArray);
  // };

  const orderByRatings = (array, ratingsData) => {
    let newArray = array.map(release => {
      let count = ratingsData.filter(rating => rating.releaseId === release.id).length;
      return {  ...release, count };
    });

    newArray.sort((a, b) => b.count - a.count);

    // console.log(newArray);
    return newArray;
  }

  function cutArray(array) {
    // array = shuffleArray(array);
    let newArray = [];
    for (let i = 0; i < 15; i++) {
      newArray.push(array[i]);
    }
    return newArray;
  }

  useEffect(() => {
    getRatings().then((ratingsData) => {
      setRatings(ratingsData);
      getReleases().then((data) => {
        //releases ya tiene que estar ordenado y cortado
        let sortedReleases = orderByRatings(data, ratingsData);
        setReleases(cutArray(sortedReleases));
      });
    });
  }, []);

  // useEffect(() => {
  //     // getReleases().then(data => setReleases(cutArray(data)));
  //     const makeArray = async () => {
  //         let temp = await getReleases();
  //         temp = await orderByRatings(temp);
  //         // setReleases(cutArray(temp));
  //     }

  //     const ratingsThing = async () => {
  //         const ratingsData = await getRatings();
  //         await setRatings(ratingsData);
  //     }

  //     ratingsThing();
  //     makeArray();
  // }, [])
  // const [info, setInfo] = useState({
  //     href: 'https://rateyourmusic.com/release/album/sufjan-stevens/javelin/',
  //     src: '//e.snmc.io/i/300/w/7b3845ef65557587c66943414338cb97/11229386',
  //     alt: 'Sufjan Stevens - Javelin'
  // });
  // const [info2, setInfo2] = useState({
  //     href: 'https://rateyourmusic.com/release/album/jeff-buckley/grace/',
  //     src: '//e.snmc.io/i/300/w/2fbd009d30760d68b1d374482b638169/7027387',
  //     alt: 'Jeff Buckley - Grace'
  // })
  // const [info3, setInfo3] = useState({
  //     href: 'https://rateyourmusic.com/release/album/kero-kero-bonito/time-n-place/',
  //     src: '//e.snmc.io/i/300/w/6005068320bf18bfa09a15976d2e0c43/7182970',
  //     alt: 'Kero Kero Bonito - Time "n" Place'
  // })

  return (
    <>
      <div className="px-2 py-2 md:w-fit md:self-center md:mb-6">
        <h4 className="md:text-3xl md:my-2 text-xl">Popular this week</h4>
        <div className="pt-1 flex gap-x-3 overflow-auto whitespace-nowrap">
          {releases && releases.map((release) => {
            let releaseInfo = {
              href: "/releases/" + release.id,
              src: release.cover,
              alt: release.title,
            };
            // console.log(releaseInfo);
            return <Release key={release.id} albumInfo={releaseInfo} />;
          })}
        </div>
      </div>
    </>
  );
}
