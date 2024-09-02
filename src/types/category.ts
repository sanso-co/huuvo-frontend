import { Show } from "./show";

export interface CategoryResponse {
    page: number;
    total_pages: number;
    results: Show[];
}
