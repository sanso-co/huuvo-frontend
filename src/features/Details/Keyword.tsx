import styled from "@emotion/styled";

import { Stack } from "@/components/global/containers/Stack";
import Chips from "@/components/global/Chip";
import { KeywordType } from "@/helpers/interface/keyword";

interface Props {
  data: KeywordType[];
}

export const Keyword = ({ data }: Props) => {
  return (
    <Stack border gap={1} padding="2rem 1rem">
      <h3>Keywords</h3>
      <Content>
        {data?.map((keyword) => (
          <Chips key={keyword.id} label={keyword.name} url={`/keywords/${keyword.id}`} />
        ))}
      </Content>
    </Stack>
  );
};

const Content = styled.ul`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;
