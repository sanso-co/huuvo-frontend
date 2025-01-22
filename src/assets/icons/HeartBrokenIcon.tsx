import { IconType } from "./type";

export const HeartBrokenIcon = ({
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
                d="M11.3359 6.32623L9.99995 9.99998L12.4999 13L10.9999 15.5L11.9999 18V16L13.9999 13L12.4999 9.99998L15.0839 4.40135C18.1419 3.14949 22 4.81767 22 9.52482C22 16.2083 12 21.7778 12 21.7778C12 21.7778 2 16.2083 2 9.52482C2 3.39873 8.53462 2.41991 11.3359 6.32623Z"
                fill={fill}
            />
        </svg>
    );
};
