function App() {
    const [count, setCount] = useState(0);
    const [artists, setArtists] = useState([]);
  
    useEffect(() => {
      getArtists().then(data => setArtists(data));
    }, [])
  
    return (
      <>
      <h1>Hola</h1>
      {artists.map((artist) => {
        return <h2 key={artist.id+artist.name}>{artist.id} - {artist.name}</h2>
      })}
      {console.log(artists)}
      </>
    )
  }