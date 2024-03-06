import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const key = import.meta.env.VITE_MOVIES_API_KEY;
const requests = {
  requestPopular: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestTopRated: `https://api.themoviedb.org/3/movie/top_rated?api_key=${key}&language=en-US&page=1`,
  requestTrending: `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  requestHorror: `https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=horror&page=1&include_adult=false`,
  requestUpcoming: `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&page=1`,
};

export function useGetPopularMovies() {
  return useQuery({
    queryKey: ["getPopularMovies"],
    queryFn: () =>
      axios.get(requests.requestPopular).then((res) => res.data.results),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
export function useGetUpcomingMovies() {
  return useQuery({
    queryKey: ["getUpcomingMovies"],
    queryFn: () =>
      axios.get(requests.requestUpcoming).then((res) => res.data.results),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
export function useGetTrendingMovies() {
  return useQuery({
    queryKey: ["getTrendingMovies"],
    queryFn: () =>
      axios.get(requests.requestTrending).then((res) => res.data.results),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
export function useGetTopRatedMovies() {
  return useQuery({
    queryKey: ["getTopRatedMovies"],
    queryFn: () =>
      axios.get(requests.requestTopRated).then((res) => res.data.results),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
export function useGetHorrorMovies() {
  return useQuery({
    queryKey: ["getHorrorMovies"],
    queryFn: () =>
      axios.get(requests.requestHorror).then((res) => res.data.results),
    staleTime: Infinity,
    cacheTime: Infinity,
  });
}
