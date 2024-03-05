import { useState } from "react";
import { useGetPopularMovies } from "../api/react-queries";
import { truncateString } from "../utils/helpers";
import { BeatLoader } from "react-spinners";

function Main() {
  const [randomMovie, setRandomMovie] = useState("");

  const { isPending: isPopularMoviesLoading, data: popularMovies } =
    useGetPopularMovies();

  if (popularMovies && !randomMovie)
    setRandomMovie(
      popularMovies[Math.floor(Math.random() * popularMovies.length)]
    );

  return isPopularMoviesLoading ? (
    <div className="text-white w-full h-[550px] flex justify-center items-center">
      <BeatLoader color="red" />
    </div>
  ) : (
    <div className="text-white w-full h-[550px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[550px] bg-gradient-to-r from-black "></div>
        <img
          className="w-full h-full object-cover object-top"
          src={`https://image.tmdb.org/t/p/original/${randomMovie?.backdrop_path}`}
          alt="movie images"
        />
        <div className="absolute w-full top-[20%] p-4 md:p-8">
          <h1 className="text-3xl md:text-5xl font-bold">
            {randomMovie.title}
          </h1>
          <div className="flex gap-4 my-4">
            <button className="border bg-gray-300 text-black border-gray-300 py-2 px-5">
              Play
            </button>
            <button className="border text-white border-gray-300 py-2 px-5">
              Watch Later
            </button>
          </div>
          <p className="text-gray-400 text-sm mb-1">
            Released: {randomMovie.release_date}
          </p>
          <p className="w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200">
            {truncateString(randomMovie.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
}
export default Main;
