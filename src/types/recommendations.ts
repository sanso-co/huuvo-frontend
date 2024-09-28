import { LeanShowType } from "./show";

export interface RecommendationsResponse {
    _id: string;
    id: number;
    details: string;
    shows: LeanShowType[];
}
