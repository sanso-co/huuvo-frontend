import { LeanShowType } from "./show";

export interface IUserShowStatus {
    showId: string | null;
    liked: boolean;
    watched: boolean;
    bookmarked: boolean;
}

export type IUserShowCategory = "liked" | "watched" | "bookmarked";

export interface IUserShowCounts {
    liked: {
        count: number;
        shows: LeanShowType[];
    };
    watched: number;
    bookmarked: {
        count: number;
        shows: LeanShowType[];
    };
}
