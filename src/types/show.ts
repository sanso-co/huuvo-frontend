export interface Show {
    _id?: string;
    id: string;
    name: string;
    original_name: string;
    first_air_date: string;
    poster_path: {
        US: {
            path: string;
        };
        KR: {
            path: string;
        };
    };
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
    genres: {
        id: number;
        name: string;
    }[];
    overview: string;
    first_air_date: string;
    number_of_episodes: number;
    homepage: string;
    networks: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    production_companies: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
}

export interface LeanShowType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    poster_path: {
        [key: string]: {
            path: string;
        };
    };
    first_air_date: string;
    popularity_score: number;
}

export interface MinimalShowType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    season_number: number;
}
