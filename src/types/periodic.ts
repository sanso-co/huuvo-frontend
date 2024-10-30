import { LeanShowType } from "./show";

export interface PeriodicType {
    releaseDate: string;
    shows: LeanShowType[];
}

export interface LatestPeriodic {
    _id: string;
    name: string;
    description: string;
    frequency: string;
    list: {
        releaseDate: string;
        shows: LeanShowType[];
    };
}
