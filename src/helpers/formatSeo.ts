export const truncateDescription = (text: string, maxLength: number = 160): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;

    const truncated = text.slice(0, maxLength);
    const lastSpace = truncated.lastIndexOf(" ");

    return `${truncated.slice(0, lastSpace)}...`;
};
