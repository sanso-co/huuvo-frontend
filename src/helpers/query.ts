import queryString from "query-string";

import { FilterType } from "@/types/filter";
import { ItemType } from "@/types/filter";
import { KeywordType } from "@/types/showDetail";
import { useFilterStore } from "@/store/useFilterStore";

// export const parseFiltersFromQuery = (
//     parsed: queryString.ParsedQuery<string>,
//     keywordList: KeywordType[],
//     genres: ItemType[] | undefined,
//     tones: ItemType[] | undefined
// ): FilterType => {
//     return {
//         keywords: (parsed.keyword || "")
//             .toString()
//             .split(",")
//             .filter(Boolean)
//             .map((label) => {
//                 const keyword = keywordList?.find((k) => k.name === label);
//                 return {
//                     label: label,
//                     value: keyword?._id || label,
//                 };
//             }),
//         genre: parsed.genre
//             ? {
//                   label: genres?.find((g) => g._id === parsed.genre)?.name || String(parsed.genre),
//                   value: String(parsed.genre),
//               }
//             : undefined,
//         tone: parsed.tone
//             ? {
//                   label: tones?.find((t) => t._id === parsed.tone)?.name || String(parsed.tone),
//                   value: String(parsed.tone),
//               }
//             : undefined,
//     };
// };

export const parseFiltersFromQuery = (
    parsed: queryString.ParsedQuery<string>,
    keywordList: KeywordType[]
) => {
    console.log("here");
    return {
        keywords: parsed.keyword
            ? parsed.keyword
                  .toString()
                  .split(",")
                  .filter(Boolean)
                  .map((name) => {
                      const keyword = keywordList?.find((keyword) => keyword.name === name);
                      return {
                          name: name,
                          _id: keyword?._id,
                      };
                  })
            : undefined,
        genre: undefined,
        tone: undefined,
    };
};

export const buildQueryString = (page: number, filters: FilterType): string => {
    return queryString.stringify({
        page,
        keyword: filters.keywords?.map((k) => k._id).join(","),
        genre: filters.genre?._id,
        tone: filters.tone?._id,
    });
};
