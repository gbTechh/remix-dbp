import classNames from "classnames";
import { ReactNode } from "react";

interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large';
  full? : boolean;
  color?: 'primary' | 'contrast' | 'danger';
  children: ReactNode;
  className?: string;
  type?: "button" | 'submit';
  disabled?: boolean;
  name?: string;
  value?: string;
}

export function Button({ disabled = false,name="", value="",type="button", size = 'medium', full, color = 'primary', className,  children, ...props}: Props) {
  return (
    <button
      name={name}
      value={value}
      {...props}
      disabled={disabled}
      type={type}
      className={classNames(`h-auto rounded-full border-[0.8px]   transition-all ${className ?? ''}`,
        { 'text-xs p-1 px-4': size === 'small', 'text-sm p-1 px-6': size === 'medium', 'p-[0.65rem] px-10 text-sm': size === 'large' },
        { 'border-primary bg-gradient-to-tr from-gradientbuttonstart to-gradientend text-primary hover:from-gradientstart hover:to-gradientbuttonstart': color === "primary", 'bg-gradient-to-r from-gradientbuttonstart  to-gradientbuttoncontrasthover  text-white hover:from-gradientbuttonstart hover:to-gradientbuttoncontrast border-buttoncontrast': color === 'contrast', 'bg-gradient-to-r from-red-700  to-red-500  text-white hover:from-red-900 hover:to-red-600 border-red-400': color === 'danger' },
        { 'w-auto': !full, 'w-full': full }
      )}
    >
      {children}
    </button>
  );
}