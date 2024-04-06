export interface Show {
  id: number;
  name: string;
  original_name: string;
  poster_path: string;
  first_air_date: string;
  overview: string;
  genres: [
    {
      id: number;
      name: string;
    }
  ];
}

export interface Video {
  official: boolean;
  site: string;
  key: string;
}
