import { Stack } from "@/components/global/Stack";
import { Chip } from "@/components/global/Chip";

import styles from "./keyword.module.scss";
import { CustomKeywordType } from "@/types/keyword";

interface Props {
    keywords: CustomKeywordType[];
}

export const Keyword = ({ keywords }: Props) => {
    if (!keywords?.length) {
        return null;
    }

    return (
        <Stack border gap="1rem" padding="2rem 1rem">
            <h3>Keywords</h3>
            <div className={styles.content}>
                {keywords?.map((keyword) => (
                    <Chip
                        key={keyword.id}
                        label={keyword.name}
                        url={`/keyword/${keyword.name.toLocaleLowerCase()}/${keyword.id}`}
                    />
                ))}
            </div>
        </Stack>
    );
};
