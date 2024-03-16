import { useState, useEffect } from "react";
import Review from "./Review";
import NavBar from "../NavBar";
import { getReviews } from "../../services/Review";

export default function ReviewsCtnr() {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = 12;

  const handlePageChangeByArrow = (e) => {
    // console.log(e.target.className);
    if(e.target.className.includes('right')) {
      if(currentPage < totalPages) {
        setCurrentPage(currentPage + 1);
        console.log("DERECHA");
      }
    }
    else {
      if(currentPage > 1) {
        setCurrentPage(currentPage - 1);
        console.log("Izquierda");
      }
    }
  }

  useEffect(() => {
    getReviews().then((data) => {
      setReviews(data);
      setTotalPages(Math.ceil(data.length / itemsPerPage));
      setCurrentItems(
        data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
      );
    });
  }, []);

  useEffect(() => {
    const newCurrentItems = reviews.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    setCurrentItems(newCurrentItems);
  }, [currentPage]);

  return (
    <>
      <NavBar option="Reviews" />
      <div className="bg-slate-200">
        <div className="md:w-[80%] md:mx-auto min-h-screen">
        <div className="px-2 py-2">
          <h4 className="text-xl md:text-2xl md:pt-4 md:pb-2">Popular reviews this week</h4>
          <div className="pt-1 flex gap-x-3 overflow-x-scroll whitespace-nowrap flex-col">
            {currentItems.length > 0 ? (
              <div>
                {currentItems.map((review) => {
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
            ) : (
              ''
            )}
            {/* {reviews.map((review) => {
              let reviewInfo = {
                reviewId: review.id,
                href: "/reviews/" + review.id,
                userId: review.userId,
                releaseId: review.releaseId,
                reviewText: review.reviewText,
              };
              return <Review key={review.id} reviewInfo={reviewInfo} />;
            })} */}
          </div>

          <div className="flex justify-center text-2xl items-center pt-7 pb-5 md:text-4xl md:pt-10 md:gap-x-6">
            <i
              className={
                totalPages > 1 ? "fa-solid fa-arrow-left px-3" : "hidden"
              }
              onClick={(e) => handlePageChangeByArrow(e)}
            ></i>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <div key={pageNumber}>
                  {pageNumber == currentPage ? (
                    <button
                      onClick={() => setCurrentPage(pageNumber)}
                      className="px-1 font-bold"
                    >
                      {pageNumber}
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentPage(pageNumber)}
                      className="px-1"
                    >
                      {pageNumber}
                    </button>
                  )}
                </div>
              )
            )}
            <i
              className={
                totalPages > 1 ? "fa-solid fa-arrow-right px-3" : "hidden"
              }
              onClick={(e) => handlePageChangeByArrow(e)}
            ></i>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}
