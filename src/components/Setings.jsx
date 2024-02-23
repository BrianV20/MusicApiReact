import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { GetUserFromToken } from "../services/User";
import { updateUser } from "../services/User";
import { fromJSON } from "postcss";

export default function Settings() {
  const [options, setOptions] = useState(["Profile", "Auth"]);
  const [selectedOption, setSelectedOption] = useState("Profile");
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  // const [selectedFile, setSelectedFile] = useState(null);

  const handleSelectOption = (item) => {
    console.log(item);
    setSelectedOption(item);
  };

  // const handleFileChange = async (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

  const changeUserPic = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    console.log(formJson);
    // console.log("asdasdasdasdas");
  };

  const handleProfileChangesSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());
    // console.log(user);
    console.log(formJson);
    const updateUserDto = {
      // id: user.id,
      username: formJson.username,
      email: formJson.email,
      img: user.img,
      password: user.password,
      gender: formJson.gender,
      favoriteReleases: user.favoriteReleases, //probar
    };
    // console.log(formJson);

    updateUser(user.id, updateUserDto);
  };

  useEffect(() => {
    GetUserFromToken().then((data) => {
      setUser(data);
    });
  });

  return (
    <>
      <div className="bg-blue-400">
        {/* <Link to="/releases"> */}
        <div onClick={() => navigate(-1)}>
          <i className="fa-solid fa-arrow-left text-2xl border-2 border-black py-1 px-2 mx-1 my-1"></i>
        </div>
        {/* </Link> */}
      </div>
      <ul className="flex gap-x-3 px-2 bg-amber-200">
        {options.map((opt, index) => (
          <li
            key={index}
            className={
              selectedOption == opt
                ? "font-semibold border-b-2 border-blue-500"
                : "font-semibold"
            }
            onClick={() => handleSelectOption(opt)}
          >
            {opt}
          </li>
        ))}
      </ul>

      {selectedOption == "Profile" ? (
        <div>
          <p className="text-2xl">Profile options</p>
          <form onSubmit={handleProfileChangesSubmit}>
            <label htmlFor="username">Username: </label>
            <input
              type="text"
              id="username"
              name="username"
              className="border-2 border-gray-300"
              defaultValue={user ? user.username : ""}
            />

            <label htmlFor="email">Email: </label>
            <input
              type="email"
              id="email"
              name="email"
              className="border-2 border-gray-300"
              defaultValue={user ? user.email : ""}
            />

            <label htmlFor="password">Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              className="border-2 border-gray-300"
              defaultValue={user ? user.password : ""}
            />

            {/* <label htmlFor="UserImage">User image: </label>
                <input type="file" name="UserImage" id="UserImage" onChange={handleFileChange} /> */}

            <label htmlFor="gender">Gender: </label>
            <select name="gender" id="gender">
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>

            <button type="submit" className="bg-green-400 rounded-md px-2 py-1">
              Save changes
            </button>
          </form>
        </div>
      ) : (
        ""
      )}

      {selectedOption == "Auth" ? (
        <form onSubmit={changeUserPic}>
          <p className="text-2xl">Auth options</p>
          {/* <label htmlFor="UserImage">User image: </label>
          <img
            src={user.img}
            alt="user image"
            className="w-[6rem] rounded-full"
          />
          <input
            type="file"
            name="UserImage"
            id="UserImage"
            onChange={handleFileChange}
          />

          <button type="submit" className="bg-green-400 rounded-md px-2 py-1">
            Save changes
          </button> */}
        </form>
      ) : (
        ""
      )}
    </>
  );
}
