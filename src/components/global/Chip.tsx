import styled from "@emotion/styled";
import { Checkmark } from "@/assets/icons/Checkmark";
import { brand, neutral } from "../token";
import { Link } from "react-router-dom";

interface Props {
  label: string;
  selected: boolean;
  saveKeyword?: () => void;
  liked?: boolean;
  url?: string;
}

const Chips = ({ label, selected, url, saveKeyword, liked }: Props) => {
  return (
    <Container>
      <Flex>
        {selected && (
          <Check onClick={saveKeyword} selected={selected}>
            <Checkmark />
          </Check>
        )}
        <Link to={url}>{label}</Link>
      </Flex>
    </Container>
  );
};

interface StyleProps {
  saved?: boolean;
  selected?: boolean;
}

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

const Check = styled(Flex)<StyleProps>`
  padding: 0.15em;
  border-radius: 100%;
  background-color: ${({ selected }) => (selected ? brand.cornflower : neutral[200])};
  opacity: 0.8;
  transition: opacity 0.1s linear;
  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;

export default Chips;
