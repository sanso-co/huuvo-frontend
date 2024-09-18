import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import _ from "lodash";

import { useCredit } from "@/hooks/api/credit/useCredit";
import { usePersonDetails } from "@/hooks/api/credit/usePersonDetails";
import { useGeneralStore } from "@/store/useStore";
import { useCollectionStore } from "@/store/collectionStore";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";

import { Show } from "@/types/show";

import styles from "./credit.module.scss";
import { ProfileImage } from "@/components/global/ProfileImage";
import { getProfileImage } from "@/services/image-url";

//exclude reality, talk shows
const excludeShows = [10764, 10767];

const Credit = () => {
    const { creditType, creditId } = useParams();
    const [name, setName] = useState("");

    const language = useGeneralStore((state) => state.language);

    const {
        person,
        loading: personLoading,
        error: personError,
    } = usePersonDetails(creditId as string);

    const { collection, setCollection, resetCollection } = useCollectionStore();

    useEffect(() => {
        if (creditId && creditId !== collection) {
            resetCollection();
            setCollection(creditId);
        } else if (!collection && name) {
            setCollection(name);
        }
    }, [resetCollection, collection, setCollection, creditId, name]);

    const { creditCollection, isLoading: collectionLoading } = useCredit(
        creditType as string,
        creditId as string
    );

    const sortedShows = useMemo(() => {
        if (!creditType || !creditCollection) return [];

        const filteredShows = creditCollection.filter(
            (show: Show) => !excludeShows.some((id) => show.genre_ids.includes(id))
        );

        const uniqueShows = filteredShows?.reduce((acc: Show[], show: Show) => {
            if (!acc.some((existingShow) => existingShow.id === show.id)) {
                acc.push(show);
            }
            return acc;
        }, []);

        return _.orderBy(uniqueShows, ["first_air_date"], ["desc"]);
    }, [creditType, creditCollection]);

    // kr or en
    useEffect(() => {
        setName(
            person
                ? (language === "kr" ? person.also_known_as?.[0] : null) || person.name || ""
                : ""
        );
    }, [language, person]);

    return (
        <div>
            {!personLoading && !personError && person && (
                <div className={styles.header}>
                    <ProfileImage url={getProfileImage(person.profile_path)} />
                    <Header title={name || ""} description={person.known_for_department} />
                </div>
            )}

            {collectionLoading ? (
                <div>loading</div>
            ) : (
                <div className={styles.grid}>
                    {sortedShows?.map((show: Show) => (
                        <ShowCard show={show} key={show.id} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Credit;
