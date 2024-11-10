import { useCategory } from "@/hooks/api/category/useCategory";
import { useCredit } from "./credit/useCredit";
import { useProvider } from "./collection/useProviderCollection";
import { CategoryCollectionResponse, CategoryType } from "@/types/category";
import { usePerson } from "./credit/usePerson";

type HookTypes = {
    [K in CategoryType]: (
        category: string,
        id: string,
        page: number
    ) => {
        getCollection: () => Promise<CategoryCollectionResponse | null>;
        isLoading: boolean;
        error: Error | null;
        categoryCollection: CategoryCollectionResponse | null;
    };
};

export const useCategoryData = (categoryType: CategoryType, id: string, page: number) => {
    const hooks: HookTypes = {
        keyword: useCategory,
        year: useCategory,
        genre: useCategory,
        credit: useCredit,
        provider: useProvider,
        person: usePerson,
    };

    const selectedHook = hooks[categoryType];

    if (!selectedHook) {
        throw new Error(`Unsupported category type: ${categoryType}`);
    }

    const { categoryCollection, isLoading } = selectedHook(categoryType, id, page);

    return {
        categoryCollection,
        isLoading,
    };
};
