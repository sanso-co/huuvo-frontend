import { useGetKeywords } from "@/hooks/api/details/useKeywords";

import { Stack } from "@/components/global/Stack";
import { Chip } from "@/components/global/Chip";

import styles from "./keyword.module.scss";

interface Props {
    id: string;
}

export const Keyword = ({ id }: Props) => {
    const { keywords, isLoading, error } = useGetKeywords(Number(id));

    if (!keywords?.length) {
        return null;
    }

    if (isLoading) return <div>Loading keywords...</div>;
    if (error) return <div>Failed to load keywords</div>;

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
