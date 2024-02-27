import { useState, useEffect } from "react";
import Release from "./Release";
import { getReleases } from "../../services/Release";


export default function RecentAlbumsCtnr() {
    const [releases, setReleases] = useState([]);

    function orderArray(array) {
        let newArray = [];
        // for (let i = array.length - 1; i >= 0; i--) {
            for (let i = 0; i <= array.length; i++) {
            if(newArray.length === 15) break;
            newArray.push(array[i]);
        }
        return newArray;
    };

    useEffect(() => {
        getReleases().then(data => setReleases(orderArray(data)));
    }, [])

    return (
        <>
        <div className="px-2 pt-5 md:w-fit md:self-center">
            <h4>Recently added</h4>
            <div className="pt-1 flex gap-x-3 overflow-auto whitespace-nowrap">
                {releases.map((release) => {
                    let releaseInfo = {
                        href: '/releases/' + release.id,
                        src: release.cover,
                        alt: release.title
                    }
                    return <Release key={release.id} albumInfo={releaseInfo} />
                })}
            </div>
        </div>
        </>
    )
}