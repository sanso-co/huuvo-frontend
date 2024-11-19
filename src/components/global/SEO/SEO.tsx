import { truncateDescription } from "@/helpers/formatSeo";
import { Helmet } from "react-helmet-async";

interface Props {
    title: string;
    description?: string;
    keywords?: string;
}

export const SEO = ({ title, description, keywords }: Props) => {
    const metaDescription = truncateDescription(description || "");

    return (
        <Helmet>
            <title>{title} | K-lama</title>
            <meta name="description" content={metaDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={metaDescription} />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
};
