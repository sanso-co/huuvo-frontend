import { LeanShowType } from "./show";

export type CategoryType = "genre" | "year" | "provider" | "keyword" | "cast" | "crew";

export interface CategoryCollectionResponse {
    id: number;
    name: string;
    original_name: string;
    img_path?: string;
    job?: string;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    totalDocs: number;
    page: number;
    totalPages: number;
    results: LeanShowType[];
}
