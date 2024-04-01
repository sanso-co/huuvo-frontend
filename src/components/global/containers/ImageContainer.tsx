import { Play } from "@/assets/icons/Play";
import styled from "@emotion/styled";
import { useState } from "react";
import ReactPlayer from "react-player";
import { Modal } from "@/components/global/Modal";
import { Video } from "@/helpers/interface/show";
import placeholder from "@/assets/icons/no-image.svg";

interface Props {
  src: string;
  ratio?: string;
  rounded?: string;
  width?: string;
  video?: Video[];
}

export const ImageContainer = ({ src, ratio, rounded, width, video }: Props) => {
  const noImage = src === "no-image";

  const [overlayOpen, setOverlayOpen] = useState(false);

  const handleModal = () => {
    setOverlayOpen(!overlayOpen);
  };

  return (
    <Container ratio={ratio} rounded={rounded} width={width}>
      {noImage ? <img src={placeholder} alt="placeholder" className="placeholder" /> : <img src={src} alt="" />}
      {video && video.length > 0 && (
        <PlayIcon onClick={handleModal}>
          <Play fill="#eee" />
        </PlayIcon>
      )}
      <Modal fullWidth hideButton open={overlayOpen} handleClose={handleModal}>
        <VideoPlayer>
          <ReactPlayer
            controls
            className="react-player"
            url={`https://www.youtube.com/watch?v=${video?.[0]?.key}`}
            width="100%"
            height="100%"
          />
        </VideoPlayer>
      </Modal>
    </Container>
  );
};

interface ImageProps {
  ratio?: string;
  rounded?: string;
  width?: string;
}

const Container = styled.div<ImageProps>`
  position: relative;
  flex: 1;
  width: ${({ width }) => width || "100%"};
  border-radius: ${({ rounded }) => rounded || "0"};
  background-color: #f2f2f2;
  overflow: hidden;

  &:before {
    content: "";
    display: block;
    width: ${({ width }) => width || "100%"};
    padding-bottom: ${({ ratio }) => ratio || "100%"};
  }

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    width: ${({ width }) => width || "100%"};
    max-height: 100%;
    object-fit: cover;
  }

  .placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36px;
  }
`;

const PlayIcon = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.8;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
  }
`;

const VideoPlayer = styled.div`
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }
`;
