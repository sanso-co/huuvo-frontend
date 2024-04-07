import { useEffect, useState } from "react";
import { useGeneralStore } from "@/store/useStore";
import { useParams } from "react-router-dom";
import _ from "lodash";

import { useGetPersonDetails, useGetShowsByPerson } from "@/hooks/api/credit/useGetCredit";
import { ShowAsCast } from "@/helpers/interface/credit";

import { ShowCard } from "@/components/feature/ShowCard";
import { Grid } from "@/components/global/containers/Grid";
import { Header } from "@/components/global/Header";

export const Cast = () => {
  const { id } = useParams();
  const language = useGeneralStore((state) => state.language);
  const { data: person } = useGetPersonDetails(id as string);
  const { data, loading } = useGetShowsByPerson(id as string);
  const [name, setName] = useState(person?.results.name);

  const excludeShows = [10764, 10767];

  const filteredShows = data?.cast?.filter((show: ShowAsCast) => {
    if (show.genre_ids) {
      return !excludeShows.some((id) => show?.genre_ids?.includes(id));
    }
    return true;
  });

  const sortedShows = _.sortBy(filteredShows, (show) => new Date(show.first_air_date)).reverse();

  console.log(filteredShows);

  // kr or en
  useEffect(() => {
    setName(language === "kr" ? person?.results.also_known_as[0] || person?.results.name : person?.results.name);
  }, [language, person]);

  return (
    <div>
      {person && <Header title={name || ""} description={person?.results.known_for_department} />}

      {loading ? (
        <div>loading</div>
      ) : (
        <>
          <Grid col={2}>
            {sortedShows?.map((show: ShowAsCast) => (
              <ShowCard key={show.credit_id} show={show} url={`/details/${show.id}`} />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
