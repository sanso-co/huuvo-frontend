import { Link } from "react-router-dom";

import { DetailResponse } from "@/types/showDetail";
import { formatYear, formatDate } from "@/helpers/date";

import styles from "./info.module.scss";

interface Props {
    data: DetailResponse | undefined;
}

export const Info = ({ data }: Props) => {
    const isFutureShow = () => {
        if (!data?.first_air_date) return false;
        const airDate = new Date(data.first_air_date);
        const today = new Date();
        return airDate > today;
    };

    return (
        <div className={styles.container}>
            <h1>{data?.name}</h1>
            <div className={styles.content}>
                <p className="caption">{data?.original_name}</p>
                <div className={styles.top}>
                    <Link to={`/year/released/${formatYear(data?.first_air_date)}`}>
                        <p className="caption">{formatYear(data?.first_air_date)}</p>
                    </Link>

                    <p className="caption">{`${data?.number_of_episodes} episodes`}</p>
                </div>
                <ul>
                    {data?.genres?.map((genre) => (
                        <li key={genre.id} className="caption">
                            <Link to={`/genre/${genre.name.toLocaleLowerCase()}/${genre.id}`}>
                                {genre.name}
                            </Link>
                        </li>
                    ))}
                </ul>
                {data?.overview && <p className={styles.overview}>{data.overview}</p>}
                {isFutureShow() && (
                    <p className={styles.date}>To be released {formatDate(data?.first_air_date)}</p>
                )}
            </div>
        </div>
    );
};
