import { ShowCard } from "@/components/feature/ShowCard";
import { CardSlider } from "@/components/pattern/CardSlider";
import { Show } from "@/types/show";
import styles from "./similar.module.scss";

interface Props {
    data: Show[];
}

export const Similar = ({ data }: Props) => {
    return (
        <div className={styles.container}>
            <h3>You may also like</h3>
            <CardSlider>
                {data.map((show) => (
                    <ShowCard show={show} key={show.id} />
                ))}
            </CardSlider>
        </div>
    );
};
