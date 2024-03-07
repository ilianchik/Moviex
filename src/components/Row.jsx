import { BeatLoader } from "react-spinners";
import Movie from "./Movie";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useRef } from "react";
import { scroll } from "../utils/helpers";
function Row({ title, fetchFunction }) {
  const { isPending: isMoviesLoading, data: movies } = fetchFunction();

  const sliderRef = useRef();
  console.log(movies);
  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">{title}</h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={() => scroll("left", sliderRef.current, 900)}
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 z-10 text-black cursor-pointer hidden left-0 group-hover:block"
        />
        <div
          id={`slider`}
          ref={sliderRef}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {isMoviesLoading && <BeatLoader color="red" />}
          {movies
            ?.filter((item) => item.backdrop_path)
            ?.map((item) => (
              <Movie item={item} key={item.id} />
            ))}
        </div>
        <MdChevronRight
          onClick={() => scroll("right", sliderRef.current, 900)}
          size={40}
          className="bg-white rounded-full absolute opacity-50 hover:opacity-100 z-10 text-black cursor-pointer hidden right-0 group-hover:block"
        />
      </div>
    </>
  );
}

export default Row;
