import { useState } from "react";
import { useParams } from "react-router-dom";
import { Show } from "@/helpers/interface/show";

import { useGetCategory } from "@/hooks/api/category/useGetCategory";

import { ShowCard } from "@/components/feature/ShowCard";
import { Grid } from "@/components/global/containers/Grid";
import { Header } from "@/components/global/Header";
import { useGetKeyword } from "@/hooks/api/keyword/useGetKeyword";
import Pagination from "@/components/global/Pagination";
import { Filter } from "@/components/global/Filter";

export const Keyword = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("first_air_date.desc");
  const { data, loading } = useGetCategory("keywords", id as string, page, sort);
  const { data: keyword } = useGetKeyword(id as string);

  const onSortClick = (sort: string) => {
    setSort(sort);
  };

  return (
    <div>
      {keyword && <Header title={keyword?.name} description={`Shows with keyword ${keyword?.name}`} />}

      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <Filter onOptionClick={(sort) => onSortClick(sort)} />
          <Grid col={2}>
            {data?.results?.map((show: Show) => (
              <ShowCard key={show.id} show={show} url={`/details/${show.id}`} />
            ))}
          </Grid>
          <Pagination currentPage={data?.page} totalPages={data?.total_pages} onPageChange={(page) => setPage(page)} />
        </>
      )}
    </div>
  );
};
