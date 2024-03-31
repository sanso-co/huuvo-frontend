import styled from "@emotion/styled";
import { useGeneralStore } from "@/store/useStore";

import { Flex } from "@/components/global/containers/Flex";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  const detailsPage = location.pathname.includes("details");

  const store = useGeneralStore();
  const handleLanguage = (language: string) => {
    store.setLanguage(language);
  };

  return (
    <header>
      <Container>
        <Link to="/" className="logo">
          K-
        </Link>
        {/* <div>search</div>
        <div>login</div> */}
        {!detailsPage && (
          <Flex gap={0.5}>
            <button onClick={() => handleLanguage("kr")}>KR</button>
            <button onClick={() => handleLanguage("en")}>EN</button>
          </Flex>
        )}
      </Container>
    </header>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  padding: 0 var(--mobile-mx);

  .logo {
    font-family: "Inter", sans-serif;
    font-size: 1.35rem;
    font-weight: 700;
  }
`;
