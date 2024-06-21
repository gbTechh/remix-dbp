import classNames from "classnames";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  w?: number;
  full?: boolean
}

export function DividerX({ full = true, w = 0, ...props }: Props) {
  if(w > 0){
    full = false;
  }
  return (
    <div     
      {...props}
      style={{
        width: `${full ? "100%" : `${w}rem`}`,
      }}
      className={classNames(`border-primary block rounded-full border-b-[0.8px]`)}
    />
  );
}