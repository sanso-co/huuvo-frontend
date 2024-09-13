import { CustomKeywordType } from "@/types/keyword";

export const getKeyword = (keywords: CustomKeywordType[] | undefined | null): string => {
    if (!keywords || keywords.length === 0) {
        return "";
    }

    const highestRankedKeyword = keywords.reduce((highest, current) => {
        const highestRank = highest.rank ?? 999;
        const currentRank = current.rank ?? 999;

        return currentRank < highestRank ? current : highest;
    });

    return highestRankedKeyword.id.toString();
};
