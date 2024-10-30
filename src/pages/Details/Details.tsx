import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { useTMDBDetails } from "@/hooks/api/details/useTMDBDetails";
import { useDetails } from "@/hooks/api/details/useDetails";
import { useTrailerVideo } from "@/hooks/api/details/useTrailerVideo";
import { useKeywords } from "@/hooks/api/details/useKeywords";

import { ImageContainer } from "@/components/global/ImageContainerNatural";
import { getCroppedImageUrl, getKrImageUrl } from "@/services/image-url";

import { Info } from "@/features/Details/Info";
import { Cast } from "@/features/Details/Cast";
import { Crew } from "@/features/Details/Crew";
import { Keyword } from "@/features/Details/Keyword";
import { Provider } from "@/features/Details/Provider";
import { OriginalStory } from "@/features/Details/OriginalStory";
import { Recommendations } from "@/features/Details/Recommendations";

const Details = () => {
    const { id } = useParams<{ id: string }>();
    const { TMDBDetails } = useTMDBDetails(id as string);
    const { details, error, isLoading } = useDetails(Number(id));

    const {
        trailer,
        isLoading: trailerLoading,
        error: trailerError,
    } = useTrailerVideo(id as string);

    const { keywords } = useKeywords(Number(id));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    const getImageUrl = () => {
        if (details?.poster_path?.US?.path ?? "" !== "") {
            return getCroppedImageUrl(details?.poster_path.US.path);
        } else if (details?.poster_path?.KR?.path ?? "" !== "") {
            return getKrImageUrl(details?.poster_path?.KR?.path);
        } else {
            return "";
        }
    };

    return (
        <div>
            {isLoading ? (
                <div>loading</div>
            ) : error ? (
                <div>error</div>
            ) : (
                <div>
                    <ImageContainer
                        src={getImageUrl()}
                        video={!trailerLoading && !trailerError ? trailer?.results : undefined}
                    />
                    <Info data={details} />
                    {id && <Provider id={id} />}
                    {keywords && keywords.length > 0 && <Keyword data={keywords} />}
                    {/* {TMDBDetails?.id && <Cast id={TMDBDetails.id} />} */}
                    {id && <Cast id={id} />}
                    {id && <Crew id={id} />}
                    {details?.original_story && <OriginalStory data={details?.original_story} />}
                    <Recommendations showId={Number(details?.id)} />
                </div>
            )}
        </div>
    );
};

export default Details;
