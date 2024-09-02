import { CustomKeywordType } from "@/types/keyword";
import { KeywordType } from "@/types/showDetail";

interface Keywords {
    id: number;
    results: KeywordType[];
}

export function filterKeywords(keywordsList: CustomKeywordType[], keywords: Keywords): KeywordType[] {
    const keywordsListIds = new Set(keywordsList.map((item) => item.id));
    return keywords.results.filter((keyword) => keywordsListIds.has(keyword.id));
}
