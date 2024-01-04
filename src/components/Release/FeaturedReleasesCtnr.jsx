import { useState, useEffect } from "react";
import Release from "./Release";
import { getReleases } from "../../services/Release";

export default function FeaturedAlbumsCtnr() {
    const [releases, setReleases] = useState([]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function cutArray(array) {
        array = shuffleArray(array);
        let newArray = [];
        for (let i = 0; i < 15; i++) {
            newArray.push(array[i]);
        }
        return newArray;
    }

    useEffect(() => {
        getReleases().then(data => setReleases(cutArray(data)));
    }, [])
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
        <div className="px-2 py-2 md:w-fit md:self-center">
            <h4>Popular this week</h4>
            <div className="pt-1 flex gap-x-3 overflow-auto whitespace-nowrap">

                {/* I M P O R T A N T E: SEGUIR CON REACT; CREAR LOS SERVICIOS, HACER LOS FETCH PARA PROBAR TODO, MEJORAR EL ESTILO DE LA PAGINA (HACERLA RESPONSIVE) Y DESPUES AGREGAR LO DE AUTENTICACION. */}

                {releases.map((release) => {
                    let releaseInfo = {
                        href: '/releases/' + release.id,
                        src: release.cover,
                        alt: release.title
                    }
                    // console.log(releaseInfo);
                    return <Release key={release.id} albumInfo={releaseInfo} />
                })}
            </div>
        </div>
        </>
    )
}