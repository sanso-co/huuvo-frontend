import { Show } from "./show";

export interface ResultsResponse {
    page: number;
    results: Show[];
    total_pages: number;
    total_results: number;
}
