import { useParams } from "react-router-dom";

export default function ReviewById() {
    const params = useParams();

    return (
        <div>
        <h1>ReviewById</h1>
        <p>Id: {params.id}</p>
        </div>
    )
}