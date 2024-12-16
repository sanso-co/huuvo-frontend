import { GenreType, KeywordType, ToneType } from "./showDetail";

export interface MinimalShowType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    season_number: number;
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

export interface ShowType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    poster_path: {
        [key: string]: {
            path: string;
        };
    };
    trailer: {
        site: string;
        key: string;
    }[];
    genres: GenreType[];
    keywords: KeywordType[];
    tones: ToneType[];
    overview: string;
    original_overview?: string;
    first_air_date: string;
    number_of_episodes: number;
    season_number: number;
    related_seasons: {
        season: number;
        show: MinimalShowType;
    }[];
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
    created_by: {
        id: number;
        name: string;
        original_name: string;
    }[];
    original_story?: {
        title: {
            title: string;
            korean_title: string;
        };
        author: {
            name: string;
            korean_name: string;
        };
    };
}
