import { Show } from "./show";

export interface Periodic {
    _id: string;
    name: string;
    description: string;
    frequency: string;
    lists: {
        releaseDate: string;
        shows: Show[];
    }[];
}
