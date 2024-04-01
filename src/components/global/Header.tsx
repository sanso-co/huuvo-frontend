import styled from "@emotion/styled";

interface Props {
  title: string;
  description: string;
}

export const Header = ({ title, description }: Props) => {
  return (
    <Container>
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </Container>
  );
};

const Container = styled.div`
  padding: 0 var(--mobile-mx);
  margin-bottom: 1rem;

  h1 {
    text-transform: capitalize;
    margin-bottom: 0.5rem;
  }
`;
