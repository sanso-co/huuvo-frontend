import { useGetHeroes } from "@/hooks/api/marketing/useHero";
import { usePeriodicCollection } from "@/hooks/api/collection/usePeriodicCollection";
import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { useGetShow } from "@/hooks/api/show/useShow";

import { collectionId } from "@/helpers/constants/collectionId";
import { SortOrderEnum } from "@/helpers/constants/options";

const useHomeData = () => {
    const { heroes, isLoading: isHeroLoading, error: heroError } = useGetHeroes();

    const { data: trending } = usePeriodicCollection(collectionId.TRENDING_NOW || "", "latest");
    const { data: upcoming } = useGetShow(1, 10, SortOrderEnum.Newest);
    const { data: viewersChoice } = useGetPermanentDetails(collectionId.VIEWERS_CHOICE || "", 1, {
        forceLimit: 10,
    });
    const { data: genreFiction } = useGetPermanentDetails(collectionId.GENRE_FICTION || "", 1, {
        forceLimit: 10,
    });

    return { heroes, isHeroLoading, heroError, trending, upcoming, viewersChoice, genreFiction };
};

export default useHomeData;
