import { createPortal } from "react-dom";
import styled from "@emotion/styled";

const mountElement = document.getElementById("portal");

interface Props {
  open: boolean;
  hideButton?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
  handleClose: () => void;
}

export const Modal = ({ open, hideButton, children, fullWidth, handleClose }: Props) => {
  if (!mountElement) return null;
  return createPortal(
    <>
      {open && (
        <>
          <Overlay onClick={handleClose} />
          <Container fullWidth={fullWidth}>
            {!hideButton && (
              <Header>
                <button onClick={handleClose}>close</button>
              </Header>
            )}
            <Content>{children}</Content>
          </Container>
        </>
      )}
    </>,
    mountElement
  );
};

interface StyleProps {
  fullWidth?: boolean;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  animation: fadeInAnimation ease-in-out 0.3s;
  z-index: 100;

  @keyframes fadeInAnimation {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const Container = styled.div<StyleProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  min-width: 50%;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  transform: translate(-50%, -50%);
  border-radius: ${({ fullWidth }) => (fullWidth ? "0" : "0.625rem")};
  background-color: #fff;
  padding: ${({ fullWidth }) => (fullWidth ? "0" : "1.625rem")};
  z-index: 100;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 0 1.625rem;

  h1 {
    font-size: 1.125rem;
  }

  button {
    background-color: transparent;
    border: none;

    .closeIcon {
      width: 24px;
      height: 24px;
      cursor: pointer;
    }
  }
`;

const Content = styled.main`
  overflow-y: auto;
`;
