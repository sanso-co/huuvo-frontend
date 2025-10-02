import { FeelingKey } from "@/pages/Home/hook/useRecommend";
import { feelingDescriptions, feelings } from "./sampleData/feelingSuggestions";
import { intents } from "./sampleData/intentSuggestions";

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

export const getIntentLabel = (intentValue: FeelingKey | ""): string => {
    const intent = intents.find((i) => i.value === intentValue);
    if (!intent) return "";

    return `${intent.emoji} ${intent.label}`;
};
