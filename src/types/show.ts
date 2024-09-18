export interface Show {
    _id?: string;
    id: string;
    name: string;
    original_name: string;
    first_air_date: string;
    poster_path: string;
    genre_ids: (string | number)[];
}

export interface Drama {
    id: number;
    name: string;
    original_name: string;
    poster_path: {
        [key: string]: {
            path: string;
        };
    };
    first_air_date: string;
    genres: {
        id: number;
        name: string;
    }[];
    number_of_episodes?: number;
}
