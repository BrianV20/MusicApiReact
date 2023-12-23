import { useState } from "react";
import Album from "./Album";

export default function FeaturedAlbumsCtnr() {
    const [info, setInfo] = useState({
        href: 'https://rateyourmusic.com/release/album/sufjan-stevens/javelin/',
        src: '//e.snmc.io/i/300/w/7b3845ef65557587c66943414338cb97/11229386',
        alt: 'Sufjan Stevens - Javelin'
    });
    const [info2, setInfo2] = useState({
        href: 'https://rateyourmusic.com/release/album/jeff-buckley/grace/',
        src: '//e.snmc.io/i/300/w/2fbd009d30760d68b1d374482b638169/7027387',
        alt: 'Jeff Buckley - Grace'
    })
    const [info3, setInfo3] = useState({
        href: 'https://rateyourmusic.com/release/album/kero-kero-bonito/time-n-place/',
        src: '//e.snmc.io/i/300/w/6005068320bf18bfa09a15976d2e0c43/7182970',
        alt: 'Kero Kero Bonito - Time "n" Place'
    })

    return (
        <>
        <div className="bg-slate-200 px-2 py-2">
            <h4>Popular this week</h4>
            <div className="pt-1 flex gap-x-3 overflow-auto whitespace-nowrap">
                <Album albumInfo={info} />
                <Album albumInfo={info2} />
                <Album albumInfo={info3} />
            </div>
        </div>
        </>
    )
}