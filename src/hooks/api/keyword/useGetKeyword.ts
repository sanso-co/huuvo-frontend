import { Keyword } from "@/helpers/interface/keyword";
import useGet from "../useData";
import useTMDBGet from "../useTMDBData";

export const useGetKeywordList = () =>
  useGet("keywords", (data) => ({
    results: data.results as Keyword[],
  }));

export const useGetKeyword = (id: string) =>
  useTMDBGet(`/keyword/${id}`, (data) => ({
    id: data.id,
    name: data.name,
  }));
