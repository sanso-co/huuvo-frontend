import useTMDBGet from "../useTMDBData";
import { CreditShow, Crew, Person } from "@/helpers/interface/credit";

export const useGetCrew = (id: string) =>
  useTMDBGet(`/tv/${id}/aggregate_credits?language=en-US`, (data) => ({
    results: data.crew.filter(
      (crew: Crew) => crew.jobs[0].job === "Director" || crew.jobs[0].job === "Writer" || crew.jobs[0].job === "Screenplay"
    ),
  }));

export const useGetPerson = (id: string) =>
  useTMDBGet(`/person/${id}?language=en-US`, (data) => ({
    results: data as Person,
  }));

export const useGetShowsByPerson = (id: string) =>
  useTMDBGet(`/person/${id}/tv_credits?language=en-US`, (data) => ({
    results: data.crew as CreditShow[],
  }));
