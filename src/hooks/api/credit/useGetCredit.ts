import useTMDBGet from "../useTMDBData";
import { CastType, PersonCreditsType, CrewType, Person } from "@/helpers/interface/credit";

export const useGetCrew = (id: string) =>
  useTMDBGet(`/tv/${id}/aggregate_credits?language=en-US`, (data) => ({
    results: data.crew.filter(
      (crew: CrewType) => crew.jobs[0].job === "Director" || crew.jobs[0].job === "Writer" || crew.jobs[0].job === "Screenplay"
    ),
  }));

export const useGetCast = (id: string) =>
  useTMDBGet(`/tv/${id}/aggregate_credits?language=en-US`, (data) => ({
    results: data.cast as CastType[],
  }));

export const useGetPersonDetails = (id: string) =>
  useTMDBGet(`/person/${id}?language=en-US`, (data) => ({
    results: data as Person,
  }));

export const useGetShowsByPerson = (id: string) =>
  useTMDBGet(`/person/${id}/tv_credits?language=en-US`, (data) => data as PersonCreditsType);
