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
    const { data: highlyRated } = useGetPermanentDetails(collectionId.HIGHLY_RATED || "", 1, {
        forceLimit: 10,
    });

    return { heroes, isHeroLoading, heroError, trending, upcoming, highlyRated };
};

export default useHomeData;
