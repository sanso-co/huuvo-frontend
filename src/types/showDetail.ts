export interface DetailResponse {
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
}

export interface KeywordsResponse {
    id: number;
    results: KeywordType[];
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
