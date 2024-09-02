import { useParams } from "react-router-dom";

import { useDetails } from "@/hooks/api/details/useDetails";
import { useTrailerVideo } from "@/hooks/api/details/useTrailerVideo";
import { useProviders } from "@/hooks/api/details/useProviders";
import { useKeywords } from "@/hooks/api/details/useKeywords";
import { useKeywordList } from "@/hooks/api/keyword/useKeywordList";
import { useCrew } from "@/hooks/api/credit/useCrew";
import { useCast } from "@/hooks/api/credit/useCast";

import { ImageContainer } from "@/components/global/ImageContainer";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Info } from "@/features/Details/Info";
import { Cast } from "@/features/Details/Cast";
import { Crew } from "@/features/Details/Crew";
import { Keyword } from "@/features/Details/Keyword";
import { Provider } from "@/features/Details/Provider";

const Details = () => {
    const { id } = useParams();
    const { currentShow, error, loading } = useDetails(id as string);
    const { trailer, loading: trailerLoading, error: trailerError } = useTrailerVideo(id as string);
    const { providers, loading: providerLoading, error: providerError } = useProviders(id as string);

    const { keywords, loading: keywordLoading, error: keywordError } = useKeywords(id as string);
    const { keywordsList } = useKeywordList();

    const filteredKeywords =
        !keywordLoading && !keywordError && keywords && keywordsList
            ? keywords.results.filter((keyword) =>
                  keywordsList.some((customKeyword) => customKeyword.id === keyword.id && customKeyword.name === keyword.name)
              )
            : undefined;

    const { cast } = useCast(id as string);
    const { crew } = useCrew(id as string);

    return (
        <div>
            {loading ? (
                <div>loading</div>
            ) : error ? (
                <div>error</div>
            ) : (
                <div>
                    <ImageContainer
                        src={getCroppedImageUrl(currentShow?.poster_path, false)}
                        ratio={ratio.portrait_23}
                        video={!trailerLoading && !trailerError ? trailer?.results : undefined}
                    />
                    <Info data={currentShow} />
                    {!providerLoading && !providerError && <Provider data={providers} />}
                    {filteredKeywords && filteredKeywords.length && <Keyword data={filteredKeywords} />}
                    {cast && cast.length && <Cast data={cast} />}
                    {crew && crew.length && <Crew data={crew} />}
                </div>
            )}
        </div>
    );
};

export default Details;
