import useHomeData from "./hook/useHomeData";

import { formatDate } from "@/helpers/date";
import { LeanShowType } from "@/types/show";

import { Hero } from "@/features/Home/Hero";
import { SEO } from "@/components/global/SEO";
import { CardSlider } from "@/components/pattern/CardSlider";
import { ShowCard } from "@/components/feature/ShowCard";

import styles from "./home.module.scss";
import layout from "@/assets/styles/layout.module.scss";

const Home = () => {
    const { heroes, isHeroLoading, heroError, trending, upcoming, highlyRated, genreFiction } =
        useHomeData();

    return (
        <>
            <SEO pageType="home" dramas={trending?.shows} />
            <div className={styles.home}>
                <Hero heroes={heroes} isLoading={isHeroLoading} error={heroError} />
                <div className={`${styles.sliders} ${layout.max}`}>
                    <CardSlider title="Trending" helper={formatDate(trending?.releaseDate)}>
                        {trending?.shows?.map((show: LeanShowType) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                    <CardSlider title="Newly Released">
                        {upcoming?.results.map((show: LeanShowType) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                    <CardSlider
                        title="Highly Rated"
                        linkLabel="View all"
                        linkTo="/collection/highly-rated"
                    >
                        {highlyRated?.results.map((show: LeanShowType) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                    <CardSlider
                        title="Genre Fiction"
                        linkLabel="View all"
                        linkTo="/collection/genre-fiction"
                    >
                        {genreFiction?.results.map((show: LeanShowType) => (
                            <ShowCard show={show} key={show.id} />
                        ))}
                    </CardSlider>
                </div>
            </div>
        </>
    );
};

export default Home;
