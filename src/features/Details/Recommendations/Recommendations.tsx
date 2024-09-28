import { useGetsRecommendations } from "@/hooks/api/recommendations/useRecommendations";

import { ShowCard } from "@/components/feature/ShowCard";
import { CardSlider } from "@/components/pattern/CardSlider";
import styles from "./reco.module.scss";

interface Props {
    showId: number;
}

export const Recommendations = ({ showId }: Props) => {
    const { details, isLoading, error } = useGetsRecommendations(showId);

    if (isLoading) return <div>Loading similar shows...</div>;
    if (error) return <div>Failed to load similar shows</div>;
    if (!details || details.shows.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3>You may also like</h3>
            <CardSlider>
                {details.shows.map((show) => (
                    <ShowCard show={show} key={show.id} />
                ))}
            </CardSlider>
        </div>
    );
};
