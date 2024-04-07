import { Stack } from "@/components/global/containers/Stack";
import styled from "@emotion/styled";

interface Props {
  data: {
    results: {
      US: {
        flatrate: {
          logo_path: string;
        }[];
      };
    };
  };
}

export const Provider = ({ data }: Props) => {
  const providerPath = data?.results?.US?.flatrate[0].logo_path;

  return (
    <Stack border gap={1} padding="2rem 1rem">
      <Header>
        <h3>Watch</h3>
        <p>provided by JustWatch</p>
      </Header>
      <Container>
        <img src={`https://media.themoviedb.org/t/p/original/${providerPath}`} alt="" />
      </Container>
    </Stack>
  );
};
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  p {
    font-size: 0.75rem;
  }
`;

const Container = styled.div`
  img {
    width: 32px;
    height: 32px;
    object-fit: contain;
  }
`;
