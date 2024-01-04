import { Link } from "react-router-dom";

export default function Review({ reviewInfo }) {
  const { userId, releaseId, reviewText } = reviewInfo;

  return (
    <div className="border-2 border-slate-400 flex-none">
      <Link to="/reviews/10">
        <p>User: {userId}</p>
        <p>Release: {releaseId}</p>
        <p>Review: {reviewText}</p>
      </Link>
    </div>
  );
}
