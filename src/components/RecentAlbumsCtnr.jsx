import { useState } from "react";
import Album from "./Album";

export default function RecentAlbumsCtnr() {
    const [info, setInfo] = useState({
        href: 'https://rateyourmusic.com/release/album/billie-eilish/happier-than-ever/',
        src: '//e.snmc.io/i/300/w/349fbcea2e01e09e3814b37a24b3734d/8972823',
        alt: 'Billie Eilish - Happier Than Ever'
    });
    const [info2, setInfo2] = useState({
        href: 'https://rateyourmusic.com/release/album/madvillain/madvillainy/',
        src: '//e.snmc.io/i/300/w/63e6d31ed4a6af7a5d7460b7d9d7d15c/10532981',
        alt: 'Madvillain - Madvillainy'
    })
    const [info3, setInfo3] = useState({
        href: 'https://rateyourmusic.com/release/album/cryptopsy/none-so-vile/',
        src: '//e.snmc.io/i/300/w/5ba2f76b4e23a4024b91ef47a79190b3/2591115',
        alt: 'Cryptopsy - None So Vile'
    })

    return (
        <>
        <div className="bg-slate-200 px-2 pt-5">
            <h4>Recently added</h4>
            <div className="pt-1 flex gap-x-3 overflow-auto whitespace-nowrap">
                <Album albumInfo={info} />
                <Album albumInfo={info2} />
                <Album albumInfo={info3} />
            </div>
        </div>
        </>
    )
}