import classNames from "classnames";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  x?: number;
  y?: number;
}

export function Spacer({ x = 0, y = 0, ...props }: Props) {
  return (
    <div
      style={{
        marginLeft: `${x ? `calc(${x}rem / 8)` : `0px`}`, marginRight: `${x ? `calc(${x}rem / 8)` : `0px`}`, 
        marginTop: `${y ? `calc(${y}rem / 8)` : `0px`}`, marginBottom: `${y ? `calc(${y}rem / 8)` : `0px`}`, 
      }}
      {...props}
      className={classNames('block w-[1px] h-[1px]')}
    />
  );
}