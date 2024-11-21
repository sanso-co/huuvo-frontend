import { useGetSimilar } from "@/hooks/api/recommendations/useRecommendations";

import { ShowCard } from "@/components/feature/ShowCard";

import styles from "./reco.module.scss";
import details from "@/assets/styles/details.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { useEffect, useRef } from "react";

interface Props {
    showId: number;
}

export const Recommendations = ({ showId }: Props) => {
    const { similar, isLoading, error } = useGetSimilar(showId);
    const sliderRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft = 0;
        }
    }, [similar]);

    if (isLoading) return <div>Loading similar shows...</div>;
    if (error) return <div>Failed to load similar shows</div>;
    if (!similar || similar.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={`${details.header} ${layout.default} ${layout.max}`}>
                <h3>You may also like</h3>
            </div>

            <section>
                <div ref={sliderRef} className={styles.slider}>
                    {similar.map((show) => (
                        <ShowCard show={show} key={show.id} />
                    ))}
                </div>
            </section>
        </div>
    );
};
