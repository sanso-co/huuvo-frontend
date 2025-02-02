export const SEO_CONTENT = {
    siteName: "K-lama",

    titles: {
        home: "Find Your Next Favorite Korean Drama",
        details: (title: string) => `${title} | Where to Watch & Similar Dramas | K-lama`,
        genre: (genre: string) => `Best ${genre} Korean Dramas | Top ${genre} K-Dramas to Watch`,
        year: (year: string | number) => `Best Korean Dramas of ${year} | Top ${year} K-Dramas`,
        provider: (provider: string) =>
            `Best Korean Dramas on ${provider} | Where to Watch K-Dramas`,
        keyword: (keyword: string) => `Best ${keyword} Korean Dramas | Must-Watch K-Dramas`,
        cast: (cast: string) => `${cast} Korean Dramas List | Best K-Dramas Starring ${cast}`,
        crew: (crew: string) => `Korean Dramas created by ${crew} | ${crew} K-Dramas List`,
        discover: "Discover the Best Korean Dramas",
        default: "K-lama",
    },

    descriptions: {
        home: "Discover the best Korean dramas, from trending hits to timeless classics. Find where to watch K-dramas, explore keywords, and get personalized recommendations.",
        details: (name: string) =>
            `Watch ${name} Korean drama. Find out where to stream, explore similar shows, and discover related K-dramas.`,
        genre: (genre: string) =>
            `Discover the best ${genre} Korean dramas, from classics to trending hits. Find where to watch, see highly-rated picks, and explore similar shows.`,
        year: (year: string | number) =>
            `Find the best Korean dramas released in ${year}. Explore top-rated and trending K-dramas from ${year} and discover where to watch.`,
        provider: (provider: string) =>
            `Explore the best K-dramas available on ${provider}. Find trending and must-watch series streaming now.`,
        keyword: (keyword: string) =>
            `Browse Korean dramas themed ${keyword}, featuring must-watch series related to ${keyword}. Find where to stream and explore related dramas.`,
        cast: (cast: string) =>
            `Explore the best Korean dramas starring ${cast}, featuring must-watch performances and top-rated series. Find out where to watch ${cast}’s dramas.`,
        crew: (crew: string) =>
            `Discover Korean dramas created by ${crew}, featuring top-rated series and must-watch productions. Browse ${crew}’s best work and find out where to watch.`,
        collection: (collection: string) =>
            `Browse our curated ${collection} K-dramas, featuring top-rated and trending series. Find out where to watch them now.`,
        discover:
            "Find your next favorite K-drama with our discover page, featuring personalized recommendations and filters by genre, tone, and streaming service.",
        default:
            "Discover the best Korean dramas, from trending hits to timeless classics. Find where to watch K-dramas, explore keywords, and get personalized recommendations.",
    },

    keywords: {
        home: "Korean dramas, K-dramas, best Kdramas, trending Korean series, watch Kdramas online, top-rated Kdramas, new Korean dramas, Kdrama recommendations",
        details: (name: string) =>
            `${name}, ${name} Kdrama, ${name} cast, ${name} streaming, where to watch ${name}, similar to ${name}, best Korean dramas`,
        genre: (genre: string) =>
            `Best ${genre} Korean dramas, top ${genre} Kdramas, must-watch ${genre} K-dramas, ${genre} Kdrama list, Korean ${genre} series`,
        year: (year: string | number) =>
            `Best ${year} Kdramas, top Korean dramas ${year}, must-watch K-dramas ${year}, ${year} Kdrama list, new K-dramas ${year}`,
        provider: (provider: string) =>
            `Best Kdramas on ${provider}, watch Korean dramas on ${provider}, top K-dramas streaming on ${provider}, ${provider} K-drama list`,
        keyword: (keyword: string) =>
            `Best ${keyword} Kdramas, K-dramas about ${keyword}, must-watch ${keyword} dramas, ${keyword} themed Kdramas`,
        cast: (cast: string) =>
            `${cast} dramas, ${cast} Kdramas, best dramas starring ${cast}, top Kdramas with ${cast}, must-watch ${cast} shows, ${cast} Korean series`,
        crew: (crew: string) =>
            `${crew} dramas, Korean dramas by ${crew}, ${crew} best work, top Kdramas directed by ${crew}, must-watch ${crew} shows, ${crew} writer dramas`,
        collection: (collection: string) =>
            `Best ${collection} Kdramas, must-watch ${collection} dramas, highly rated Korean dramas, top ${collection} Kdramas`,
        discover:
            "Discover Kdramas, find Korean dramas, personalized Kdrama recommendations, best Kdrama search tool, explore Korean dramas",
        default:
            "Korean dramas, K-dramas, best Kdramas, trending Korean series, watch Kdramas online, top-rated Kdramas, new Korean dramas, Kdrama recommendations",
    },

    urls: {
        base: "https://k-lama.com",
        details: (id: number | string) => `/details/${id}`,
        category: (type: string, genre: string, id: string | number) => `/${type}/${genre}/${id}`,
        collection: (name: string) => `/collection/${name}`,
        year: (year: string | number) => `/year/released/${year}`,
        discover: "/discover",
        default: "K-lama",
    },
};
