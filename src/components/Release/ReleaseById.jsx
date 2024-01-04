import { useParams } from "react-router-dom"
import { getRelease } from "../../services/Release";
import { useEffect, useState } from "react";

export default function ReleaseById() {
    const params = useParams();
    const [release, setRelease] = useState({});

    useEffect(() => {
        getRelease(params.id).then(data => setRelease(data));
    }, []);

    return (
        <div>
        <h1>ReleaseById</h1>
        <h3>EL ID: {release.id}</h3>
        {/* <img src={release.cover} alt={release.title} srcset="" /> */}
        </div>
    )
}