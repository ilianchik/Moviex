import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { BeatLoader } from "react-spinners";

function Login() {
  const { logIn } = UserAuth();

  const { register, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  async function onSubmit({ email, password }) {
    try {
      setIsLoading(true);
      setError("");
      await logIn(email, password);
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full h-[100%]">
      <img
        className="hidden sm:block absolute w-full h-full  object-cover"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/93da5c27-be66-427c-8b72-5cb39d275279/88f57e71-3532-4111-8848-6191aac47b26/UA-en-20240226-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt="background movie"
      />
      <div className="bg-black/60 fixed top-0 left-0 w-full h-full"></div>
      <div className="fixed w-full px-4 py-24 z-50 ">
        <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
          <div className="max-w-[320px] mx-auto py-16">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full flex flex-col py-4"
            >
              <input
                {...register("email")}
                className="p-3 my-2 bg-gray-700 rounded"
                type="email"
                placeholder="Email"
              />
              <input
                {...register("password")}
                className="p-3 my-2 bg-gray-700 rounded"
                type="password"
                placeholder="Password"
              />
              <button className="bg-red-600 py-3 my-6 rounded font-bold">
                {!isLoading ? "Sign In" : <BeatLoader color="black" />}
              </button>
              <p className="mb-6 text-sm text-red-400">{error && error}</p>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <p>
                  <input
                    type="checkbox"
                    className="mr-2 transform translate-y-[0.7px] accent-[red]"
                  />
                  Remember me
                </p>
                <p>Need Help?</p>
              </div>
              <p className="py-8">
                <span className="text-gray-400 mr-1">New to Moviex?</span>{" "}
                <Link className="hover:text-red-600" to="/signup">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
