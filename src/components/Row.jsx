import { BeatLoader } from "react-spinners";

function Row({ title, fetchFunction }) {
  const { isPending: isMoviesLoading, data: movies } = fetchFunction();

  console.log(movies, title);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center">
        <div id={`slider`}>
          {isMoviesLoading && <BeatLoader color="red" />}
          {movies
            ?.filter((item) => item.backdrop_path)
            ?.map((item, id) => (
              <div
                className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer"
                key={item.id}
              >
                <img
                  src={`https://image.tmdb.org/t/p/original/${item.backdrop_path}`}
                  alt=""
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Row;
