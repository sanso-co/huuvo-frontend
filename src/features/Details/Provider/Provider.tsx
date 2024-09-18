import { Link } from "react-router-dom";
import { useProviders } from "@/hooks/api/details/useProviders";

import { formatUrl } from "@/helpers/formatUrl";

import styles from "./provider.module.scss";

interface Props {
    id: number;
}

interface Provider {
    provider_name: string;
    provider_id: number;
    logo_path: string;
    display_priority: number;
}

const excludeProviders = [2100, 1796, 1968];

export const Provider = ({ id }: Props) => {
    const { providers, isLoading, error } = useProviders(id);

    const usData = providers?.results?.US?.flatrate || [];
    const filteredProviders = usData.filter(
        (provider: Provider) => !excludeProviders.includes(provider.provider_id)
    );

    if (isLoading) return <div>Loading providers...</div>;
    if (error) return <div>Failed to load providers</div>;
    if (!filteredProviders || filteredProviders.length === 0) return null;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Watch</h3>
                <p>provided by JustWatch</p>
            </div>
            <div className={styles.list}>
                {filteredProviders.map((provider: Provider) => {
                    const url = formatUrl(provider.provider_name ?? "");
                    const providerPath = provider.logo_path;
                    const providerName = provider.provider_name;

                    return (
                        <Link
                            key={provider.provider_id}
                            to={`/provider/${url}`}
                            className={styles.link}
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
            </div>
        </div>
    );
};
