import { Link } from "react-router-dom";
import { useShowCollection } from "@/hooks/api/collection/useShowCollection";
import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { formatDate } from "@/helpers/date";
import { collectionId } from "@/helpers/constants/collectionId";

import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

import styles from "./home.module.scss";

const Home = () => {
    const { loading, error, latestCollection } = useShowCollection(collectionId.TRENDING_NOW || "");
    const { permanentCollection: mostPopular } = useGetPermanentDetails(collectionId.MOST_POPULAR || "", 1);
    const { permanentCollection: highlyRated } = useGetPermanentDetails(collectionId.HIGHLY_RATED || "", 1);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className={styles.sliders}>
            <CardSlider title="Trending Now" helper={`updated: ${formatDate(latestCollection?.releaseDate)}`}>
                {latestCollection?.shows.map((show) => (
                    <Link key={show.id} to={`/details/${show.id}`}>
                        <ShowCard show={show} />
                    </Link>
                ))}
            </CardSlider>
            <CardSlider title="Most Popular" linkLabel="View All" linkTo="/collection/most-popular">
                {mostPopular?.shows?.result.map((show) => (
                    <Link key={show.id} to={`/details/${show.id}`}>
                        <ShowCard show={show} />
                    </Link>
                ))}
            </CardSlider>
            <CardSlider title="Highly Rated" linkLabel="View All" linkTo="/collection/highly-rated">
                {highlyRated?.shows?.result.map((show) => (
                    <Link key={show.id} to={`/details/${show.id}`}>
                        <ShowCard show={show} />
                    </Link>
                ))}
            </CardSlider>
        </div>
    );
};

export default Home;
