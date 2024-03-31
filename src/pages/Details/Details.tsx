import { useParams } from "react-router-dom";
import { useGetDetails, useGetKeywordList, useGetKeywords, useGetVideo } from "@/hooks/api/details/useGetDetails";
import styled from "@emotion/styled";
import { ImageContainer } from "@/components/global/containers/ImageContainer";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";
import Chips from "@/components/global/Chip";
import { Keyword } from "@/helpers/interface/keyword";
import { Stack } from "@/components/global/containers/Stack";
import { formatDate } from "@/helpers/date";

const Details = () => {
  const { id } = useParams();
  const { data, error, loading } = useGetDetails(id as string);
  const { data: keywords } = useGetKeywords(id as string);
  const { data: keywordList } = useGetKeywordList();
  const filteredKeywords = keywords?.results.filter((keyword) =>
    keywordList?.results.some((customKeyword) => customKeyword.id === keyword.id && customKeyword.name === keyword.name)
  );
  const { data: video } = useGetVideo(id as string);

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
                      {genre.name}
                    </li>
                  ))}
                </ul>
              </Info>
              <p>{data?.overview}</p>
            </DetailsContainer>

            {filteredKeywords && filteredKeywords.length > 0 && (
              <Stack border gap={1} padding={2}>
                <h3>Keywords</h3>
                <Keywords>
                  {filteredKeywords?.map((keyword: Keyword) => (
                    <Chips key={keyword.id} label={keyword.name} />
                  ))}
                </Keywords>
              </Stack>
            )}
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

const Keywords = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export default Details;
