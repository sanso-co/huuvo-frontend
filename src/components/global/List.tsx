import styled from "@emotion/styled";
import { ReactNode } from "react";

interface Item {
  title?: string;
  value: string;
}

interface Props {
  children: ReactNode;
}

export const Item = ({ title, value }: Item) => {
  return (
    <ItemContainer>
      {title && <Title>{title}</Title>}
      <span>{value}</span>
    </ItemContainer>
  );
};

const ItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin: 0.5rem 0;

  a {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Title = styled.span`
  font-weight: 600;
`;

export const List = ({ children }: Props) => {
  return <ul>{children}</ul>;
};

List.Item = Item;
