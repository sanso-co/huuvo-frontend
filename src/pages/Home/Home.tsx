import { useEffect, useState } from "react";
import { Collection } from "@/helpers/interface/collection";

import { useGetCollectionGroup } from "@/hooks/api/collection/useCollection";

import { Flex } from "@/components/global/containers/Flex";
import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

const Home = () => {
  const [nowTrending, setNowTrending] = useState<Collection>();
  const [newThisMonth, setNewThisMonth] = useState<Collection>();
  const [highlyAcclaimed, setHighlyAcclaimed] = useState<Collection>();
  const [mostPopular, setMostPopular] = useState<Collection>();
  const { data: trending } = useGetCollectionGroup("65ecc286402c01621dc77125" || "");
  const { data: thismonth } = useGetCollectionGroup("65eddf83016b45c2fa52e825" || "");
  const { data: acclaimed } = useGetCollectionGroup("65ff2248c5fbada4098e8da0" || "");
  const { data: popular } = useGetCollectionGroup("6600a189d2f1a29e14cdbfb1" || "");

  useEffect(() => {
    const initializeColleciton = () => {
      const trendingCollection = trending?.results.collections[trending?.results.collections.length - 1];
      const newCollection = thismonth?.results.collections[thismonth?.results.collections.length - 1];
      const acclaimedCollection = acclaimed?.results.collections[acclaimed?.results.collections.length - 1];
      const popularCollection = popular?.results.collections[popular?.results.collections.length - 1];
      setNowTrending(trendingCollection);
      setNewThisMonth(newCollection);
      setHighlyAcclaimed(acclaimedCollection);
      setMostPopular(popularCollection);
    };

    initializeColleciton();
  }, [trending, thismonth, acclaimed, popular]);

  return (
    <Flex col gap={1.5}>
      <CardSlider title="Trending Now" helper={`updated: ${nowTrending?.releaseDate}`}>
        {nowTrending?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
      <CardSlider title="New This Month" helper="March">
        {newThisMonth?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
      <CardSlider title="Highly Acclaimed">
        {highlyAcclaimed?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
      <CardSlider title="Most Popular">
        {mostPopular?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
    </Flex>
  );
};

export default Home;
