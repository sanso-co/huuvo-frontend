import styled from "@emotion/styled";

interface Item {
  id: number;
  key: string;
  value: string;
}

interface Props {
  items: Item[];
}

export const List = ({ items }: Props) => {
  return (
    <ul>
      {items.map((item, idx) => (
        <Item key={idx}>
          <span>{item.key}</span>
          <span>{item.value}</span>
        </Item>
      ))}
    </ul>
  );
};

const Item = styled.li`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  margin: 0.5rem 0;

  span:first-of-type {
    font-weight: 600;
  }
`;
