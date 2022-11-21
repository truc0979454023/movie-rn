import axois from 'axios';

const apiUrl = 'https://api.themoviedb.org/3/';
const apiKey = 'api_key=e9e9d8da18ae29fc430845952232787c';

export const getPopularMovies = async () => {
  const res = await axois.get(`${apiUrl}/movie/popular?${apiKey}`);
  return res.data.results;
};

export const getUpcomingMovies = async () => {
  const res = await axois.get(`${apiUrl}/movie/upcoming?${apiKey}`);
  return res.data.results;
};

export const getFamilyMovies = async () => {
  const res = await axois.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=10751`,
  );
  return res.data.results;
};

export const getDocumentaryMovies = async () => {
  const res = await axois.get(
    `${apiUrl}/discover/movie?${apiKey}&with_genres=99`,
  );
  return res.data.results;
};

export const getPopularTV = async () => {
  const res = await axois.get(`${apiUrl}/tv/popular?${apiKey}`);
  return res.data.results;
};

export const getMovieById = async id => {
  const res = await axois.get(`${apiUrl}/movie/${id}?${apiKey}`);
  return res.data;
};

export const searchMovieTV = async (query, type) => {
  const res = await axois.get(
    `${apiUrl}/search/${type}?${apiKey}&query=${query}`,
  );
  return res.data.results;
};
