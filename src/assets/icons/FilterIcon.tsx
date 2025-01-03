import { IconType } from "./type";

export const FilterIcon = ({ width = 24, height = 24, stroke = 1, color = "#000" }: IconType) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                d="M12 16L21 16"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 16H5"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8.5 18.5C9.88071 18.5 11 17.3807 11 16C11 14.6193 9.88071 13.5 8.5 13.5C7.11929 13.5 6 14.6193 6 16C6 17.3807 7.11929 18.5 8.5 18.5Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19 8H21"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M3 8H12"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M15.5 10.5C16.8807 10.5 18 9.38071 18 8C18 6.61929 16.8807 5.5 15.5 5.5C14.1193 5.5 13 6.61929 13 8C13 9.38071 14.1193 10.5 15.5 10.5Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
