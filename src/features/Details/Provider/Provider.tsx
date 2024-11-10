import { Link } from "react-router-dom";
import { useGetProvidersForShow } from "@/hooks/api/details/useProviders";

import { formatUrl } from "@/helpers/formatUrl";

import { ProviderItemResponse } from "@/types/provider";

import styles from "./provider.module.scss";

interface Props {
    id: string;
}

interface Provider {
    provider_name: string;
    provider_id: number;
    logo_path: string;
    display_priority: number;
}

export const Provider = ({ id }: Props) => {
    const { providers, isLoading, error } = useGetProvidersForShow(Number(id));

    if (isLoading) return <div>Loading providers...</div>;
    if (error) return <div>Failed to load providers</div>;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h3>Streaming on</h3>
            </div>
            {providers?.length ? (
                <div className={styles.list}>
                    {providers.map((provider: ProviderItemResponse) => {
                        const url = formatUrl(provider.name ?? "");

                        return (
                            <Link
                                key={provider.id}
                                to={`/provider/${url}/${provider.id}`}
                                className={styles.link}
                            >
                                <img src={provider.logo_path} alt="" />
                                <p>{provider.name}</p>
                            </Link>
                        );
                    })}
                </div>
            ) : (
                <div>US streaming details coming soon.</div>
            )}
        </div>
    );
};
