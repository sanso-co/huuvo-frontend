import { IconType } from "./type";

export const LockIcon = ({ width = 24, height = 24, stroke = 1, color = "#000" }: IconType) => {
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
                d="M8 11V7.88889C8 6.85749 8.42143 5.86834 9.17157 5.13903C9.92172 4.40972 10.9391 4 12 4C13.0609 4 14.0783 4.40972 14.8284 5.13903C15.5786 5.86834 16 6.85749 16 7.88889V11"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M5 12C5 11.4477 5.44772 11 6 11H18C18.5523 11 19 11.4477 19 12V20C19 20.5523 18.5523 21 18 21H6C5.44772 21 5 20.5523 5 20V12Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};
