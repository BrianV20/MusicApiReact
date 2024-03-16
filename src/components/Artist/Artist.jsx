import { Link } from "react-router-dom";

export default function Artist({ artistInfo, styles='' }) {
  const { href, src, name } = artistInfo;

  return (
    <>
      <div>
        <Link to={href}>
          {styles ? (
            <img src={src} alt={name} className={styles} />
          ) : (
            <div>
                <div className="flex flex-col items-center text-center">
                    <img src={src} alt={name} className="w-20 h-20 rounded-full border-2 border-slate-400 md:min-w-[9rem] md:min-h-[9rem]" />
                    <p className="md:text-xl">{name}</p>
                </div>
            </div>
          )}
        </Link>
      </div>
    </>
  );
}
