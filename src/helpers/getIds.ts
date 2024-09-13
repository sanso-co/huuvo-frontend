import { Genre } from "@/types/details";

export const getGenres = (genres: Genre[] | undefined): string => {
    if (!genres || genres.length === 0) {
        return "";
    }

    const limitedGenres = genres.slice(0, 2);
    return limitedGenres.map((genre) => genre.id).join(",");
};
