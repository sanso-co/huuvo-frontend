export interface KeywordType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    rank: number;
}

export interface GenreType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    rank: number;
}

export interface ToneType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    rank: number;
}

export interface TrailerTypeTMDB {
    key: string;
    site: string;
}

export interface TrailerResponseTMDB {
    id: number;
    results: TrailerTypeTMDB[];
}

export interface CreditType {
    id: number;
    name: string;
    original_name: string;
    job: string;
}
