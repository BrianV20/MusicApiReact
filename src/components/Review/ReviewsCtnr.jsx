import { useState, useEffect } from "react";
import Review from "./Review";
import NavBar from "../NavBar";
import { getReviews } from "../../services/Review";

export default function ReviewsCtnr() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews()
    .then((data) => {
      setReviews(data);
    })
  }, []);

  return (
    <>
      <NavBar />
      <div className="bg-slate-200 px-2 py-2 md:w-fit md:self-center">
        <h4>Popular reviews this week</h4>
        <div className="pt-1 flex gap-x-3 overflow-x-scroll whitespace-nowrap flex-col">
          {reviews.map((review) => {
            let reviewInfo = {
              reviewId: review.id,
              href: "/reviews/" + review.id,
              userId: review.userId,
              releaseId: review.releaseId,
              reviewText: review.reviewText,
            };
            return <Review key={review.id} reviewInfo={reviewInfo} />;
          })}
        </div>
      </div>
    </>
  );
}
