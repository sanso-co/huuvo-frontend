import { useGetHeroes } from "@/hooks/api/marketing/useHero";
import { usePeriodicCollection } from "@/hooks/api/collection/usePeriodicCollection";
import { useGetPermanentDetails } from "@/hooks/api/collection/usePermanentCollection";
import { formatDate } from "@/helpers/date";
import { collectionId } from "@/helpers/constants/collectionId";

import { SEO } from "@/components/global/SEO";
import { Hero } from "@/features/Home/Hero";
import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

import styles from "./home.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Home = () => {
    const { heroes } = useGetHeroes();

    const { collectionData: trending } = usePeriodicCollection(
        collectionId.TRENDING_NOW || "",
        "latest"
    );
    const { collectionData: upcoming } = usePeriodicCollection(
        collectionId.NEW_UPCOMING || "",
        "latest",
        "descending"
    );
    const { data: highlyRated } = useGetPermanentDetails(collectionId.HIGHLY_RATED || "", 1, {
        forceLimit: 10,
    });

    return (
        <>
            <SEO
                title="K-lama | Find Your Next Favorite Korean Drama"
                description="Discover and track Korean dramas with K-lama. Get personalized recommendations based on your watching history and connect with other K-drama fans."
            />
            <div className={styles.home}>
                <Hero heroes={heroes} />
                <div className={`${styles.sliders} ${layout.max}`}>
                    <CardSlider title="Trending" helper={formatDate(trending?.releaseDate)}>
                        {trending?.shows?.map((show) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                    <CardSlider title="Newly Released">
                        {upcoming?.shows.map((show) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                    <CardSlider
                        title="Highly Rated"
                        linkLabel="View All"
                        linkTo="/collection/highly-rated"
                    >
                        {highlyRated?.shows?.results.map((show) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                </div>
            </div>
        </>
    );
};

export default Home;
