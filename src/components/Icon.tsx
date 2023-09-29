import React from "react";

export const icons = {
  arrowup: [
    "M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z",
    "M12 15.5V9.5",
    "M9 11.5L12 8.5L15 11.5",
  ],
  closecircle: [
    "M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z",
    "M9.16998 14.83L14.83 9.17004",
    "M14.83 14.83L9.16998 9.17004",
  ],
};

type ArrayKeys<T> = T extends (infer Item)[]
  ? keyof Item
  : T extends object
  ? keyof T
  : never;

export type IconsList = ArrayKeys<typeof icons>;

type IconsaxProps = {
  id?: string;
  pathId?: string;
  className?: string;
  pathClassName?: string;
  name: IconsList;
  size?: number | string;
  fill?: string;
  stroke?: string;
  strokeWidth?: number | string;
  strokeClassName?: string | null;
};

const Iconsax = ({
  id = "",
  pathId = "",
  className = "",
  pathClassName = "",
  name,
  size,
  fill,
  stroke,
  strokeWidth,
  strokeClassName = null,
}: IconsaxProps) => (
  <svg
    id={id}
    className={`inline-block ${className} ${strokeClassName}`}
    width={size || 24}
    height={size || 24}
    viewBox='0 0 24 24'
    fill='none'
  >
    {icons[name]?.map((iconpath: string, index: number) => {
      return (
        <path
          id={pathId}
          key={index}
          //   fill={fill}
          d={iconpath}
          stroke={strokeClassName ? "" : stroke ? `var(--${stroke})` : "#000"}
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={strokeWidth || 1.5}
          className={pathClassName}
        ></path>
      );
    })}
  </svg>
);

export default Iconsax;
