import {
  useGetHorrorMovies,
  useGetPopularMovies,
  useGetTopRatedMovies,
  useGetTrendingMovies,
  useGetUpcomingMovies,
} from "../api/react-queries";
import Main from "../components/Main";
import Row from "../components/Row";

function Home() {
  return (
    <div className="text-white">
      <Main />
      <Row title="Up Coming" fetchFunction={useGetUpcomingMovies} />
      <Row title="Popular" fetchFunction={useGetPopularMovies} />
      <Row title="Trending" fetchFunction={useGetTrendingMovies} />
      <Row title="Top Rated" fetchFunction={useGetTopRatedMovies} />
      <Row title="Horror" fetchFunction={useGetHorrorMovies} />
    </div>
  );
}

export default Home;
