export const generateFAQSchema = (
    pageType: string,
    streamingProviders?: string[],
    keywords?: string[],
    dramas?: string[],
    name?: string,
    year?: string | number
) => {
    let faq: any[] = [];

    switch (pageType) {
        case "home":
            faq = [
                {
                    "@type": "Question",
                    name: "Where can I watch Korean dramas online?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "You can watch Korean dramas on streaming platforms like Netflix, Viki, Hulu, etc.",
                    },
                },
                {
                    "@type": "Question",
                    name: "What are the most popular Korean dramas right now?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Some of the most popular Korean dramas include ${
                            dramas?.slice(0, 5).join(", ") || "various trending dramas"
                        }.`,
                    },
                },
            ];
            break;

        case "details":
            faq = [
                {
                    "@type": "Question",
                    name: `Where can I watch ${name}?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${name} is available on ${
                            streamingProviders?.join(", ") || "various streaming platforms"
                        }.`,
                    },
                },
            ];
            if (keywords && keywords.length > 0) {
                faq.push({
                    "@type": "Question",
                    name: `What themes does ${name} explore?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${name} explores themes like ${keywords.slice(0, 3).join(", ")}.`,
                    },
                });
            }
            break;

        case "genre":
            faq = [
                {
                    "@type": "Question",
                    name: `Where can I watch ${name} K-Dramas?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `You can watch ${name} dramas on Netflix, Viki, Hulu, etc.`,
                    },
                },
            ];
            if (dramas && dramas.length > 0) {
                faq.push({
                    "@type": "Question",
                    name: `What are the best ${name} K-Dramas?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Some of the best ${name} dramas include ${
                            dramas?.slice(0, 5).join(", ") || "various popular dramas"
                        }.`,
                    },
                });
            }
            break;

        case "year":
            faq = [
                {
                    "@type": "Question",
                    name: `Where can I watch ${name} K-Dramas?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Most K-dramas from ${name} are available on platforms like Netflix, Viki, Hulu, etc.`,
                    },
                },
            ];
            if (dramas && dramas.length > 0) {
                faq.push({
                    "@type": "Question",
                    name: `What are the best K-Dramas? of ${year}`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Some of the best Korean dramas released in ${year} include ${
                            dramas?.slice(0, 5).join(", ") || "various must-watch series"
                        }.`,
                    },
                });
            }
            break;

        case "keyword":
            faq = [
                {
                    "@type": "Question",
                    name: `Where can I watch ${name} themed K-Dramas?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `You can watch ${name} themed dramas on Netflix, Viki, Hulu, etc.`,
                    },
                },
            ];
            if (dramas && dramas.length > 0) {
                faq.push({
                    "@type": "Question",
                    name: `What are the best K-Dramas with ${name} theme?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Some of the best K-Dramas exploring ${name} themes include ${
                            dramas?.slice(0, 5).join(", ") || "various highly-rated dramas"
                        }.`,
                    },
                });
            }
            break;

        case "provider":
            faq = [
                {
                    "@type": "Question",
                    name: `Does ${name} have a good selection of K-Dramas?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${name} offers a variety of Korean dramas, including popular hits and original productions.`,
                    },
                },
            ];
            if (dramas && dramas.length > 0) {
                faq.push({
                    "@type": "Question",
                    name: `What are the best K-Dramas available on ${name}?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `Some of the best K-Dramas on ${name} include ${
                            dramas?.slice(0, 5).join(", ") || "various hit series"
                        }."
                        }.`,
                    },
                });
            }
            break;

        case "discover":
            faq = [
                {
                    "@type": "Question",
                    name: "How can I find the perfect K-Drama to watch?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "You can use the discover page to filter by genre, tone, streaming service, and other options to find your ideal drama.",
                    },
                },
                {
                    "@type": "Question",
                    name: "Can I get personalized K-Drama recommendations?",
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: "Yes! The discover page helps users find dramas based on their preferences.",
                    },
                },
            ];
            break;

        case "collection":
            faq = [
                {
                    "@type": "Question",
                    name: `Why are ${name} K-Dramas popular?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `${name} dramas are known for their strong storytelling, memorable characters, and emotional depth.`,
                    },
                },
            ];
            if (dramas && dramas.length > 0) {
                faq.push({
                    "@type": "Question",
                    name: `What are the best ${name} K-Dramas?`,
                    acceptedAnswer: {
                        "@type": "Answer",
                        text: `The best ${name} Korean dramas include ${
                            dramas?.slice(0, 5).join(", ") || "various top-rated shows"
                        }.`,
                    },
                });
            }
            break;

        default:
            faq = [];
    }

    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faq,
    };
};
