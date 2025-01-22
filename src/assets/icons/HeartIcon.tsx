import { IconType } from "./type";

export const HeartIcon = ({
    width = 24,
    height = 24,
    stroke = 1,
    color = "#000",
    fill = "none",
}: IconType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill={fill}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M12 20C12 20 3 14.9875 3 8.97234C3 2.95722 10 2.45597 12 7.16221C14 2.45597 21 2.95722 21 8.97234C21 14.9875 12 20 12 20Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
