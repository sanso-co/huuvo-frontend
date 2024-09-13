export interface Show {
    _id: string;
    id: string;
    name: string;
    original_name: string;
    first_air_date: string;
    poster_path: string;
    genre_ids: (string | number)[];
}

export interface ShowDetailsTaype {
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
