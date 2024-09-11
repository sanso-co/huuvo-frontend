import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import _ from "lodash";

import { useCreditShowList } from "@/hooks/api/credit/useCreditShowList";
import { usePersonDetails } from "@/hooks/api/credit/usePersonDetails";
import { useGeneralStore } from "@/store/useStore";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";

import { CreditShowListResponse } from "@/types/credit";
import { Show } from "@/types/show";

import styles from "./list.module.scss";

//exclude reality, talk shows
const excludeShows = [10764, 10767];

export const Credit = () => {
    const { creditType, creditId = "" } = useParams();
    const [name, setName] = useState("");
    const { creditShowList, loading, error } = useCreditShowList(creditId as string);
    const { person, loading: personLoading, error: personError } = usePersonDetails(creditId as string);
    const language = useGeneralStore((state) => state.language);

    const sortedShows = useMemo(() => {
        if (!creditType || !creditShowList) return [];

        const filteredShows = creditShowList[creditType as keyof CreditShowListResponse]?.filter(
            (show: Show) => !excludeShows.some((id) => show.genre_ids.includes(id))
        );

        return _.orderBy(filteredShows, ["first_air_date"], ["desc"]);
    }, [creditType, creditShowList]);

    // kr or en
    useEffect(() => {
        setName(person ? (language === "kr" ? person.also_known_as?.[0] : null) || person.name || "" : "");
    }, [language, person]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {!personLoading && !personError && person && <Header title={name || ""} description={person.known_for_department} />}

            {loading ? (
                <div>loading</div>
            ) : (
                <div className={styles.grid}>
                    {sortedShows?.map((show: Show) => (
                        <Link to={`/details/${show.id}`} key={show.id}>
                            <ShowCard show={show} />
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};
