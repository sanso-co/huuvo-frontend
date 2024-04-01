import useTMDBGet from "../useTMDBData";

export const useGetCategory = (id: string, page: number) =>
  useTMDBGet(
    `/discover/tv?page=${page}&with_origin_country=KR&with_keywords=${id}`,
    (data) => ({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    }),
    {},
    [page]
  );
