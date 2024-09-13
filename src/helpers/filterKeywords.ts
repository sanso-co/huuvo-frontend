import { CustomKeywordType } from "@/types/keyword";
import { KeywordType } from "@/types/showDetail";

interface Keywords {
    id: number;
    results: KeywordType[];
}

export function filterKeywords(
    keywordsList: CustomKeywordType[],
    keywords: Keywords
): CustomKeywordType[] {
    const keywordsResultIds = new Set(keywords.results.map((keyword) => keyword.id));
    return keywordsList.filter((keyword) => keywordsResultIds.has(keyword.id));
}
