import { IconType } from "./type";

export const EyeIcon = ({
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
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6C7.80243 6 4.44012 8.48798 3 12C4.44012 15.512 7.80243 18 12 18C16.1976 18 19.5599 15.512 21 12C19.5599 8.48798 16.1976 6 12 6ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                fill={fill}
            />
            <path
                d="M10.5 11.8C11.0523 11.8 11.5 11.3523 11.5 10.8C11.5 10.5488 11.4074 10.3193 11.2544 10.1436C11.4848 10.051 11.7365 10 12 10C13.1046 10 14 10.8954 14 12C14 13.1046 13.1046 14 12 14C10.8954 14 10 13.1046 10 12C10 11.8912 10.0087 11.7845 10.0254 11.6804C10.1666 11.7567 10.3282 11.8 10.5 11.8Z"
                fill={fill}
            />
        </svg>
    );
};
