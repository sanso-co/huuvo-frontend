import { Drama } from "./show";

export interface Provider {
    _id?: string;
    name: string;
    description?: string;
    shows: {
        result: Drama[];
        page: number;
        totalPages: number;
        totalDocs: number;
    };
}
