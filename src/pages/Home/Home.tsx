import { useShowCollection } from "@/hooks/api/collection/useShowCollection";
import { formatDate } from "@/helpers/date";

import { Flex } from "@/components/global/containers/Flex";
import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

const Home = () => {
    const { loading, error, latestCollection } = useShowCollection("66d4cf936b99b0e547a32e77" || "");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <Flex col gap={1.5}>
            <CardSlider title="Trending Now" helper={`updated: ${formatDate(latestCollection?.releaseDate)}`}>
                {latestCollection?.shows.map((show) => (
                    <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
                ))}
            </CardSlider>
        </Flex>
    );
};

export default Home;
