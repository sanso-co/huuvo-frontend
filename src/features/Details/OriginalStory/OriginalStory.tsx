import { List } from "@/components/global/List";

import details from "@/assets/styles/details.module.scss";
import layout from "@/assets/styles/layout.module.scss";

interface Props {
    data: {
        author: {
            name: string;
            korean_name: string;
        };
        title: {
            title: string;
            korean_title: string;
        };
    };
}

export const OriginalStory = ({ data }: Props) => {
    return (
        <div className={`${layout.default} ${layout.max} ${details.section}`}>
            <div className={details.header}>
                <h3>Original Story</h3>
            </div>
            <List>
                <List.Item title={data.title.title} value={data.author.name} />
            </List>
        </div>
    );
};
