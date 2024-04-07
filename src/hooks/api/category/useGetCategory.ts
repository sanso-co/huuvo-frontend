import useTMDBGet from "../useTMDBData";

export const useGetCategory = (section: string, id: string, page: number, sort?: string | "first_air_date.desc") =>
  useTMDBGet(
    `/discover/tv?page=${page}&with_origin_country=KR&with_${section}=${id}&sort_by=${sort}&with_type=2%7C4`,
    (data) => ({
      page: data.page,
      total_pages: data.total_pages,
      results: data.results,
    }),
    {},
    [page, sort]
  );
