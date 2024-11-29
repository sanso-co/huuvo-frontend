import { IconType } from "./type";

export const ChevronRightIcon = ({
    width = 24,
    height = 24,
    stroke = 1.5,
    color = "#17191F",
}: IconType) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M9 5L16 12L9 19"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
