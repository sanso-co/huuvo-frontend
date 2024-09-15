import { Link } from "react-router-dom";
import { Stack } from "@/components/global/Stack";
import { ProviderResponse } from "@/types/showDetail";

import styles from "./provider.module.scss";
import { formatUrl } from "@/helpers/formatUrl";

interface Props {
    data: ProviderResponse | null;
}

interface Provider {
    provider_name: string;
    provider_id: number;
    logo_path: string;
    display_priority: number;
}

const excludeProviders = [2100, 1796, 1968];

export const Provider = ({ data }: Props) => {
    const usData = data?.results?.US?.flatrate || [];
    const filteredProviders = usData.filter(
        (provider: Provider) => !excludeProviders.includes(provider.provider_id)
    );
    console.log(filteredProviders);
    return (
        <Stack border gap="1rem" padding="2rem 1rem">
            <div className={styles.header}>
                <h3>Watch</h3>
                <p>provided by JustWatch</p>
            </div>
            {filteredProviders &&
                filteredProviders.length > 0 &&
                filteredProviders.map((provider: Provider) => {
                    const url = formatUrl(provider.provider_name ?? "");
                    const providerPath = provider.logo_path;
                    const providerName = provider.provider_name;

                    return (
                        <Link
                            key={provider.provider_id}
                            to={`/provider/${url}`}
                            className={styles.container}
                        >
                            {providerPath ? (
                                <img
                                    src={`https://media.themoviedb.org/t/p/original/${providerPath}`}
                                    alt=""
                                />
                            ) : (
                                <div className="footnote">Not available in the US yet</div>
                            )}
                            {providerName && <p>{providerName}</p>}
                        </Link>
                    );
                })}
        </Stack>
    );
};
