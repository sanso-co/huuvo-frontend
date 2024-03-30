import { ReactNode } from "react";
import styled from "@emotion/styled";
import { ImageContainer } from "@/components/global/containers/ImageContainer";

interface Props {
  width?: string;
  children: ReactNode;
}

export const Card = ({ children, width }: Props) => {
  return <CardContainer width={width}>{children}</CardContainer>;
};

interface StyleProps {
  width?: string;
}

const CardContainer = styled.div<StyleProps>`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: ${({ width }) => width || "100%"};
  overflow: hidden;
`;

Card.Image = ImageContainer;
