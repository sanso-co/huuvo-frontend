import { Link } from "react-router-dom";

import { Show } from "@/helpers/interface/show";
import styled from "@emotion/styled";
import { formatDate } from "@/helpers/date";

interface Props {
  data: Partial<Show> | null;
}

export const Info = ({ data }: Props) => {
  return (
    <Container>
      <h1>{data?.name}</h1>
      <Content>
        <div className="top">
          <p className="caption">{data?.original_name}</p>
          <p className="caption">{formatDate(data?.first_air_date)}</p>
        </div>
        <ul>
          {data?.genres?.map((genre) => (
            <li key={genre.id} className="caption">
              <Link to={`/genres/${genre.id}`}>{genre.name}</Link>
            </li>
          ))}
        </ul>
        <p className="overview">{data?.overview}</p>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 1rem 0;
`;

const Content = styled.div`
  border-bottom: 1px solid #e5e5e5;
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

  .overview {
    padding: 1rem 0;
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
