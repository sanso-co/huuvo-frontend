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

export interface LatestPeriodic {
    _id: string;
    name: string;
    description: string;
    frequency: string;
    list: {
        releaseDate: string;
        shows: Show[];
    };
}
