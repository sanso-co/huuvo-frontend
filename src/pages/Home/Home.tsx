import { Flex } from "@/components/global/containers/Flex";
import { CardSlider } from "@/components/pattern/CardSlider";

const Home = () => {
  return (
    <Flex col gap={1.5}>
      <CardSlider title="Trending Now" helper="helper">
        a
      </CardSlider>
      <CardSlider title="Trending Now" helper="helper">
        b
      </CardSlider>
    </Flex>
  );
};

export default Home;
