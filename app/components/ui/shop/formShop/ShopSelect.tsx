import React, { useId, useState } from "react";
import { Text } from "../../Text";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  textSize?: string;
  className?: string;
  defaultValue?: string;
  defaultValueOption?: string;
  arrOptions: SelectOptionsProps[];
  error?: string;
  pd?: string;
  value?: string;
  selected?: string;
}

export interface SelectOptionsProps {
  value: string | number;
  valueText: string;
}

export const ShopSelect = ({
  name,
  value,
  className = "",
  arrOptions = [],
  defaultValue = "",
  defaultValueOption,
  error = "",
  pd,
  selected,
  ...props
}: Props) => {

  const [defaultValueState, setDefaultValueState] = useState<string | undefined>(defaultValue);
  const [showData, setShowData] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<number | string>();

  return (
    <div className={`flex flex-col relative w-full h-auto ${className}`}>
      <div
        className="bg-shopinputs rounded-full justify-end flex p-1 h-10 items-center "
        onClick={() => {
          setShowData(!showData);
        }}
      >
        <Text
          className="w-full px-4 select-none flex items-center"
          color="shopcontrast"
          size="md"
        >
          {defaultValueState ??
            arrOptions.find((e) => e.value === selectedValue)?.valueText}
        </Text>
        <span
          className={`w-9 h-9 flex items-center justify-center bg-white rounded-full ${
            showData ? "rotate-180" : "unrotate"
          }`}
        >
          <MdOutlineKeyboardArrowDown />
        </span>
      </div>
      <ul
        className={`absolute shadow-sm p-2 ${
          showData ? "flex" : "hidden"
        } flex w-full bg-white flex-col top-10 z-10`}
      >
        {arrOptions.map((e) => (
          <li
            key={e.value}
            onClick={() => {
              setSelectedValue(e.value);
              setShowData(false);
              setDefaultValueState(undefined);
            }}
            className="p-2 hover:bg-shopinputs hover:rounded-full"
          >
            <Text color="black" size="sm">
              {e.valueText}
            </Text>
          </li>
        ))}
      </ul>

      {error.length > 0 && (
        <Text color="error" size="sm" className="px-1 mt-1">
          {error}
        </Text>
      )}
    </div>
  );
};
