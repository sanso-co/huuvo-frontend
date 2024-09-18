import { Stack } from "@/components/global/Stack";
import { Chip } from "@/components/global/Chip";
import { KeywordType } from "@/types/showDetail";

import styles from "./keyword.module.scss";

interface Props {
    data: KeywordType[];
}

export const Keyword = ({ data }: Props) => {
    return (
        <Stack border gap="1rem" padding="2rem 1rem">
            <h3>Keywords</h3>
            <div className={styles.content}>
                {data?.map((keyword) => (
                    <Chip
                        key={keyword.id}
                        label={keyword.name}
                        url={`/keywords/${keyword.name.toLocaleLowerCase()}/${keyword.id}`}
                    />
                ))}
            </div>
        </Stack>
    );
};
