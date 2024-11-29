import { FilterCategoryType, OptionType } from "@/types/filter";

export const itemOptions = (items: (FilterCategoryType | undefined)[]) => {
    return (items || [])
        .map((item) => ({
            name: item?.name,
            _id: item?._id,
        }))
        .filter((item): item is OptionType => item.name !== undefined && item._id !== undefined);
};
