import { Keyword } from "@/helpers/interface/keyword";
import useTMDBGet from "../useTMDBData";
import useGet from "../useData";
import { Show, Video } from "@/helpers/interface/show";

export const useGetDetails = (id: string) => useTMDBGet(`/tv/${id}`, (data) => data as Show);

export const useGetProviders = (id: string) =>
  useTMDBGet(`/tv/${id}/watch/providers`, (data) => ({
    id: data.id,
    results: data.results,
  }));

export const useGetKeywords = (id: string) =>
  useTMDBGet(`/tv/${id}/keywords`, (data) => ({
    id: data.id,
    results: data.results as Keyword[],
  }));

export const useGetKeywordList = () =>
  useGet("keywords", (data) => ({
    results: data.results as Keyword[],
  }));

export const useGetVideo = (id: string) =>
  useTMDBGet(`/tv/${id}/videos?language=en-US'`, (data) => ({
    id: data.id,
    results: data.results as Video[],
  }));
