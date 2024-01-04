import ReleasesCtnr from "./Release/ReleasesCtnr";
import NavBar from "./NavBar";

export default function UserProfile() {
  return (
    <>
      <NavBar />
      <div className="bg-pink-200 w-full">
        <img
          className="w-[40%] mx-auto rounded-full py-2"
          src="https://a.ltrbxd.com/resized/avatar/upload/5/1/4/2/9/7/7/shard/avtr-0-1000-0-1000-crop.jpg?v=8654e435ae"
          alt=""
        />
        <h1>Username</h1>

        <div className="px-2 border-2 border-red-500">
          Favorites (ver mas adelante)
          {/* <ReleasesCtnr releasesInfo={}/> */}
        </div>
      </div>
    </>
  );
}
