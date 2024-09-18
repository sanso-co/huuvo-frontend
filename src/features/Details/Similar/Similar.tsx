import { useSimilar } from "@/hooks/api/similar/useSimilar";

import { ShowCard } from "@/components/feature/ShowCard";
import { CardSlider } from "@/components/pattern/CardSlider";
import styles from "./similar.module.scss";
import { useMemo } from "react";

interface Props {
    id: number;
    genreString: string;
    keywordString: string;
}

export const Similar = ({ id, genreString, keywordString }: Props) => {
    const { similar, isLoading, error } = useSimilar(
        id as number,
        genreString as string,
        keywordString as string
    );

    const filteredSimilar = useMemo(() => {
        return similar?.filter((show) => show.id.toString() !== id.toString());
    }, [similar, id]);

    if (isLoading) return <div>Loading similar shows...</div>;
    if (error) return <div>Failed to load similar shows</div>;
    if (!similar || similar.length === 0) return null;

    return (
        <div className={styles.container}>
            <h3>You may also like</h3>
            <CardSlider>
                {filteredSimilar?.map((show) => (
                    <ShowCard show={show} key={show.id} />
                ))}
            </CardSlider>
        </div>
    );
};
