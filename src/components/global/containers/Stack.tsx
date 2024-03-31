import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  border?: boolean;
  gap?: number;
  padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  paddingBottom?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

export const Stack = ({ border, children, gap, padding, paddingBottom }: Props) => {
  return (
    <Container border={border} gap={gap} padding={padding} paddingBottom={paddingBottom}>
      {children}
    </Container>
  );
};

interface StyleProps {
  gap?: number;
  border?: boolean;
  padding?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  paddingBottom?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
}

const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap}rem` || "0"};
  border-bottom: ${({ border }) => (border ? "1px solid #e5e5e5" : "none")};
  padding: ${({ padding }) => padding && `${padding}rem 0`};
  padding-bottom: ${({ paddingBottom }) => paddingBottom && `${paddingBottom}rem`};
`;
