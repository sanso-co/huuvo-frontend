import { List } from "@/components/global/List";

import details from "@/assets/styles/details.module.scss";
import layout from "@/assets/styles/layout.module.scss";
import { useOriginal } from "@/hooks/api/details/useOriginal";
import { formatUrl } from "@/helpers/formatUrl";
import { Link } from "react-router-dom";

interface Props {
    id: string;
}

export const OriginalStory = ({ id }: Props) => {
    const { original } = useOriginal(Number(id));

    if (!original?.hasOriginalWork) {
        return null;
    }
    console.log(original);

    const name = formatUrl(original.author.name ?? "");

    return (
        <div className={`${layout.default} ${layout.max} ${details.section}`}>
            <div className={details.header}>
                <h3>Original Story</h3>
            </div>
            <List>
                <Link to={`/crew/${name}/${original.author.id}`} key={original.author.id}>
                    <List.Item title={original.title} value={original.author.name} />
                </Link>
            </List>
        </div>
    );
};
