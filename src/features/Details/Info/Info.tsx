import { Link } from "react-router-dom";

import { DetailResponse } from "@/types/showDetail";
import { formatYear } from "@/helpers/date";

import styles from "./info.module.scss";

interface Props {
    data: DetailResponse | undefined;
}

export const Info = ({ data }: Props) => {
    return (
        <div className={styles.container}>
            <h1>{data?.name}</h1>
            <div className={styles.content}>
                <p className="caption">{data?.original_name}</p>
                <div className={styles.top}>
                    <Link to={`/air/year/${formatYear(data?.first_air_date)}`}>
                        <p className="caption">{formatYear(data?.first_air_date)}</p>
                    </Link>
                    <p className="caption">{`${data?.number_of_episodes} episodes`}</p>
                </div>
                <ul>
                    {data?.genres?.map((genre) => (
                        <li key={genre.id} className="caption">
                            <Link to={`/genres/${genre.name.toLocaleLowerCase()}/${genre.id}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                <p className={styles.overview}>{data?.overview}</p>
            </div>
        </div>
    );
};
