import { List } from "@/components/global/List";

import styles from "./original.module.scss";

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
        <div className={styles.container}>
            <h3>Original Story</h3>
            <List>
                <List.Item title={data.title.title} value={data.author.name} />
            </List>
        </div>
    );
};
