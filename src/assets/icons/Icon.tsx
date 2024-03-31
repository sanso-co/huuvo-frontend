import React from "react";

interface Props {
  width?: number;
  height?: number;
  stroke?: number;
  color?: string;
  fill?: string;
  ariaHidden?: boolean;
  children?: React.ReactNode;
}

export const Checkmark = ({ width, height, stroke, color }: Props) => {
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
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
};

export const ChevronRight = ({ width, height, stroke, color }: Props) => {
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
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
};

export const TV = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    >
      <rect width={20} height={15} x={2} y={7} rx={2} ry={2} />
      <path d="m17 2-5 5-5-5" />
    </svg>
  );
};

export const SearchIcon = ({ width, height, stroke, color, fill }: Props) => {
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
      <circle cx={11} cy={11} r={8} />
      <path d="M21 21l-4.35-4.35" />
    </svg>
  );
};

export const Settings = ({ width, height, stroke, color, fill }: Props) => {
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
      <path d="M12 8.25a3.75 3.75 0 1 0 3.75 3.75 3.761 3.761 0 0 0 -3.75 -3.75zm8.096 3.75a7.759 7.759 0 0 1 -0.077 1.047l2.282 1.787a0.543 0.543 0 0 1 0.123 0.693l-2.159 3.728a0.546 0.546 0 0 1 -0.663 0.231l-2.684 -1.078a8.276 8.276 0 0 1 -1.82 1.063l-0.401 2.849a0.559 0.559 0 0 1 -0.54 0.462h-4.318a0.563 0.563 0 0 1 -0.54 -0.447l-0.401 -2.849A7.936 7.936 0 0 1 7.08 18.422L4.397 19.5a0.546 0.546 0 0 1 -0.663 -0.231L1.575 15.542a0.543 0.543 0 0 1 0.123 -0.693l2.282 -1.787A8.183 8.183 0 0 1 3.904 12a7.759 7.759 0 0 1 0.077 -1.047l-2.282 -1.787a0.543 0.543 0 0 1 -0.123 -0.693l2.159 -3.728a0.546 0.546 0 0 1 0.663 -0.231l2.684 1.078a8.276 8.276 0 0 1 1.82 -1.063l0.401 -2.849A0.559 0.559 0 0 1 9.841 1.219h4.318a0.563 0.563 0 0 1 0.54 0.447l0.401 2.849A7.936 7.936 0 0 1 16.922 5.578l2.681 -1.078a0.546 0.546 0 0 1 0.663 0.231l2.159 3.728a0.543 0.543 0 0 1 -0.123 0.693l-2.282 1.787a8.183 8.183 0 0 1 0.077 1.062z" />
    </svg>
  );
};

const Base = ({ width, height, stroke, color, fill, children }: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ? width : 16}
      height={height ? height : 16}
      viewBox={`0 0 ${width ? width : 16} ${height ? height : 16}`}
      fill={fill}
      stroke={color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
};

export const Dislike = ({ width, height, fill }: Props) => {
  return (
    <Base width={width} height={height} fill="#333">
      <path d="M9.13719 2.19107L11.0882 6.78125L7.58824 8.20313L8.41176 12.2656L5.94118 6.78125L9.02941 6.375L6.3691 1.93323C5.38778 1.47944 4.0785 1.21886 2.7704 1.99542C0.155605 3.54771 0.678564 6.6523 2.7704 9.24168C4.96058 11.9528 7.2635 14.1935 7.2635 14.1935C7.67026 14.6009 8.33057 14.6029 8.73533 14.1949C8.73533 14.1949 11.0334 11.9602 13.2296 9.24168C15.3214 6.6523 15.8444 3.54771 13.2296 1.99542C11.6877 1.08006 10.1435 1.60639 9.13719 2.19107Z" />
    </Base>
  );
};

export const FilterIcon = ({ width, height, fill }: Props) => {
  return (
    <Base width={width} height={height} fill="#333">
      <path
        fillRule="evenodd"
        d="M13.8293 4C13.4175 5.16519 12.3062 6 11 6C9.69378 6 8.58254 5.16519 8.17071 4H1C0.447715 4 0 3.55228 0 3C0 2.44772 0.447715 2 1 2H8.17071C8.58254 0.834805 9.69378 0 11 0C12.3062 0 13.4175 0.834808 13.8293 2H15C15.5523 2 16 2.44772 16 3C16 3.55228 15.5523 4 15 4H13.8293ZM12 3C12 3.55228 11.5523 4 11 4C10.4477 4 10 3.55228 10 3C10 2.44772 10.4477 2 11 2C11.5523 2 12 2.44772 12 3Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        d="M13.8293 14C13.4175 15.1652 12.3062 16 11 16C9.69378 16 8.58254 15.1652 8.17071 14H1C0.447715 14 0 13.5523 0 13C0 12.4477 0.447715 12 1 12H8.17071C8.58254 10.8348 9.69378 10 11 10C12.3062 10 13.4175 10.8348 13.8293 12H15C15.5523 12 16 12.4477 16 13C16 13.5523 15.5523 14 15 14H13.8293ZM12 13C12 13.5523 11.5523 14 11 14C10.4477 14 10 13.5523 10 13C10 12.4477 10.4477 12 11 12C11.5523 12 12 12.4477 12 13Z"
        fill="black"
      />
      <path
        fillRule="evenodd"
        d="M2.17071 7C2.58254 5.83481 3.69378 5 5 5C6.30622 5 7.41746 5.83481 7.82929 7L15 7C15.5523 7 16 7.44772 16 8C16 8.55228 15.5523 9 15 9L7.82929 9C7.41746 10.1652 6.30622 11 5 11C3.69378 11 2.58254 10.1652 2.17071 9L1 9C0.447715 9 -2.13986e-07 8.55229 -2.62268e-07 8C-3.10551e-07 7.44772 0.447714 7 1 7L2.17071 7ZM4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8C6 8.55229 5.55228 9 5 9C4.44772 9 4 8.55229 4 8Z"
        fill="black"
      />
    </Base>
  );
};

export const Like = ({ width, height, fill }: Props) => {
  return (
    <Base width={width} height={height} fill="#333">
      <path d="M7.29564 13.9849C7.68454 14.3785 8.31586 14.3805 8.70286 13.9862C8.70286 13.9862 10.9 11.8268 12.9998 9.19985C14.9998 6.6977 15.4998 3.6977 12.9998 2.1977C10.503 0.699607 7.99981 3.1977 7.99981 3.1977C7.99981 3.1977 5.49754 0.699058 2.99981 2.1977C0.499806 3.6977 0.999806 6.6977 2.99981 9.19985C5.09382 11.8196 7.29564 13.9849 7.29564 13.9849Z" />
    </Base>
  );
};

export const Love = ({ width, height, fill }: Props) => {
  return (
    <Base width={width} height={height} fill="#333">
      <path d="M3.90434 13.835C4.13677 14.0543 4.51409 14.0554 4.74539 13.8357C4.74539 13.8357 6.05857 12.6324 7.31354 11.1686C8.50887 9.77431 8.80771 8.10261 7.31354 7.26677C5.82127 6.43198 4.3252 7.824 4.3252 7.824C4.3252 7.824 2.82967 6.43167 1.33685 7.26677C-0.157316 8.10261 0.141518 9.77431 1.33685 11.1686C2.58838 12.6284 3.90434 13.835 3.90434 13.835Z" />
      <path d="M9.7258 14.2673C9.33881 14.6615 8.70749 14.6596 8.31859 14.2659C8.31859 14.2659 7.81075 13.7665 7.05091 12.9572C7.3784 12.6107 7.72965 12.2253 8.07759 11.8195C8.75884 11.0248 9.27226 10.0555 9.32553 9.06181C9.38337 7.98306 8.88543 6.99753 7.80661 6.39404C6.68461 5.76638 5.5832 6.00348 4.86599 6.31523C4.66567 6.4023 4.48564 6.49874 4.33019 6.59235C4.17476 6.49871 3.99475 6.40225 3.79443 6.31515C3.41163 6.14871 2.91944 6.0036 2.37307 5.99986C2.17643 4.593 2.6421 3.30712 4.02275 2.47873C6.52048 0.980094 9.02275 3.47873 9.02275 3.47873C9.02275 3.47873 11.5259 0.980643 14.0228 2.47873C16.5228 3.97873 16.0228 6.97873 14.0228 9.48089C11.923 12.1079 9.7258 14.2673 9.7258 14.2673Z" />
    </Base>
  );
};

//width={20} height={20}color="#000" stroke={2}
