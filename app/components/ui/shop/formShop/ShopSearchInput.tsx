import React, { forwardRef, useId, Ref } from "react";
import { Text } from "../../Text";
import { RiSearchLine } from "react-icons/ri";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  className?: string;
  error?: string | null;
  colorLabel?:
    | "error"
    | "success"
    | "warning"
    | "primary"
    | "contrast"
    | "grey"
    | "custom"
    | undefined;
  sizeLabel?: "custom" | "sm" | "xl" | "lg" | "md" | "xs" | undefined;
}

export const ShopSearchInput = forwardRef<HTMLInputElement, Props>(
  (
    {
      type,
      placeholder,
      label = "",
      name,
      className = "",
      colorLabel,
      sizeLabel,
      error = "",
      ...props
    }: Props,
    ref: Ref<HTMLInputElement>
  ) => {
    const idInput = useId();

    return (
      <div
        className={`flex rounded-full bg-shopinputs justify-between h-10 px-1 items-center ${
          type === "checkbox" || type === "radio"
            ? "flex-row-reverse justify-end items-center"
            : "flex-row "
        } ${className}`}
      >
        <input
          {...props}
          ref={ref}
          id={idInput}
          name={name}
          type={type}
          placeholder={placeholder ?? label}
          className={`h-full text-sm md:text-sm w-full text-black font-medium p-2  rounded-full bg-transparent  ${
            error && error.length > 0 ? "border-red-500" : "border-none "
          } p-2  ${
            error && error.length > 0
              ? "focus:outline-red-500"
              : "focus:outline-gray-300"
          }
        `}
        />
        <span className="bg-white p-1 rounded-full w-9 h-9 flex items-center justify-center">
          <RiSearchLine />
        </span>
        {error && error.length > 0 && (
          <Text color="error" size="sm" className="px-1 mt-1">
            {error}
          </Text>
        )}
      </div>
    );
  }
);

ShopSearchInput.displayName = "Input";
