import { Stack } from "@/components/global/containers/Stack";
import { List } from "@/components/global/List";
import { CrewType } from "@/helpers/interface/credit";
import { Link } from "react-router-dom";

interface Props {
  data: CrewType[];
}

export const Crew = ({ data }: Props) => {
  return (
    <Stack border gap={1} padding="2rem 1rem">
      <h3>Credits</h3>
      <List>
        {data.map((crew: CrewType) => (
          <Link to={`/credit/${crew.id}`} key={crew.id}>
            <List.Item title={crew.jobs[0].job} value={crew.name} />
          </Link>
        ))}
      </List>
    </Stack>
  );
};
