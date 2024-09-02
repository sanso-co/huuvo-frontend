import { useShowCollection } from "@/hooks/api/collection/useShowCollection";
import { formatDate } from "@/helpers/date";

import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";
import { Link } from "react-router-dom";

const Home = () => {
  const { loading, error, latestCollection } = useShowCollection("66d4cf936b99b0e547a32e77" || "");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <CardSlider title="Trending Now" helper={`updated: ${formatDate(latestCollection?.releaseDate)}`}>
      {latestCollection?.shows.map((show) => (
        <Link key={show.id} to={`/details/${show.id}`}>
          <ShowCard show={show} />
        </Link>
      ))}
    </CardSlider>
  );
};

export default Home;
