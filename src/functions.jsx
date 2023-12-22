import { useState, useEffect } from "react";

export async function getArtists(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  try {
    setIsLoading(true);
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Fetch error: ", error);
  }
  finally {
    setIsLoading(false);
  }

  return (
    <>
    {isLoading ? <p>Loading...</p> : console.log(data)}
    </>
  )
}
