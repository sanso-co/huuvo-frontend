import { Link } from "react-router-dom";

import { DetailResponse } from "@/types/showDetail";
import { formatDate } from "@/helpers/date";

import styles from "./info.module.scss";

interface Props {
    data: DetailResponse | undefined;
}

export const Info = ({ data }: Props) => {
    return (
        <div className={styles.container}>
            <h1>{data?.name}</h1>
            <div className={styles.content}>
                <div className={styles.top}>
                    <p className="caption">{data?.original_name}</p>
                    <p className="caption">{formatDate(data?.first_air_date)}</p>
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
