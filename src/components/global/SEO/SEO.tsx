import { SEO_CONTENT } from "@/helpers/constants/seo";
import { capitalizeWords, formatName } from "@/helpers/formatName";
import { formatUrl } from "@/helpers/formatUrl";
import { generateFAQSchema } from "@/helpers/generateFAQSchema";
import { useGetProvidersForShow } from "@/hooks/api/details/useProviders";
import { LeanShowType } from "@/types/show";
import { KeywordType } from "@/types/showDetail";
import { Helmet } from "react-helmet-async";

interface Props {
    pageType: string;
    name?: string;
    dramas?: LeanShowType[];
    id?: number | string;
    image?: string;
    keywords?: KeywordType[];
}

export const SEO = ({ pageType, name, dramas, keywords, image, id }: Props) => {
    const { providers } = useGetProvidersForShow(id);

    const getPageTitle = () => {
        switch (pageType) {
            case "home":
                return SEO_CONTENT.titles.home;
            case "details":
                return SEO_CONTENT.titles.details(name ?? "");
            case "genre":
                return SEO_CONTENT.titles.genre(capitalizeWords(name ?? ""));
            case "year":
                return SEO_CONTENT.titles.year(id ?? "");
            case "provider":
                return SEO_CONTENT.titles.provider(formatName(name ?? ""));
            case "keyword":
            case "collection":
                return SEO_CONTENT.titles.keyword(capitalizeWords(name ?? ""));
            case "cast":
                return SEO_CONTENT.titles.cast(formatName(name ?? ""));
            case "crew":
                return SEO_CONTENT.titles.crew(formatName(name ?? ""));
            case "discover":
                return SEO_CONTENT.titles.discover;
            default:
                return SEO_CONTENT.titles.default;
        }
    };

    const getMetaDescription = () => {
        switch (pageType) {
            case "home":
                return SEO_CONTENT.descriptions.home;
            case "details":
                return SEO_CONTENT.descriptions.details(name ?? "");
            case "genre":
                return SEO_CONTENT.descriptions.genre(capitalizeWords(name ?? ""));
            case "year":
                return SEO_CONTENT.descriptions.year(id ?? "");
            case "provider":
                return SEO_CONTENT.descriptions.provider(formatName(name ?? ""));
            case "keyword":
                return SEO_CONTENT.descriptions.keyword(capitalizeWords(name ?? ""));
            case "cast":
                return SEO_CONTENT.descriptions.cast(formatName(name ?? ""));
            case "crew":
                return SEO_CONTENT.descriptions.crew(formatName(name ?? ""));
            case "collection":
                return SEO_CONTENT.descriptions.collection(name ?? "");
            case "discover":
                return SEO_CONTENT.descriptions.discover;
            default:
                return SEO_CONTENT.descriptions.default;
        }
    };

    const getMetaKeywords = () => {
        switch (pageType) {
            case "home":
                return SEO_CONTENT.keywords.home;
            case "details":
                return SEO_CONTENT.keywords.details(name ?? "");
            case "genre":
                return SEO_CONTENT.keywords.genre(capitalizeWords(name ?? ""));
            case "year":
                return SEO_CONTENT.keywords.year(id ?? "");
            case "provider":
                return SEO_CONTENT.keywords.provider(formatName(name ?? ""));
            case "keyword":
                return SEO_CONTENT.keywords.keyword(capitalizeWords(name ?? ""));
            case "cast":
                return SEO_CONTENT.keywords.cast(formatName(name ?? ""));
            case "crew":
                return SEO_CONTENT.keywords.crew(formatName(name ?? ""));
            case "collection":
                return SEO_CONTENT.keywords.collection(name ?? "");
            case "discover":
                return SEO_CONTENT.keywords.discover;
            default:
                return SEO_CONTENT.keywords.default;
        }
    };

    const getCanonicalUrl = () => {
        const baseUrl = SEO_CONTENT.urls.base;
        switch (pageType) {
            case "details":
                return `${baseUrl}${SEO_CONTENT.urls.details(id ?? "")}`;
            case "year":
                return `${baseUrl}${SEO_CONTENT.urls.year(id ?? "")}`;
            case "collection":
                return `${baseUrl}${SEO_CONTENT.urls.collection(formatUrl(name ?? ""))}`;
            case "genre":
            case "provider":
            case "keyword":
            case "cast":
            case "crew":
                return `${baseUrl}${SEO_CONTENT.urls.category(pageType, name ?? "", id ?? "")}`;
            case "discover":
                return `${baseUrl}${SEO_CONTENT.urls.discover}`;
            default:
                return baseUrl;
        }
    };

    const fullTitle = getPageTitle();
    const metaDescription = getMetaDescription();
    const metaKeywords = getMetaKeywords();
    const canonicalUrl = getCanonicalUrl();

    const FAQSchema = generateFAQSchema(
        pageType === "category" ? name ?? "" : pageType,
        providers?.map((provider) => provider.name),
        keywords?.map((keyword) => keyword.name),
        pageType === "home" ? dramas?.map((drama) => drama.name) : undefined,
        name,
        id
    );

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:site_name" content={SEO_CONTENT.siteName} />
            <link rel="canonical" href={canonicalUrl} />
            {FAQSchema && <script type="application/ld+json">{JSON.stringify(FAQSchema)}</script>}
        </Helmet>
    );
};
