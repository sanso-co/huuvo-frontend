export interface FilterCategoryType {
    _id: string;
    id: number;
    name: string;
    original_name: string;
    rank: number;
}

export interface OptionType {
    name: string;
    _id: string;
}

export interface FilterType {
    keyword?: OptionType[];
    genre?: OptionType;
    tone?: OptionType;
}

// export interface FilterType {
//     keyword?: OptionType[];
//     genre?: OptionType;
//     tone?: OptionType;
// }

export interface FilterParamType {
    keyword?: string;
    genre?: string;
    tone?: string;
}
