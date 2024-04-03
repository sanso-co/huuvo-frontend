import useTMDBGet from "../useTMDBData";

export interface Genre {
  id: number;
  name: string;
}

export const useGetGenresList = () =>
  useTMDBGet("/genre/tv/list?language=en", (data) => ({
    results: data.genres as Genre[],
  }));
