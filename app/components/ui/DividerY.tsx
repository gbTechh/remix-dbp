import classNames from "classnames";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  h?: number;
  full?: boolean
}

export function DividerY({ full = true, h = 0, ...props }: Props) {
  if(h > 0){
    full = false;
  }
  return (
    <span     
      {...props}
      style={{
        height: `${full ? "100%" : `${h}rem`}`,
      }}
      className={classNames(`border-primary block rounded-full border-l-[0.8px] w-0`)}
    />
  );
}