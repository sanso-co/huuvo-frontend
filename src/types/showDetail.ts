import { MinimalShowType } from "./show";

export interface DetailResponse {
    id: number;
    name: string;
    original_name: string;
    poster_path: {
        US: {
            path: string;
        };
        KR?: {
            path: string;
        };
    };
    first_air_date: string;
    overview: string;
    number_of_episodes?: number;
    related_seasons: {
        season: number;
        show: MinimalShowType;
    }[];
    genres?: [
        {
            id: number;
            name: string;
        }
    ];
    keywords?: [
        {
            id: number;
            name: string;
        }
    ];
    genre_ids?: [number];
    homepage?: string;
    networks?: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
    }[];
    production_companies?: {
        id: number;
        name: string;
        logo_path: string;
        origin_country: string;
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

export interface ProviderType {
    [key: string]: {
        link: string;
        flatrate: [
            {
                display_priority: number;
                logo_path: string;
                provider_id: number;
                provider_name: string;
            }
        ];
    };
}

export interface ProviderResponse {
    id: number;
    results: ProviderType;
}

export interface KeywordType {
    id: number;
    name: string;
    original_name: string;
    rank?: number;
}

export interface KeywordsResponse {
    id: number;
    results: KeywordType[];
}

export interface Credit {
    id: number;
    name: string;
    original_name: string;
    job: string;
}

export interface TrailerType {
    id: string;
    key: string;
    name: string;
    site: string;
    size: number;
    type: string;
}

export interface TrailerResponse {
    id: number;
    results: TrailerType[];
}
