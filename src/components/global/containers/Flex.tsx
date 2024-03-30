import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  col?: boolean;
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  gap?: number;
}

export const Flex = ({ children, col, justify, gap }: Props) => {
  return (
    <Container col={col} justify={justify} gap={gap}>
      {children}
    </Container>
  );
};

interface StyleProps {
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  gap?: number;
  col?: boolean;
}

const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: ${({ col }) => (col ? "column" : "row")};
  justify-content: ${({ justify }) => justify || "flex-start"};
  align-items: ${({ col }) => (col ? "start" : "center")};
  gap: ${({ gap }) => `${gap}rem` || "0"};
`;
