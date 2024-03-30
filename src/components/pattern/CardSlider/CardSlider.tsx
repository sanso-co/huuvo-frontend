import React from "react";
import styled from "@emotion/styled";

interface Props {
  helper?: string;
  title?: string;
  children: React.ReactNode;
}

export const CardSlider = ({ helper, title, children }: Props) => {
  return (
    <section>
      {title && (
        <Header>
          <h3>{title}</h3>
          {helper && <p className="caption">helper</p>}
        </Header>
      )}
      <Container>{children}</Container>
    </section>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 var(--mobile-mx);
`;

const Container = styled.div`
  display: flex;
  gap: 0.875rem;
  width: 100%;
  overflow-x: scroll;
  padding: 0 var(--mobile-mx);

  &::-webkit-scrollbar {
    display: none;
  }
`;
