import { Link } from "react-router-dom";

export default function Release({ albumInfo, styles='' }) {
  const { href, src, alt } = albumInfo;

  return (
    <>
      <div className="border-2 border-slate-400 flex-none">
        {/* <div></div> */}
        <Link to={href}>
          {styles ? (
            <img src={src} alt={alt} className={styles} />
          ) : (
            <img src={src} alt={alt} className="w-[6.5rem] min-h-28" />
          )}
        </Link>
      </div>
    </>
  );
}
