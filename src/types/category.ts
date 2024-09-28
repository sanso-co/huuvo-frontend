import { LeanShowType, Show } from "./show";

export type CategoryType = "keyword" | "year" | "genre" | "credit" | "provider" | "person";

export interface CategoryResponse {
    page: number;
    total_pages: number;
    results: Show[];
}

export interface CategoryCollectionResponse {
    id: number;
    name: string;
    original_name: string;
    shows: {
        page: number;
        totalPages: number;
        results: LeanShowType[];
    };
}
