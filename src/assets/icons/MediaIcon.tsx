import { IconType } from "./type";

export const MediaIcon = ({ width = 24, height = 24, stroke = 1.5, color = "#17191F" }: IconType) => {
    return (
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M20 4H4C2.89543 4 2 5.10207 2 6.46154V17.5385C2 18.8979 2.89543 20 4 20H20C21.1046 20 22 18.8979 22 17.5385V6.46154C22 5.10207 21.1046 4 20 4Z"
                stroke={color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path d="M2 9H22" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M7 4V9" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M12 4V9" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M17 4V9" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M7 15V20" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M12 15V20" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M17 15V20" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
            <path d="M2 15H22" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
        </svg>
    );
};
