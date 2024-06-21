import React from "react";
import { HTMLAttributes } from "react";
import { Text } from "./Text";

interface Props extends HTMLAttributes<HTMLDivElement> {
  text?: string;
  w?: string;
  h?: string;
  isChecked: boolean;
  name: string;
  // changeFn: (value: React.SetStateAction<boolean>) => void;
}

export function Toggle({ name = '', w = 'w-9', h = 'h-5', text = "", isChecked, ...props }: Props) {
  
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        name={name}
        className="sr-only peer"
        checked={isChecked}
        onChange={props.onChange}
      />
      <div
        className={`${w} ${h} bg-buttonprimaryhover  rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-primary after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-gradientbuttonend after:border-primary after:border after:rounded-full after:h-4 after:w-4 after:transition-all  peer-checked:bg-violet-600`}
      ></div>
      <Text
        className={`${text ?? "hidden"} ml-2`}
        size="xs"
        color="contrast"
        type="base"
      >
        {text}
      </Text>
    </label>
  );
}