interface Genre {
    id: number;
    name: string;
}

export const formatGenres = (genres: Genre[] | undefined): string[] => {
    return genres?.map((genre) => genre.id.toString()) || [];
};
