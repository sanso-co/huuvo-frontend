export interface Show {
  id: number;
  name: string;
  original_name: string;
  poster_path: string;
  first_air_date: string;
  overview: string;
  genres?: [
    {
      id: number;
      name: string;
    }
  ];
  genre_ids?: [number];
}

export interface Video {
  official: boolean;
  site: string;
  key: string;
}
