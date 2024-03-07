import { useParams } from "react-router-dom";
import { useGetMovieInfo, useGetMovieVideos } from "../api/react-queries";
import { useEffect, useRef } from "react";

function MoviePage() {
  const { id } = useParams();
  const { isPending: isMovieInfoLoading, data: movieInfo } =
    useGetMovieInfo(id);
  const { isPending: isMovieVideosLoading, data: movieVideos } =
    useGetMovieVideos(id);
  console.log(movieInfo);
  console.log(movieVideos);

  // Створюємо посилання на верхній елемент сторінки
  const topRef = useRef(null);

  // Звертаємо фокус на верхній елемент при завантаженні компонента
  useEffect(() => {
    if (topRef.current) {
      topRef.current.focus();
    }
  }, []);

  return (
    <>
      <div className="text-white w-full h-[550px]">
        <div className="w-full h-full">
          <div className="absolute w-full h-[550px] bg-gradient-to-r from-black "></div>
          <img
            className="w-full h-full object-cover object-top"
            src={`https://image.tmdb.org/t/p/original/${movieInfo?.backdrop_path}`}
            alt="movie images"
          />
          <div
            ref={topRef} // Додаємо посилання на верхній елемент
            className="absolute w-full top-[20%] p-4 md:p-8 focus:outline-none"
            tabIndex={-1} // Дозволяємо елементу отримувати фокус
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-10">
              {movieInfo?.title}
            </h1>

            <p className="text-gray-400 text-sm mb-1">
              Released: {movieInfo?.release_date}
            </p>
            <p className="w-full md:max-w-[70%] lg:max-w-[35%] text-gray-200">
              {movieInfo?.overview}
            </p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-10 mb-10">
        <iframe
          className="w-screen aspect-video mx-10"
          src={`https://www.youtube.com/embed/${movieVideos?.results[0].key}`}
          allow="acceleromete; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture; 
        web-share"
          allowFullScreen
        ></iframe>
      </div>
    </>
  );
}

export default MoviePage;
