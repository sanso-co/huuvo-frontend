import { LeanShowType } from "./show";

export interface Permanent {
    _id?: string;
    name: string;
    description?: string;
    shows: {
        result: LeanShowType[];
        page: number;
        totalPages: number;
        totalDocs: number;
    };
}
