import { useState, useEffect } from "react";
import { createUser, getUsers, login } from "../services/User";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Auth() {
  const [isSignUpShowing, setIsSignUpShowing] = useState(false);
  const [emailEl, setEmailEl] = useState("");
  const [usernameEl, setUsernameEl] = useState("");
  const [passwordEl, setPasswordEl] = useState("");
  const [confirmPasswordEl, setConfirmPasswordEl] = useState("");
  const [rememeberMeEl, setRememberMeEl] = useState(false);
  const [signInEmailEl, setSignInEmailEl] = useState("");
  const [signInPasswordEl, setSignInPasswordEl] = useState("");
  const [signInRememberMeEl, setSignInRememberMeEl] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!verifyFields()) {
      console.log("Invalid fields");
      return;
    }

    console.log("Valid fields");
    registerUser();
  };

  const verifyFields = () => {
    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailEl)) {
      console.log("Invalid email format");
      return false;
    }

    // username
    if (usernameEl.length < 3) {
      console.log("Username must be at least 3 characters long");
      return false;
    }

    // password
    if (passwordEl.length < 6) {
      console.log("Password must be at least 6 characters long");
      return false;
    }
    if (passwordEl !== confirmPasswordEl) {
      console.log("Passwords do not match");
      return false;
    }

    return true;
  };

  const registerUser = async () => {
    try {
      const user = {
        username: usernameEl,
        password: passwordEl,
        email: emailEl,
        img: "https://lastfm.freetls.fastly.net/i/u/770x0/637eb1786094ba74c8626f304b4cfc20.jpg#637eb1786094ba74c8626f304b4cfc20",
        gender: "M",
        FavoriteReleases: "",
        LikedReleases: "",
      };

      let temp = await createUser(user);
      // await console.log("TEMP: " + temp.ok);
      if (!temp.ok) {
        console.log("NO");
        throw new Error();
      } else {
        console.log("User created");
        await signInAfterRegistering(user);
        // swal("Success", "")
      }
    } catch (e) {
      console.log(e);
      swal(
        "Error",
        "That mail is already being used by another user.",
        "error"
      );
      // console.log("HUBO UN ERROR");
    }
  };

  // const signInAfterRegistering = (user) => {
  //   return new Promise((resolve, reject) => {
  //     setSignInEmailEl(user.email);
  //     setSignInPasswordEl(user.password);
  //     resolve();
  //   }).then(() => {
  //     handleLogin();
  //   });
  // };

  const signInAfterRegistering = (user) => {
    setSignInEmailEl(user.email);
    setSignInPasswordEl(user.password);
    setJustRegistered(true);
  };

  const handleLogin = async (e = null) => {
    if (e != null) {
      e.preventDefault();
    }
    if (!verifySignInFields()) {
      console.log("Invalid fields");
      swal("Error", "Incomplete fields.", "error");
      return;
    }

    try {
      var token = await loginUser();
      localStorage.setItem("token", token.token);
      console.log("Local storage token: ", localStorage.getItem("token"));
      await swal("Success", "Succesful login", "success");
      navigate("/");
    } catch (e) {
      console.log("LAS CREDENCIALES NO PERTENECEN A NINGUN USUARIO");
      swal("Error", "Incorrect credentials.", "error");
    }
  };

  const verifySignInFields = () => {
    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signInEmailEl)) {
      console.log("Invalid email format");
      return false;
    }

    // password
    if (signInPasswordEl.length < 6) {
      console.log("Password must be at least 6 characters long");
      return false;
    }

    return true;
  };

  const loginUser = async () => {
    const token = await login({
      email: signInEmailEl,
      password: signInPasswordEl,
    });
    return token;
  };

  useEffect(() => {
    if (justRegistered) {
      handleLogin();
      setJustRegistered(false); // Reset the flag
    }
  }, [signInEmailEl, signInPasswordEl]);

  return (
    <>
      <div className="flex bg-pink-300 flex-col h-screen overflow-hidden justify-center">
        {isSignUpShowing ? (
          <div className="flex items-center justify-center w-[90%] mx-auto md:w-[60%] md:text-2xl">
            <div className="w-full bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:text-4xl">Sign Up</h2>
              <form className="flex flex-col" onSubmit={(e) => handleSignUp(e)}>
                <input
                  type="email"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Email address"
                  value={emailEl}
                  onChange={(e) => setEmailEl(e.target.value)}
                />
                <input
                  type="text"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Username"
                  value={usernameEl}
                  onChange={(e) => setUsernameEl(e.target.value)}
                />
                <input
                  type="password"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Password"
                  value={passwordEl}
                  onChange={(e) => setPasswordEl(e.target.value)}
                />
                <input
                  type="password"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Repeat password"
                  value={confirmPasswordEl}
                  onChange={(e) => setConfirmPasswordEl(e.target.value)}
                />
                <div className="flex items-center justify-between flex-wrap">
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-900 cursor-pointer md:text-xl"
                  >
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="mr-2"
                      checked={rememeberMeEl}
                      onChange={(e) => setRememberMeEl(e.target.checked)}
                    />
                    <p className="inline-block md:text-xl">Remember me</p>
                  </label>
                  <p className="text-gray-900 mt-4">
                    {" "}
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-sm text-blue-500 -200 hover:underline mt-4 md:text-xl"
                      onClick={() => setIsSignUpShowing(!isSignUpShowing)}
                    >
                      Sign in
                    </a>
                  </p>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                // onClick={(e) => handleSignUp(e.target)}
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center w-[90%] mx-auto">
            <div className="w-full bg-white rounded-lg shadow-md p-6 md:w-[60%] md:text-2xl">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 md:text-4xl">Login</h2>
              <form className="flex flex-col" onSubmit={(e) => handleLogin(e)}>
                <input
                  type="email"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Email address"
                  value={signInEmailEl}
                  onChange={(e) => setSignInEmailEl(e.target.value)}
                />
                <input
                  type="password"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Password"
                  value={signInPasswordEl}
                  onChange={(e) => setSignInPasswordEl(e.target.value)}
                />
                <div className="flex items-center justify-between flex-wrap">
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-900 cursor-pointer md:text-xl"
                  >
                    <input
                      type="checkbox"
                      id="remember-me"
                      className="mr-2"
                      checked={signInRememberMeEl}
                      onChange={(e) => setSignInRememberMeEl(e.target.checked)}
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline mb-0.5 md:text-xl"
                  >
                    Forgot password?
                  </a>
                  <div className="flex items-center gap-x-2">
                    <p className="text-gray-900 mt-4">
                      Don't have an account?
                    </p>
                    <a
                      href="#"
                      className="text-sm text-blue-500 -200 hover:underline mt-4 md:text-xl"
                      onClick={() => setIsSignUpShowing(!isSignUpShowing)}
                    >
                      Sign up
                    </a>
                  </div>
                </div>
                <button
                  type="submit"
                  className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
