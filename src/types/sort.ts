import { SortOrderEnum } from "@/helpers/constants/options";

export interface OptionType {
    name: string;
    value: SortOrderEnum;
}

export type SortType = "name_asc" | "original_name_asc" | "date_asc" | "date_desc";
