import { useState } from "react";
import { feelingSuggestions, mockApiResponse } from "@/helpers/sampleData/feelingSuggestions";
import { LeanShowType } from "@/types/show";

export type FeelingKey = keyof typeof feelingSuggestions;

const useRecommend = () => {
    const [selectedFeeling, setSelectedFeeling] = useState<FeelingKey | "">("");
    const [sampleIndex, setSampleIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendResults, setRecommendResults] = useState<LeanShowType[]>([]);

    const updateInputFromIndex = (feeling: FeelingKey, index: number) => {
        const suggestions = feelingSuggestions[feeling];
        if (suggestions && suggestions.length > 0) {
            const nextSentence = suggestions[index % suggestions.length];
            setInputValue(nextSentence);
        }
    };

    const handleFeelingChange = (value: FeelingKey) => {
        setSelectedFeeling(value);
        setSampleIndex(0);
        // updateInputFromIndex(value, 0);
        setInputValue("");
    };

    const handleRefreshSample = () => {
        if (!selectedFeeling) return;
        const nextIndex = sampleIndex + 1;
        setSampleIndex(nextIndex);
        updateInputFromIndex(selectedFeeling, nextIndex);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setRecommendResults([]);

        // 실제 API call 자리에 setTimeout으로 simulate
        setTimeout(() => {
            setRecommendResults(mockApiResponse);
            setIsLoading(false);
            // 나중에 결과 처리 로직 추가 예정
        }, 2000); // 2초간 로딩
    };

    return {
        selectedFeeling,
        inputValue,
        isLoading,
        recommendResults,
        handleFeelingChange,
        handleRefreshSample,
        setInputValue,
        handleSubmit,
    };
};

export default useRecommend;
