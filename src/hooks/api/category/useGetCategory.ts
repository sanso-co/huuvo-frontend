import useTMDBGet from "../useTMDBData";

export const useGetCategory = (section: string, id: string, page: number) =>
  useTMDBGet(
    `/discover/tv?page=${page}&with_origin_country=KR&with_${section}=${id}`,
    (data) => ({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    }),
    {},
    [page]
  );
