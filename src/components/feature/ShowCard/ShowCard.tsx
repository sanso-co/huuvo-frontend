import { useGeneralStore } from "@/store/useStore";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";

import { Show } from "@/types/show";
import { getCroppedImageUrl } from "@/services/image-url";
import { ratio } from "@/components/token";

import { Card } from "@/components/global/cards";

interface Props {
  show: Show;
  url?: string;
  liked?: boolean;
}

export const ShowCard = ({ show, url }: Props) => {
  const [title, setTitle] = useState<string>(show.name);
  const language = useGeneralStore((state) => state.language);

  // kr or en
  useEffect(() => {
    setTitle(language === "kr" ? show.original_name || show.name : show.name);
  }, [language, show]);

  return (
    <div>
      <a href={`${url}`}>
        <Card width="152px">
          <Card.Image src={getCroppedImageUrl(show.poster_path, true)} ratio={ratio.portrait_23} rounded="0.75rem" />
          <Details>
            <p>{title}</p>
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
  height: 40px;

  p {
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.125rem;
    color: #222;
  }
`;
