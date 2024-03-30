import styled from "@emotion/styled";

import { Show } from "@/helpers/interface/show";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Card } from "@/components/global/cards";

interface Props {
  show: Show;
  url?: string;
  liked?: boolean;
}

export const ShowCard = ({ show, url }: Props) => {
  return (
    <div>
      <a href={`${url}`}>
        <Card width="152px">
          <Card.Image src={getCroppedImageUrl(show.poster_path, true)} ratio={ratio.portrait_23} rounded="0.75rem" />
          <Details>
            <p>{show.name}</p>
          </Details>
        </Card>
      </a>
    </div>
  );
};

const Details = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 42px;

  p {
    height: 50%;
  }
`;
