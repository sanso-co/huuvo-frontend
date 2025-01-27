import { LeanShowType } from "./show";

export interface IUserShowStatus {
    showId: string;
    liked: boolean;
    disliked: boolean;
    watched: boolean;
    bookmarked: boolean;
}

export type IUserShowCategory = "liked" | "disliked" | "watched" | "bookmarked";

export interface IUserShowCounts {
    liked: {
        count: number;
        shows: LeanShowType[];
    };
    disliked: number;
    watched: number;
    bookmarked: {
        count: number;
        shows: LeanShowType[];
    };
}
