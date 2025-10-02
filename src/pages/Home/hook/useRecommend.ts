import { useState } from "react";
import { feelingSuggestions } from "@/helpers/sampleData/feelingSuggestions";
import { LeanShowType } from "@/types/show";
import { apiService } from "@/services/api";

const useRecommend = () => {
    const [selectedFeeling, setSelectedFeeling] = useState<string | "">("");
    const [resultFeeling, setResultFeeling] = useState<string | "">("");
    const [resultIntent, setResultIntent] = useState<string | "">("");
    const [sampleIndex, setSampleIndex] = useState(0);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [recommendResults, setRecommendResults] = useState<LeanShowType[]>([]);

    const updateInputFromIndex = (feeling: string, index: number) => {
        const suggestions = feelingSuggestions[feeling];
        if (suggestions && suggestions.length > 0) {
            const nextSentence = suggestions[index % suggestions.length];
            setInputValue(nextSentence);
        }
    };

    const handleFeelingChange = (value: string) => {
        setSelectedFeeling(value);
        setSampleIndex(0);
        setInputValue("");
    };

    const handleRefreshSample = () => {
        if (!selectedFeeling) return;
        const nextIndex = sampleIndex + 1;
        setSampleIndex(nextIndex);
        updateInputFromIndex(selectedFeeling, nextIndex);
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        setRecommendResults([]);
        setResultFeeling(selectedFeeling);
        console.log({
            feeling: selectedFeeling,
            question: inputValue,
        });
        try {
            const results = await apiService.submitUserEmotions({
                feeling: selectedFeeling,
                question: inputValue,
            });
            setRecommendResults(results.items);
            setResultIntent(results.intent);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        selectedFeeling,
        resultFeeling,
        inputValue,
        isLoading,
        recommendResults,
        resultIntent,
        handleFeelingChange,
        handleRefreshSample,
        setInputValue,
        handleSubmit,
        setResultIntent,
    };
};

export default useRecommend;
