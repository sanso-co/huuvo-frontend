import { IconType } from "./type";

export const UserIcon = ({ width = 24, height = 24, stroke = 1, color = "#000" }: IconType) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M5 21C5 18.7909 8.13401 17 12 17C15.866 17 19 18.7909 19 21"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M12 13C14.7614 13 17 10.7614 17 8C17 5.23858 14.7614 3 12 3C9.23858 3 7 5.23858 7 8C7 10.7614 9.23858 13 12 13Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
