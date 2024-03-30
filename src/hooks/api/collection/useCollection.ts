import { CollectionGroup } from "@/helpers/interface/collection";
import useGet from "../useData";

export const useGetCollectionGroup = (id: string, status?: number) =>
  useGet(
    `/collection-group/${id}`,
    (data) => ({
      results: data.results as CollectionGroup,
    }),
    {},
    [status]
  );
