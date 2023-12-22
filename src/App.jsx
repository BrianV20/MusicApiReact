import { useState, useEffect } from "react";
import "./App.css";
// import { getArtists } from "./services/Artist";
// import { getArtist } from "./services/Artist";
// import { createArtist } from "./services/Artist";
// import { deleteArtist } from "./services/Artist";
import NavBar from "./components/NavBar";

function App() {
  const [count, setCount] = useState(0);
  // const [artists, setArtists] = useState([]);
  // const [singleArtist, setSingleArtist] = useState({});

  useEffect(() => {
    // getArtists().then((data) => setArtists(data));
    // getArtist(16).then((data) => setSingleArtist(data));
    // createArtist({ name: "Pablo" }).then((data) => console.log(data));
    // deleteArtist(27).then((data) => console.log(data));
  }, []);

  return (
    <>
    <NavBar />


      {/* <div style={{ backgroundColor: "violet", padding: "1rem" }}>
        <h2>Artistas: </h2>
        {artists.map((artist) => {
          return (
            <h3 key={artist.id + artist.name}>
              {artist.id} - {artist.name}
            </h3>
          );
        })}
      </div>

      <div style={{ backgroundColor: "greenyellow", padding: "1rem" }}>
        <h2>Artista por id</h2>
        <h3>
          {singleArtist.id} - {singleArtist.name}
        </h3>
      </div> */}
    </>
  );
}

export default App;
