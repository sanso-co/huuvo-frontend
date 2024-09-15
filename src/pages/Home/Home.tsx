import { Link } from "react-router-dom";
import { usePeriodicCollection } from "@/hooks/api/collection/usePeriodicCollection";
import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { formatDate, releaseQuarter } from "@/helpers/date";
import { collectionId } from "@/helpers/constants/collectionId";

import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

import styles from "./home.module.scss";

const Home = () => {
    const { latestCollection: trending } = usePeriodicCollection(collectionId.TRENDING_NOW || "");
    const { latestCollection: upcoming } = usePeriodicCollection(
        collectionId.UPCOMING_RELEASE || ""
    );
    const { permanentCollection: mostPopular } = useGetPermanentDetails(
        collectionId.MOST_POPULAR || "",
        1
    );
    const { permanentCollection: highlyRated } = useGetPermanentDetails(
        collectionId.HIGHLY_RATED || "",
        1
    );

    return (
        <div className={styles.sliders}>
            <CardSlider
                title="Trending Now"
                helper={`Updated: ${formatDate(trending?.releaseDate)}`}
            >
                {trending?.shows.map((show) => (
                    <Link key={show.id} to={`/details/${show.id}`}>
                        <ShowCard show={show} />
                    </Link>
                ))}
            </CardSlider>
            <CardSlider
                title="Upcoming Release"
                helper={`Upcoming: ${releaseQuarter(upcoming?.releaseDate || "")}`}
            >
                {upcoming?.shows.map((show) => (
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
