import { useState } from "react";
import Review from "./Review";
import NavBar from "../NavBar";

export default function ReviewsCtnr() {
  const [info, setInfo] = useState({
    userId: "1",
    releaseId: "3",
    reviewText: "Muy bueno",
  });
  const [info2, setInfo2] = useState({
    userId: "4",
    releaseId: "32",
    reviewText:
      "Bastante bueno, el mejor de su discografía por lejos. Muy recomendado.",
  });

  return (
    <>
      <NavBar />
      <div className="bg-slate-200 px-2 py-2 md:w-fit md:self-center">
        <h4>Popular reviews this week</h4>
        <div className="pt-1 flex gap-x-3 overflow-x-scroll whitespace-nowrap flex-col">
          <Review reviewInfo={info} />
          <Review reviewInfo={info2} />
        </div>
      </div>
    </>
  );
}
