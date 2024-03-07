import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import { scroll } from "../utils/helpers";
import { UserAuth } from "../context/AuthContext";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { AiOutlineClose } from "react-icons/ai";

function SavedShows() {
  const [movies, setMovies] = useState([]);
  const sliderRef = useRef();

  const { user } = UserAuth();

  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) =>
      setMovies(doc.data()?.savedMovies)
    );
  }, [user?.email]);

  const movieRef = doc(db, "users", `${user?.email}`);
  async function deleteShow(id) {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(movieRef, { savedMovies: result });
    } catch (error) {
      throw Error;
    }
  }

  return (
    <>
      <h2 className="text-white font-bold md:text-xl p-4">Saved Movies</h2>
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
          {movies
            ?.filter((item) => item.img)
            ?.map((item) => (
              <div
                key={item.id}
                className="w-[190px] sm:w-[230px] md:w-[250px] lg:w-[310px] inline-block cursor-pointer relative p-2"
              >
                <img
                  className="w-full h-auto block"
                  src={`https://image.tmdb.org/t/p/w500/${item?.img}`}
                  alt={item.title}
                />
                <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
                  <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full">
                    {item?.title}
                  </p>
                  <p
                    onClick={() => deleteShow(item.id)}
                    className="absolute text-gray-300 top-3 left-3 hover:text-[red]"
                  >
                    <AiOutlineClose />
                  </p>
                </div>
              </div>
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

export default SavedShows;
