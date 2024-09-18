import { useMemo } from "react";
import { Link } from "react-router-dom";

import { useCrew } from "@/hooks/api/credit/useCrew";

import { List } from "@/components/global/List";
import { CrewType } from "@/types/credit";

import styles from "./crew.module.scss";

interface Props {
    id: number;
}

export const Crew = ({ id }: Props) => {
    const { crew } = useCrew(id);

    const filteredCrew = useMemo(() => {
        return crew?.filter(
            (person) =>
                person.jobs[0].job === "Director" ||
                person.jobs[0].job === "Screenplay" ||
                person.jobs[0].job === "Writer"
        );
    }, [crew]);

    return (
        <div className={styles.container}>
            <h3>Credits</h3>
            <List>
                {filteredCrew?.map((crew: CrewType) => {
                    const job = crew.jobs[0].job;

                    return (
                        <Link to={`/credit/crew/${crew.id}`} key={crew.id}>
                            <List.Item title={job} value={crew.name} />
                        </Link>
                    );
                })}
            </List>
        </div>
    );
};
