import { useParams } from "react-router-dom";

import { useGetPersonDetails, useGetShowsByPerson } from "@/hooks/api/credit/useGetCredit";

import { ShowCard } from "@/components/feature/ShowCard";
import { Grid } from "@/components/global/containers/Grid";
import { Header } from "@/components/global/Header";
import { ShowAsCrew } from "@/helpers/interface/credit";
import { useEffect, useState } from "react";
import { useGeneralStore } from "@/store/useStore";

export const Crew = () => {
  const { id } = useParams();
  const language = useGeneralStore((state) => state.language);
  const { data: person } = useGetPersonDetails(id as string);
  const { data, loading } = useGetShowsByPerson(id as string);
  const [name, setName] = useState(person?.results.name);

  const filteredShows = data?.crew?.filter((show: ShowAsCrew, index, self) => index === self.findIndex((s) => s.id === show.id));

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
            {filteredShows?.map((show: ShowAsCrew) => (
              <ShowCard key={show.credit_id} show={show} url={`/details/${show.id}`} />
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};
