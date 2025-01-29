import { OptionType } from "@/types/sort";

export enum SortOrderEnum {
    Alphabetical = "name_asc",
    KoreanAlphabetical = "original_name_asc",
    Oldest = "date_asc",
    Newest = "date_desc",
}

export const sortOptions: OptionType[] = [
    {
        value: SortOrderEnum.Newest,
        name: "Release Date (Newest)",
    },
    {
        value: SortOrderEnum.Oldest,
        name: "Release Date (Oldest)",
    },
    {
        value: SortOrderEnum.Alphabetical,
        name: "Alphabetical",
    },
];
