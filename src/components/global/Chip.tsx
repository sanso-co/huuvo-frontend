import styled from "@emotion/styled";
import { neutral } from "../token";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  url: string;
}

const Chips = ({ label, url }: Props) => {
  return (
    <Container>
      <Flex>
        <Link to={url}>{label}</Link>
      </Flex>
    </Container>
  );
};

const Container = styled.div`
  display: inline-block;
  border-radius: 2rem;
  background-color: ${neutral[100]};
  font-size: 0.75rem;
  letter-spacing: 0.015rem;
  text-transform: capitalize;
  padding: 0.5rem 0.75rem;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Chips;
