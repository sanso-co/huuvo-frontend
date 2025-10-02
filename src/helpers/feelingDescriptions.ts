import { feelingDescriptions, feelings } from "./sampleData/feelingSuggestions";
import { intents } from "./sampleData/intentSuggestions";

export const getFeelingDescription = (feelingValue: string | ""): string => {
    return (
        feelingDescriptions[feelingValue as keyof typeof feelingDescriptions] ||
        "Curated stories perfect for your mood"
    );
};

export const getFeelingLabel = (feelingValue: string | ""): string => {
    const feeling = feelings.find((f) => f.value === feelingValue);
    if (!feeling) return "";

    return `${feeling.emoji} ${feeling.label}`;
};

export const getIntentLabel = (intentValue: string | ""): string => {
    const intent = intents.find((i) => i.value === intentValue);
    if (!intent) return "";

    return `${intent.emoji} ${intent.label}`;
};
