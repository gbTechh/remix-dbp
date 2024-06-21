import { HTMLAttributes, ReactNode, useId } from "react";
import { Text } from "..";


interface Props extends HTMLAttributes<HTMLDivElement | HTMLInputElement> {
  label?: string;
  w?: string;
  h?: string;
  isChecked: boolean;
  name: string;
  children?: ReactNode
  value?: string; 
  classLabel? : string;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
  // changeFn: (value: React.SetStateAction<boolean>) => void;
}

export function CheckBox({ children,classLabel,onChange,value="", name="",label = "", isChecked }: Props) {
  const id = useId()
  return (
    <div className="flex gap-2 checkbox-input items-center">
      <input type="checkbox" id={id} className="" name={name} checked={isChecked} value={value}
        onChange={onChange} />
      <label htmlFor={id} className={classLabel}>
        {
          children ? children : (<Text as="span" color="contrast" size="sm" className="cursor-pointer select-none font-bold capitalize">{label}</Text>)
        }
      </label>
    </div>
  );
} 
