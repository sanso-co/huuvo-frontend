import { Chip } from "@/components/global/Chip";

import { KeywordType } from "@/types/showDetail";

import styles from "./keyword.module.scss";
import details from "@/assets/styles/details.module.scss";
import { formatUrl } from "@/helpers/formatUrl";

interface Props {
    keywords: KeywordType[];
}

export const Keyword = ({ keywords }: Props) => {
    if (!keywords?.length) {
        return null;
    }

    return (
        <div className={details.section}>
            <div className={details.header}>
                <h3>Keywords</h3>
            </div>
            <div className={styles.content}>
                {keywords?.map((keyword) => (
                    <Chip
                        key={keyword.id}
                        label={keyword.name}
                        url={`/keyword/${formatUrl(keyword.name)}/${keyword.id}`}
                    />
                ))}
            </div>
        </div>
    );
};
