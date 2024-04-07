import styled from "@emotion/styled";

interface Props {
  children: React.ReactNode;
  border?: boolean;
  gap?: number;
  padding?: string;
}

export const Stack = ({ border, children, gap, padding }: Props) => {
  return (
    <Container border={border} gap={gap} padding={padding}>
      {children}
    </Container>
  );
};

interface StyleProps {
  gap?: number;
  border?: boolean;
  padding?: string;
}

const Container = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ gap }) => `${gap}rem` || "0"};
  border-bottom: ${({ border }) => (border ? "1px solid #e5e5e5" : "none")};
  padding: ${({ padding }) => padding && `${padding}`};
`;
