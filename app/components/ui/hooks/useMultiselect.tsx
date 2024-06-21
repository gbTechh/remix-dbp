import { useState } from "react";
import { MultiSelect2 } from "..";

interface Props {
  label: string
  placeholder: string
  data: TypeMultiselectData[] | []
  dataSelected?: TypeMultiselectData[]
}

export type TypeMultiselectData = {
  value: string
  id: number
}

export const useMultiSelect = ({ label, placeholder, data, dataSelected = [] }:Props) => {
  const [selectedItems, setSelectedItems] = useState<TypeMultiselectData[]>(dataSelected);
  const renderMultiSelect = () => {
    return (
      <MultiSelect2
        label={label}
        placeholder={placeholder}
        data={data}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
      />
    );
  };

  return { selectedItems, renderMultiSelect, setSelectedItems };
};
