import { useState } from "react";
import { useParams } from "react-router-dom";
import { Show } from "@/helpers/interface/show";

import { useGetCategory } from "@/hooks/api/category/useGetCategory";

import { ShowCard } from "@/components/feature/ShowCard";
import { Grid } from "@/components/global/containers/Grid";
import { Header } from "@/components/global/Header";
import Pagination from "@/components/global/Pagination";
import { useGetGenresList } from "@/hooks/api/genres/useGetGenre";

export const Genre = () => {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, loading } = useGetCategory("genres", id as string, page);
  const { data: genreList } = useGetGenresList();

  const genre = genreList?.results.find((genre) => genre.id === parseInt(id as string));

  return (
    <div>
      {genre && <Header title={genre?.name} description={`Shows with Genre ${genre?.name}`} />}

      {loading ? (
        <div>loading</div>
      ) : (
        <>
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
