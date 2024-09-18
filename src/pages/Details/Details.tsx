import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";

import { useDetails } from "@/hooks/api/details/useDetails";
import { useTrailerVideo } from "@/hooks/api/details/useTrailerVideo";
import { useKeywords } from "@/hooks/api/details/useKeywords";
import { useKeywordList } from "@/hooks/api/keyword/useKeywordList";

import { ImageContainer } from "@/components/global/ImageContainer";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";
import { filterKeywords } from "@/helpers/filterKeywords";
import { getGenres } from "@/helpers/getIds";

import { Info } from "@/features/Details/Info";
import { Cast } from "@/features/Details/Cast";
import { Crew } from "@/features/Details/Crew";
import { Keyword } from "@/features/Details/Keyword";
import { Provider } from "@/features/Details/Provider";
import { Similar } from "@/features/Details/Similar";
import { getKeyword } from "@/helpers/getKeyword";

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const { data, error, isLoading } = useDetails(id as string);

    const {
        trailer,
        isLoading: trailerLoading,
        error: trailerError,
    } = useTrailerVideo(id as string);

    const { keywords } = useKeywords(id as string);
    const { keywordsList } = useKeywordList();

    const filteredKeywords = useMemo(() => {
        if (keywordsList && keywords) {
            return filterKeywords(keywordsList, keywords);
        }

        return null;
    }, [keywordsList, keywords]);

    const genreString = getGenres(data?.genres);
    const keywordString = getKeyword(filteredKeywords);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    return (
        <div>
            {isLoading ? (
                <div>loading</div>
            ) : error ? (
                <div>error</div>
            ) : (
                <div>
                    <ImageContainer
                        src={getCroppedImageUrl(data?.poster_path, false)}
                        ratio={ratio.portrait_23}
                        video={!trailerLoading && !trailerError ? trailer?.results : undefined}
                    />
                    <Info data={data} />
                    {data?.id && <Provider id={data.id} />}
                    {filteredKeywords && filteredKeywords.length > 0 && (
                        <Keyword data={filteredKeywords} />
                    )}
                    {data?.id && <Cast id={data.id} />}
                    {data?.id && <Crew id={data.id} />}
                    {data?.id && (
                        <Similar
                            id={data.id}
                            genreString={genreString}
                            keywordString={keywordString}
                        />
                    )}
                </div>
            )}
        </div>
    );
};

export default Details;
