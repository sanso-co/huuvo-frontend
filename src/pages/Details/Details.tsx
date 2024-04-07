import { useParams } from "react-router-dom";
import { useGetDetails, useGetKeywords, useGetProviders, useGetVideo } from "@/hooks/api/details/useGetDetails";
import { useGetCast, useGetCrew } from "@/hooks/api/credit/useGetCredit";
import { useGetKeywordList } from "@/hooks/api/keyword/useGetKeyword";
import { ImageContainer } from "@/components/global/containers/ImageContainer";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Info } from "@/features/Details/Info";
import { Cast } from "@/features/Details/Cast";
import { Crew } from "@/features/Details/Crew";
import { Keyword } from "@/features/Details/Keyword";
import { Provider } from "@/features/Details/Provider";

const Details = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetDetails(id as string);
  const { data: providers } = useGetProviders(id as string);
  const { data: keywords } = useGetKeywords(id as string);
  const { data: keywordList } = useGetKeywordList();
  const filteredKeywords = keywords?.results.filter((keyword) =>
    keywordList?.results.some((customKeyword) => customKeyword.id === keyword.id && customKeyword.name === keyword.name)
  );
  const { data: video } = useGetVideo(id as string);
  const { data: credit } = useGetCrew(id as string);
  const { data: cast } = useGetCast(id as string);

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <div>
          <ImageContainer src={getCroppedImageUrl(data?.poster_path, false)} ratio={ratio.portrait_23} video={video?.results} />
          <Info data={data} />
          {providers && Object.keys(providers.results).length !== 0 && <Provider data={providers} />}
          {filteredKeywords && filteredKeywords.length > 0 && <Keyword data={filteredKeywords} />}
          {cast && cast.results.length > 0 && <Cast data={cast.results} />}
          {credit && credit.results.length > 0 && <Crew data={credit.results} />}
        </div>
      )}
    </div>
  );
};

export default Details;
