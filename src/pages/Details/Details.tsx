import { Link, useParams } from "react-router-dom";
import { useGetDetails, useGetKeywords, useGetProviders, useGetVideo } from "@/hooks/api/details/useGetDetails";
import { useGetCrew } from "@/hooks/api/credit/useGetCredit";
import { useGetKeywordList } from "@/hooks/api/keyword/useGetKeyword";
import styled from "@emotion/styled";
import { ImageContainer } from "@/components/global/containers/ImageContainer";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";
import Chips from "@/components/global/Chip";
import { Keyword } from "@/helpers/interface/keyword";
import { Stack } from "@/components/global/containers/Stack";
import { formatDate } from "@/helpers/date";
import { List } from "@/components/global/List";
import { Crew } from "@/helpers/interface/credit";

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
  const providerPath = providers?.results?.US?.flatrate[0].logo_path;

  return (
    <div>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <div>
          <ImageContainer src={getCroppedImageUrl(data?.poster_path, false)} ratio={ratio.portrait_23} video={video?.results} />
          <div className="p-1">
            <DetailsContainer>
              <h1>{data?.name}</h1>
              <Info>
                <div className="top">
                  <p className="caption">{data?.original_name}</p>
                  <p className="caption">{formatDate(data?.first_air_date)}</p>
                </div>
                <ul>
                  {data?.genres.map((genre) => (
                    <li key={genre.id} className="caption">
                      <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
                    </li>
                  ))}
                </ul>
              </Info>
              {providers && Object.keys(providers.results).length !== 0 && (
                <Network>
                  <img src={`https://media.themoviedb.org/t/p/original/${providerPath}`} alt="" />
                  <p>provided by JustWatch</p>
                </Network>
              )}
              <p>{data?.overview}</p>
            </DetailsContainer>

            {filteredKeywords && filteredKeywords.length > 0 && (
              <Stack border gap={1} padding={2}>
                <h3>Keywords</h3>
                <Keywords>
                  {filteredKeywords?.map((keyword: Keyword) => (
                    <Chips key={keyword.id} label={keyword.name} url={`/keywords/${keyword.id}`} />
                  ))}
                </Keywords>
              </Stack>
            )}
            <Stack border gap={1} padding={2}>
              <h3>Credits</h3>
              <List
                items={
                  credit?.results.map((crew: Crew) => ({
                    id: crew.id,
                    key: crew.jobs[0].job,
                    value: crew.name,
                  })) || []
                }
              />
            </Stack>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailsContainer = styled.div`
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 2rem;
`;

const Info = styled.div`
  padding: 1rem 0;

  .top {
    display: flex;

    p {
      &:not(:last-child)::after {
        content: "•";
        margin: 0 0.25rem;
      }
    }
  }

  ul {
    display: flex;
  }

  li {
    margin-right: 0.25rem;

    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }

    &:not(:last-child)::after {
      content: ", ";
    }
  }
`;

const Network = styled.div`
  padding-bottom: 1rem;

  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }

  p {
    font-size: 0.75rem;
  }
`;

const Keywords = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default Details;
