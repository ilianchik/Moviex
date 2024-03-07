import { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Movie({ item }) {
  const [like, setLike] = useState(false);

  const { user } = UserAuth();

  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    onSnapshot(doc(db, "users", `${user?.email}`), (doc) =>
      setMovies(doc.data()?.savedMovies)
    );
  }, [user?.email]);

  useEffect(() => {
    const isMovieSaved = movies?.some((movie) => movie.id === item.id);
    setLike(isMovieSaved);
  }, [movies, item.id]);

  const userID = doc(db, "users", `${user?.email}`);

  async function saveShow() {
    if (user?.email) {
      setLike(true);

      await updateDoc(userID, {
        savedMovies: arrayUnion({
          id: item.id,
          title: item.title,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  }
  const movieRef = doc(db, "users", `${user?.email}`);
  async function deleteShow(id) {
    try {
      const result = movies.filter((item) => item.id !== id);
      await updateDoc(movieRef, { savedMovies: result });
      setMovies(result);
      setLike(false);
    } catch (error) {
      throw Error;
    }
  }

  return (
    <div
      onClick={() => navigate(`/movie/${item.id}`)}
      className="w-[190px] sm:w-[230px] md:w-[250px] lg:w-[310px] inline-block cursor-pointer relative p-2"
    >
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full">
          {item?.title}
        </p>

        {!like ? (
          <p onClick={saveShow} className="absolute top-3 left-3 text-gray-300">
            <FaRegHeart />
          </p>
        ) : (
          <p
            onClick={() => deleteShow(item.id)}
            className="absolute top-3 left-3 text-gray-300"
          >
            <FaHeart />
          </p>
        )}
      </div>
    </div>
  );
}

export default Movie;
