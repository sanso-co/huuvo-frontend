import { Link } from "react-router-dom";
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
                    <Link key={show.id} to={`/details/${show.id}`}>
                        <ShowCard show={show} />
                    </Link>
                ))}
            </CardSlider>
        </div>
    );
};
