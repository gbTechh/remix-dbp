/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import classNames from "classnames";


type Props = {
  as?: keyof JSX.IntrinsicElements;
  children: React.ReactNode;
  type?: 'title' | 'base' | 'custom';
  color?: 'white' | 'fprimary' | 'shopcontrast' | 'black' | 'primary' | 'contrast' | 'error' | 'success' | 'warning' | 'grey' | 'custom'
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs' | 'custom' | '14'
  className?: string;
  
} & React.HTMLAttributes<HTMLElement>;



export const TextF: React.FC<Props> = ({ size= 'md' ,as = 'p', color='primary', type = 'base', className,  children, ...props }) => {
  const clases = classNames(
    `${className}`,
    {
      "font-dmserif": type === "title",
      "font-biryani": type === "base",
      "": type === "custom",
    },
    {
      "text-white": color === "white",
      "text-black": color === "black",
      "text-fprimary": color === "primary",
      "text-fcontrast": color === "contrast",
      "text-shopcontrast": color === "shopcontrast",
      "text-red-500": color === "error",
      "text-green-300": color === "success",
      "text-yellow-200": color === "warning",
      "": color === "custom",
    },
    // {
    //   'text-xl md:text-2xl': size === 'xl',
    //   'text-lg md:text-xl': size === 'lg',
    //   'text-base md:text-lg': size === 'md',
    //   'text-sm md:text-base': size === 'sm',
    //   'text-xs md:text-sm': size === 'xs',
    //   '': type === 'custom',
    // },
    {
      "text-xl md:text-2xl": size === "xl",
      "text-lg md:text-lg": size === "lg",
      "text-base md:text-md": size === "md",
      "text-sm md:text-sm": size === "sm",
      "text-[12px] md:text-[14px]": size === "14",
      "text-xs md:text-xs": size === "xs",
      "": type === "custom",
    }
  );
  const elementProps: any = {
    ...props,
    className: clases
  };

  return React.createElement(as, elementProps, children);
};
