import { useParams } from "react-router-dom";
import NavBar from "../NavBar";

export default function ReviewById() {
  const params = useParams();

  return (
    <>
      <NavBar />
      <div>
        <h1>ReviewById</h1>
        <p>Id: {params.id}</p>
      </div>
    </>
  );
}
