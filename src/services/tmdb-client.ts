import axios from "axios";

// const TMDB_KEY = process.env.REACT_APP_API;
const TMDB_KEY = import.meta.env.VITE_TMDB_KEY;
const URL = "https://api.themoviedb.org/3";

export default axios.create({
  baseURL: URL,
  params: {
    api_key: TMDB_KEY,
  },
});
