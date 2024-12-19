import { formatName } from "./formatName";

interface HeaderData {
    name?: string;
    job?: string;
    profile_path?: string;
}

export const getHeaderTitle = (
    categoryType: string,
    data?: HeaderData,
    categoryName?: string,
    categoryId?: string
) => {
    switch (categoryType) {
        case "crew":
            return `${data?.name || ""} (${data?.job || ""})`;
        case "cast":
            return data?.name || "";
        case "year":
            return categoryId || "";
        default:
            return formatName(categoryName || "");
    }
};

export const getHeaderDescription = (
    categoryType: string,
    data?: HeaderData,
    categoryName?: string,
    categoryId?: string
) => {
    switch (categoryType) {
        case "provider":
            return `Dramas streaming on ${formatName(categoryName || "")}`;
        case "cast":
            return `Dramas starring ${data?.name || ""}`;
        case "crew":
            return `Dramas created by ${data?.name || ""}`;
        case "year":
            return `Dramas relased in year ${categoryId}`;
        case "genre":
            return `Dramas in the genre ${formatName(categoryName || "")}`;
        default:
            return `Dramas with the ${categoryType} ${formatName(categoryName || "")}`;
    }
};
