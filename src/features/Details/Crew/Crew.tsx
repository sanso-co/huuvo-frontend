import { Link } from "react-router-dom";

import { useCredits } from "@/hooks/api/details/useCredits";
import { formatUrl } from "@/helpers/formatUrl";

import { List } from "@/components/global/List";

import details from "@/assets/styles/details.module.scss";
import layout from "@/assets/styles/layout.module.scss";

interface Props {
    id: string;
}

export const Crew = ({ id }: Props) => {
    const { credits } = useCredits(Number(id));

    if (!credits?.length) {
        return null;
    }

    return (
        <div className={`${details.section} ${layout.default} ${layout.max}`}>
            <div className={details.header}>
                <h3>Credits</h3>
            </div>

            <List>
                {credits?.map((crew) => {
                    const name = formatUrl(crew.name ?? "");
                    return (
                        <Link to={`/crew/${name}/${crew.id}`} key={crew.id}>
                            <List.Item title={crew.job} value={crew.name} />
                        </Link>
                    );
                })}
            </List>
        </div>
    );
};
