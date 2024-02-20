import { Link } from "react-router-dom";

export default function Artist({ artistInfo, styles='' }) {
  const { href, src, name } = artistInfo;

  return (
    <>
      <div className="border-2 border-slate-400 flex-none w-[50%]">
        {/* <div></div> */}
        <Link to={href}>
          {styles ? (
            <img src={src} alt={name} className={styles} />
          ) : (
            <div>
                <div className="bg-green-200 flex flex-col items-center text-center">
                    <img src={src} alt={name} className="w-20 h-20 rounded-full" />
                    <p>{name}</p>
                </div>
            </div>
          )}
        </Link>
      </div>
    </>
  );
}
