import { useGetSimilar } from "@/hooks/api/recommendations/useRecommendations";

import { ShowCard } from "@/components/feature/ShowCard";
import { CardSlider } from "@/components/pattern/CardSlider";
import styles from "./reco.module.scss";

interface Props {
    showId: number;
}

export const Recommendations = ({ showId }: Props) => {
    const { similar, isLoading, error } = useGetSimilar(showId);

    if (isLoading) return <div>Loading similar shows...</div>;
    if (error) return <div>Failed to load similar shows</div>;
    if (!similar || similar.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3>You may also like</h3>
            <CardSlider>
                {similar.map((show) => (
                    <ShowCard show={show} key={show.id} />
                ))}
            </CardSlider>
        </div>
    );
};
