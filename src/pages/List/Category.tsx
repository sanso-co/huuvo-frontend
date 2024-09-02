import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Show } from "@/types/show";

import { ShowCard } from "@/components/feature/ShowCard";
import { Header } from "@/components/global/Header";
import Pagination from "@/components/global/Pagination";
import { useCategoryShowList } from "@/hooks/api/category/useCategoryShowList";

import styles from "./list.module.scss";

export const Category = () => {
    const { categoryType, categoryName, categoryId } = useParams();
    const [page, setPage] = useState(1);

    const { categoryShowList, loading, error } = useCategoryShowList(categoryType as string, categoryId as string, page);

    //TODO: fetch category details and update header
    //TODO: add filter and sort
    // const [sort, setSort] = useState("first_air_date.desc");

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div>
            {categoryName && <Header title={categoryName} description={`Shows with ${categoryType} ${categoryName}`} />}

            <div className={styles.grid}>
                {categoryShowList?.results?.map((show: Show) => (
                    <Link to={`/details/${show.id}`} key={show.id}>
                        <ShowCard show={show} />
                    </Link>
                ))}
            </div>
            <Pagination
                currentPage={categoryShowList?.page || 1}
                totalPages={categoryShowList?.total_pages || 1}
                onPageChange={(page) => setPage(page)}
            />
        </div>
    );
};
