import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  w?: string;
  h?: string;
  nobg?: boolean
  p?: string
}

export function Box({ p,nobg = false, w = 'w-auto', h = 'h-auto', className = '', children, ...props }: Props) {
  return (
    <div
      {...props}
      className={classNames(`${w ? w : 'w-auto'}  ${h ? h : 'h-auto'} border-[0.8px] border-primary ${!nobg && 'bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonstart'}  ${p ? p : 'p-2 md:p-4' }  rounded-lg ${className} `
      )}
    >
      {children}
    </div>
  );
}