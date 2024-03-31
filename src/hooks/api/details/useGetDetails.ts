import { Keyword } from "@/helpers/interface/keyword";
import useTMDBGet from "../useTMDBData";
import useGet from "../useData";
import { Show } from "@/helpers/interface/show";

export const useGetDetails = (id: string) => useTMDBGet(`/tv/${id}`, (data) => data as Show);

export const useGetKeywords = (id: string) =>
  useTMDBGet(`/tv/${id}/keywords`, (data) => ({
    id: data.id,
    results: data.results as Keyword[],
  }));

export const useGetKeywordList = () =>
  useGet("keywords", (data) => ({
    results: data.results as Keyword[],
  }));
