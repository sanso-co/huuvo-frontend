import useTMDBGet from "../useTMDBData";
import { Crew } from "@/helpers/interface/credit";

export const useGetCrew = (id: string) =>
  useTMDBGet(`/tv/${id}/aggregate_credits?language=en-US`, (data) => ({
    results: data.crew.filter(
      (crew: Crew) => crew.jobs[0].job === "Director" || crew.jobs[0].job === "Writer" || crew.jobs[0].job === "Screenplay"
    ),
  }));
