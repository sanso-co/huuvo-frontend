import { FeelingKey } from "@/pages/Recommend/hook/useRecommend";
import { feelingDescriptions, feelings } from "./sampleData/feelingSuggestions";

export const getFeelingDescription = (feelingValue: FeelingKey | ""): string => {
    return (
        feelingDescriptions[feelingValue as keyof typeof feelingDescriptions] ||
        "Curated stories perfect for your mood"
    );
};

export const getFeelingLabel = (feelingValue: FeelingKey | ""): string => {
    const feeling = feelings.find((f) => f.value === feelingValue);
    if (!feeling) return "";

    return `${feeling.emoji} ${feeling.label}`;
};
