import { generateFAQSchema } from "@/helpers/generateFAQSchema";
import { useGetProvidersForShow } from "@/hooks/api/details/useProviders";
import { KeywordType } from "@/types/showDetail";
import { Helmet } from "react-helmet-async";

interface Props {
    title: string;
    keywords?: KeywordType[];
    image?: string;
    id: number;
}

export const SEO = ({ title, keywords, image, id }: Props) => {
    const { providers } = useGetProvidersForShow(id);

    const keywordDramas = () => {
        if (keywords && keywords.length > 0) {
            return ", " + keywords.map((kw) => `${kw.name} Kdrama`).join(", ");
        } else {
            return "";
        }
    };

    const metaDescription = `Discover and watch best Korean dramas, including ${title}, with cast details and streaming information.`;
    const metaKeywords = `${title}, ${title} Kdrama, Where to watch ${title} ${keywordDramas()}`;

    const FAQSchema = generateFAQSchema(
        title,
        providers?.map((provider) => provider.name),
        keywords?.map((keyword) => keyword.name)
    );

    return (
        <Helmet>
            <title>{title} | Where to Watch & Similar Dramas| K-lama</title>
            <meta name="description" content={metaDescription} />
            <meta name="keywords" content={metaKeywords} />
            <meta property="og:image" content={image} />
            <meta property="og:type" content="website" />
            <meta property="og:url" content={`https://k-lama.com/details/${id}`} />
            <meta property="og:site_name" content="K-lama" />
            <link rel="canonical" href={`https://k-lama.com/details/${id}`} />
            <script type="application/ld+json">{JSON.stringify(FAQSchema)}</script>
        </Helmet>
    );
};
