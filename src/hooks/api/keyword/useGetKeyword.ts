import { KeywordType } from "@/helpers/interface/keyword";
import useGet from "../useData";
import useTMDBGet from "../useTMDBData";

export const useGetKeywordList = () =>
  useGet("keywords", (data) => ({
    results: data.results as KeywordType[],
  }));

export const useGetKeyword = (id: string) =>
  useTMDBGet(`/keyword/${id}`, (data) => ({
    id: data.id,
    name: data.name,
  }));
