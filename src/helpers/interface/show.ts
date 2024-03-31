export interface Show {
  id: string;
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
