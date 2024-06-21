
import React, { forwardRef, useId, Ref } from 'react';
import { Text } from '..';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string | null;
  colorLabel?: "error" | "success" | "warning" | "primary" | "contrast" | "grey" | "custom" | undefined;
  sizeLabel?: "custom" | "sm" | "xl" | "lg" | "md" | "xs" | undefined;
}

export const Input = forwardRef<HTMLInputElement, Props>(({
  type,
  placeholder,
  label = '',
  name,
  className = '',
  colorLabel,
  sizeLabel,
  error = '',
  ...props
}: Props, ref: Ref<HTMLInputElement>) => {
  const idInput = useId();

  return (
    <div
      className={`flex  ${
        type === 'checkbox' || type === 'radio'
          ? 'flex-row-reverse justify-end items-center'
          : 'flex-col '
      } ${className}`}
    >
      {
        label.length > 0 && (
          <label
            htmlFor={idInput}
            className={`capitalize ${
              type === 'checkbox' || type === 'radio' ? 'ml-2' : 'mb-2'
            }`}
          >
            <Text color={`${colorLabel ?? 'primary'}`} size={`${sizeLabel ?? 'sm'}`} type='title'>
              {label}
            </Text>
          </label>
        )
      }
      
      <input
        {...props}
        ref={ref}
        id={idInput}
        name={name}
        type={type}
        placeholder={placeholder}
        className={`outline-none focus:outline-[2px] border-[0.8px] text-sm md:text-sm text-primary font-medium p-2 px-3 rounded-md bg-gradientbuttonend ${error && error.length > 0 ? 'border-red-500' : 'border-primary ' } p-2  rounded-md ${error && error.length > 0 ? 'focus:outline-red-500' : 'focus:outline-violet-700' }
        `}
      />
      {error && error.length > 0 && <Text color='error' size='sm' className='px-1 mt-1'>{error}</Text>}
    </div>
  );
});

Input.displayName = 'Input'
