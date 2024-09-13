import { Link } from "react-router-dom";
import { Stack } from "@/components/global/Stack";
import { ProviderResponse } from "@/types/showDetail";

import styles from "./provider.module.scss";
import { formatUrl } from "@/helpers/formatUrl";

interface Props {
    data: ProviderResponse | null;
}

export const Provider = ({ data }: Props) => {
    const providerPath = data?.results?.US?.flatrate[0].logo_path;
    const providerName = data?.results?.US?.flatrate[0].provider_name;
    const url = formatUrl(providerName ?? "");

    return (
        <Stack border gap="1rem" padding="2rem 1rem">
            <div className={styles.header}>
                <h3>Watch</h3>
                <p>provided by JustWatch</p>
            </div>
            <Link to={`/provider/${url}`} className={styles.container}>
                {providerPath ? (
                    <img src={`https://media.themoviedb.org/t/p/original/${providerPath}`} alt="" />
                ) : (
                    <div className="footnote">Not available in the US yet</div>
                )}
                {providerName && <p>{providerName}</p>}
            </Link>
        </Stack>
    );
};
