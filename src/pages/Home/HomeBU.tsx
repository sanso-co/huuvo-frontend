import { useEffect, useState } from "react";
import _ from "lodash";
import { Collection } from "@/helpers/interface/collection";

import { useGetCollectionGroup } from "@/hooks/api/collection/useCollection";

import { Flex } from "@/components/global/containers/Flex";
import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";
import { formatDate } from "@/helpers/date";
import { Show } from "@/helpers/interface/show";
import { useShowCollection } from "@/hooks/api/collection/useShowCollection";

const Home = () => {
  const [nowTrending, setNowTrending] = useState<Collection>();
  const [quarterOne, setQuarterOne] = useState<Show[]>([]);
  const [quarterTwo, setQuarterTwo] = useState<Collection>();
  const [highlyAcclaimed, setHighlyAcclaimed] = useState<Collection>();
  const [mostPopular, setMostPopular] = useState<Collection>();
  // const { data: trending } = useGetCollectionGroup("65ecc286402c01621dc77125" || "");
  const { data: trending } = useShowCollection("65ecc286402c01621dc77125" || "");
  const { data: acclaimed } = useGetCollectionGroup("65ff2248c5fbada4098e8da0" || "");
  const { data: popular } = useGetCollectionGroup("6600a189d2f1a29e14cdbfb1" || "");
  const { data: thismonth } = useGetCollectionGroup("65eddf83016b45c2fa52e825" || "");

  useEffect(() => {
    const initializeColleciton = () => {
      const trendingCollection = trending?.results.collections[trending?.results.collections.length - 1];
      const acclaimedCollection = acclaimed?.results.collections[acclaimed?.results.collections.length - 1];
      const popularCollection = popular?.results.collections[popular?.results.collections.length - 1];
      const q1Collection = thismonth?.results.collections[0];
      const q2Collection = thismonth?.results.collections[1];
      console.log(mostPopular);

      setNowTrending(trendingCollection);
      setHighlyAcclaimed(acclaimedCollection);
      setMostPopular(popularCollection);
      if (q1Collection) {
        const reversedShows = _.reverse([...q1Collection.shows]);
        setQuarterOne(reversedShows);
      }
      setQuarterTwo(q2Collection);
    };

    initializeColleciton();
  }, [trending, thismonth, acclaimed, popular]);

  return (
    <Flex col gap={1.5}>
      <CardSlider title="Trending Now" helper={`updated: ${formatDate(nowTrending?.releaseDate)}`}>
        {nowTrending?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
      <CardSlider title="Release Q2 2024">
        {quarterTwo?.shows.map((show) => (
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
      <CardSlider title="Upcoming Q2 2024">
        {quarterTwo?.shows.map((show) => (
          <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
        ))}
      </CardSlider>
    </Flex>
  );
};

export default Home;
