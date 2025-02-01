export const generateFAQSchema = (
    title: string,
    streamingProviders?: string[],
    keywords?: string[]
) => {
    const faq = [
        {
            "@type": "Question",
            name: `Where can I watch ${title}?`,
            acceptedAnswer: {
                "@type": "Answer",
                text: `${title} is available on ${
                    streamingProviders?.join(", ") || "various streaming platforms"
                }.`,
            },
        },
    ];

    if (keywords && keywords.length > 0) {
        faq.push({
            "@type": "Question",
            name: `What themes does ${title} explore?`,
            acceptedAnswer: {
                "@type": "Answer",
                text: `${title} explores themes like ${keywords.slice(0, 3).join(", ")}.`,
            },
        });
    }

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq,
    };
};
