import { Link, useNavigate } from "react-router-dom";

export default function Release({ albumInfo, styles = "" }) {
  const { href, src, alt } = albumInfo;
  const navigate = useNavigate();

  return (
    <>
      <div className="border-2 border-slate-400 flex-none">
        {/* <div></div> */}
        <div onClick={() => navigate(href)}>
          {styles ? (
            <img src={src} alt={alt} className={styles} />
          ) : (
            <img src={src} alt={alt} className="w-[6.5rem] min-h-28 md:w-36 md:min-h-[10rem]" />
          )}
        </div>
        {/* <Link to={href}>
          {styles ? (
            <img src={src} alt={alt} className={styles} />
          ) : (
            <img src={src} alt={alt} className="w-[6.5rem] min-h-28" />
          )}
        </Link> */}
      </div>
    </>
  );
}
