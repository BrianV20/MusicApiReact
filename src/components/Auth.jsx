import { useState } from "react";

export default function Auth() {
  const [isSignUpShowing, setIsSignUpShowing] = useState(false);

  return (
    <>
      {/* <div className="bg-green-300 min-h-[100vh]">
            <img src="" alt="" />
            <h1>Sign in</h1>
            <form action="">
                <input type="text" placeholder="Username or Email" />
                <input type="password" placeholder="Password" />

                <button>Sign up</button>
                <button>Reset password</button>
                <button>Sign in</button>
            </form>
        </div> */}
      <div className="flex bg-pink-300 flex-col h-screen overflow-hidden justify-center">
        {" "}
        {/* <img className="h-[60%] min-w-[250vw] relative right-[50%] shadow-lg" src="https://a.ltrbxd.com/resized/sm/upload/44/up/dt/ca/mona-lisa-smile-1200-1200-675-675-crop-000000.jpg" alt="foto de fondo para el login" /> */}
        {/* <div style={{backgroundImage: `url("https://a.ltrbxd.com/resized/sm/upload/44/up/dt/ca/mona-lisa-smile-1200-1200-675-675-crop-000000.jpg")` }} className="h-[100%] min-w-[250vw] relative right-[50%] bg-cover"></div> */}
        {isSignUpShowing ? (
          <div className="flex items-center justify-center w-[90%] mx-auto">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign Up</h2>
              <form className="flex flex-col">
                <input
                  type="email"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Email address"
                />
                <input
                  type="text"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Username"
                />
                <input
                  type="password"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Password"
                />
                <input
                  type="password"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Repeat password"
                />
                <div className="flex items-center justify-between flex-wrap">
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-900 cursor-pointer"
                  >
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    Remember me
                  </label>
                  <p className="text-gray-900 mt-4">
                    {" "}
                    Already have an account?{" "}
                    <a
                      href="#"
                      className="text-sm text-blue-500 -200 hover:underline mt-4"
                      onClick={() => setIsSignUpShowing(!isSignUpShowing)}
                    >
                      Sign in
                    </a>
                  </p>
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
        ) : (
          <div className="flex items-center justify-center w-[90%] mx-auto">
            <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Login</h2>
              <form className="flex flex-col">
                <input
                  type="email"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Email address"
                />
                <input
                  type="password"
                  className="bg-gray-100 text-gray-900 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                  placeholder="Password"
                />
                <div className="flex items-center justify-between flex-wrap">
                  <label
                    htmlFor="remember-me"
                    className="text-sm text-gray-900 cursor-pointer"
                  >
                    <input type="checkbox" id="remember-me" className="mr-2" />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-sm text-blue-500 hover:underline mb-0.5"
                  >
                    Forgot password?
                  </a>
                  <p className="text-gray-900 mt-4">
                    {" "}
                    Don't have an account?{" "}
                    <a
                      href="#"
                      className="text-sm text-blue-500 -200 hover:underline mt-4"
                      onClick={() => setIsSignUpShowing(!isSignUpShowing)}
                    >
                      Sign up
                    </a>
                  </p>
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
