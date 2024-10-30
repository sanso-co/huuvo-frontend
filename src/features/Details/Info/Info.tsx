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
        <section className={styles.container}>
            <h1>{data?.name}</h1>
            <div className={styles.content}>
                <div className={styles.part}>
                    <div className={styles.top}>
                        <span>{data?.original_name}</span>
                        {!isFutureShow() && (
                            <Link
                                to={`/year/released/${formatYear(data?.first_air_date)}`}
                                className={styles.year}
                            >
                                <p>{formatYear(data?.first_air_date)}</p>
                            </Link>
                        )}
                    </div>

                    {isFutureShow() && <p>Releasing on {formatDate(data?.first_air_date)}</p>}

                    <ul className={styles.genres}>
                        {data?.genres?.map((genre) => (
                            <li key={genre.id}>
                                <Link to={`/genre/${genre.name.toLocaleLowerCase()}/${genre.id}`}>
                                    {genre.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {data?.overview && (
                    <div className={styles.part}>
                        <p className={styles.subHeader}>Overview</p>
                        <p>{data.overview}</p>
                    </div>
                )}
                <div className={styles.part}>
                    <p className={styles.subHeader}>Details</p>

                    <ul>
                        <li className={styles.listItem}>
                            <div className={styles.listTitle}>Episodes</div>
                            <div className={styles.episodes}>{data?.number_of_episodes}</div>
                        </li>
                        {data?.related_seasons && (
                            <li className={styles.listItem}>
                                <div className={styles.listTitle}>OTHER SEASONS</div>
                                {data.related_seasons.map((season) => (
                                    <Link key={season.season} to={`/details/${season.show.id}`}>
                                        <div>{season.show.name}</div>
                                    </Link>
                                ))}
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </section>
    );
};
