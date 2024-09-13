import { Stack } from "@/components/global/Stack";
import { List } from "@/components/global/List";
import { CrewType } from "@/types/credit";
import { Link } from "react-router-dom";

interface Props {
    data: CrewType[];
}

export const Crew = ({ data }: Props) => {
    return (
        <Stack border gap="1rem" padding="2rem 1rem">
            <h3>Credits</h3>
            <List>
                {data.map((crew: CrewType) => {
                    const job =
                        crew.jobs.find((job) => job.job === "Director" || job.job === "Screenplay")
                            ?.job || crew.jobs[0].job;

                    return (
                        <Link to={`/credit/crew/${crew.id}`} key={crew.id}>
                            <List.Item title={job} value={crew.name} />
                        </Link>
                    );
                })}
            </List>
        </Stack>
    );
};
