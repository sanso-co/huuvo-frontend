import { Stack } from "@/components/global/Stack";
import { List } from "@/components/global/List";
import { CrewType } from "@/types/credit";
import { Link } from "react-router-dom";

interface Props {
    data: CrewType[];
}

export const Crew = ({ data }: Props) => {
    const filteredCrew = data.filter(
        (crew) =>
            crew.jobs[0].job === "Director" ||
            crew.jobs[0].job === "Screenplay" ||
            crew.jobs[0].job === "Writer"
    );

    return (
        <Stack border gap="1rem" padding="2rem 1rem">
            <h3>Credits</h3>
            <List>
                {filteredCrew.map((crew: CrewType) => {
                    const job = crew.jobs[0].job;

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
