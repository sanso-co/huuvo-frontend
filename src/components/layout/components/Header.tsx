import styled from "@emotion/styled";
import { Flex } from "@/components/global/containers/Flex";


export const Header = () => {

  const handleLanguage = (language: string) => {
    console.log(language);
  };

  return (
    <header>
      <Container>
        <div className="logo">K-</div>
        <div>search</div>
        <div>login</div>
        <Flex gap="0.5rem">
          <button onClick={() => handleLanguage("kr")}>KR</button>
          <button onClick={() => handleLanguage("en")}>EN</button>
        </Flex>
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
    font-size: 1.75rem;
    font-weight: 700;
  }
`;
