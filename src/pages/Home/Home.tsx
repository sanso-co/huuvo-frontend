import { useEffect, useState } from "react";
import { Collection } from "@/helpers/interface/collection";

import { useGetCollectionGroup } from "@/hooks/api/collection/useCollection";

import { Flex } from "@/components/global/containers/Flex";
import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

const Home = () => {
  const [nowTrending, setNowTrending] = useState<Collection>();
  const { data: trending } = useGetCollectionGroup("65ecc286402c01621dc77125" || "");

  useEffect(() => {
    const initializeColleciton = () => {
      const trendingCollection = trending?.results.collections[trending?.results.collections.length - 1];
      setNowTrending(trendingCollection);
    };

    initializeColleciton();
  }, [trending]);

  return (
    <Flex col gap={1.5}>
      <CardSlider title="Trending Now" helper={`updated: ${nowTrending?.releaseDate}`}>
        {nowTrending?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
      <CardSlider title="Trending Now" helper="helper">
        b
      </CardSlider>
    </Flex>
  );
};

export default Home;
