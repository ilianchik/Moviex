import { useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

function Movie({ item }) {
  const [like, setLike] = useState(false);
  const [saved, setSaved] = useState();
  const { user } = UserAuth();

  const userID = doc(db, "users", `${user?.email}`);

  async function saveShow() {
    if (user?.email) {
      setLike((like) => !like);
      setSaved(true);
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

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`}
        alt={item.title}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center text-center h-full">
          {item?.title}
        </p>
        <p onClick={saveShow} className="absolute top-3 left-3 text-gray-300">
          {like ? <FaHeart /> : <FaRegHeart />}
        </p>
      </div>
    </div>
  );
}

export default Movie;
