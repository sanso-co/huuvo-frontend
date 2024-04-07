import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  onClick?: () => void;
}

export const IconContainer = ({ children, onClick }: Props) => {
  return <Container onClick={onClick}>{children}</Container>;
};

const Container = styled.div`
  display: inline-block;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #f2f2f2;
  padding: 0.5rem;

  &:hover {
    background-color: #ebebeb;
    cursor: pointer;
  }
`;
