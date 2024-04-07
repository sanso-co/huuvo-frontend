import styled from "@emotion/styled";
import placeholder from "@/assets/icons/no-profile.svg";

export const ProfileImage = ({ url }: { url: string }) => {
  const noImage = url === "no-image";

  return (
    <div>
      <Container>{noImage ? <img src={placeholder} alt="placeholder" className="placeholder" /> : <img src={url} alt="" />}</Container>
    </div>
  );
};

const Container = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-content: center;
  align-items: center;
  background-color: #f2f2f2;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
  }

  .placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 28px;
  }
`;
