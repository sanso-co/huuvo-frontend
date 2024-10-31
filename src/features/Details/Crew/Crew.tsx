import { Link } from "react-router-dom";

import { useCredits } from "@/hooks/api/details/useCredits";
import { formatUrl } from "@/helpers/formatUrl";

import { List } from "@/components/global/List";

import styles from "./crew.module.scss";

interface Props {
    id: string;
}

export const Crew = ({ id }: Props) => {
    const { credits } = useCredits(Number(id));

    if (!credits?.length) {
        return null;
    }

    return (
        <div className={styles.container}>
            <h3>Credits</h3>
            <List>
                {credits?.map((crew) => {
                    const name = formatUrl(crew.name ?? "");
                    return (
                        <Link to={`/credit/${name}/${crew.id}`} key={crew.id}>
                            <List.Item title={crew.job} value={crew.name} />
                        </Link>
                    );
                })}
            </List>
        </div>
    );
};
