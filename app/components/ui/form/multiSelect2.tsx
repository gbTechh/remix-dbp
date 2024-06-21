import { useEffect, useId, useRef, useState } from "react";
import { Box, Text, TypeMultiselectData } from ".."

interface MultiSelectProps {
  label: string
  placeholder: string
  data: TypeMultiselectData[] | []
  selectedItems: TypeMultiselectData[]
  setSelectedItems: React.Dispatch<React.SetStateAction<TypeMultiselectData[]>>
}


export const MultiSelect2: React.FC<MultiSelectProps> = (
  { 
    label = 'Escribe aqui el label',
    placeholder = 'Buscar...',
    data,
    selectedItems,
    setSelectedItems
  }: MultiSelectProps) => {
  
  const idInput = useId();
  const [dataState, setDataState] = useState(data)
  const [showDropdown, setShowDropdown] = useState(false)
  const [valueSearch, setValueSearch] = useState('')
  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setValueSearch(ev.target.value)
  }

  useEffect(() => {
    if(valueSearch.length > 0){
      const existsText = dataState.filter(e => e.value?.includes(valueSearch))
      setDataState(existsText)
    } else{
      setDataState(data)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueSearch])
  
  const handleListClick = (data: TypeMultiselectData) => {
    const existsValue = Object.values(selectedItems).find(e => e.id === data.id)
    if(!existsValue){
      setSelectedItems((prev) => [...prev, data])
    }   
  }
  
  const handleClickBadge = (id: number) => {
    const deletedItems = selectedItems.filter(e => e.id !== id)
    setSelectedItems(deletedItems)
  }

  const isSelectedLis = (id:number) => {
    const existsValue = Object.values(selectedItems).find(e => e.id === id)
    if(existsValue){
      return 'opacity-50'
    }else{
      return 'opacity-100'
    }
  }

  const dropdownRef = useRef<HTMLDivElement>(null);
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={idInput}>
        <Text as='label' size="sm" type="title">{label}</Text>
      </label>
      <div className="relative mt-2 border-[0.8px] border-primary rounded-lg p-2">
        <div className={`flex flex-wrap gap-1 ${selectedItems.length > 0 ? 'mb-2' : ''}`}>
          {
            selectedItems.length > 0 && selectedItems.map(e => (
              <Badge key={e.id} text={e.value} onClick={() => {handleClickBadge(e.id)}}/>
            ))
          }          
        </div>
        <div>
          <input placeholder={placeholder}  onFocus={() => { setShowDropdown(true) }} className="bg-transparent outline-none focus:outline-none text-primary text-xs md:text-sm px-2 rounded-lg w-full" value={valueSearch} 
          onChange={(ev) => {handleChange(ev)}}></input>
        </div>
       
      </div>
      {
        showDropdown && (
          <Box p="p-0" h="max-h-[300px]" className="absolute w-full mt-1  overflow-auto">
            <ul className="flex flex-col">
              {
                dataState.length ? (
                  <>
                  {
                    dataState.map(e => (
                      <Text as="li" size="xs" className={`px-3 py-2 hover:bg-buttonprimary transition-colors ${isSelectedLis(e.id)}`} key={e.id} onClick={() => { handleListClick(e) }}>{e.value}</Text>
                    ))
                  }
                  </>
                ) : (<Text as="li" size="xs" className="px-3 py-2 hover:bg-buttonprimary transition-colors" >No se encontraron datos</Text>)
              }

            </ul>
          </Box>
        )
      }
      
    </div>
  )
}

interface PropsBadge {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}
const Badge = ({text, onClick}:PropsBadge) => {
  return (
    <button onClick={onClick} type="button" className="relative flex items-center justify-center rounded-full border-[0.8px] border-primary bg-buttonprimaryhover w-max p-1 px-5 hover:bg-zinc-950 transition-colors">
      <div className="absolute right-[8px] -top-[4px]"><Text as="span" size="custom" className="text-xs" type="title">x</Text></div>
      <Text size="custom" as="span" className="text-xs h-full flex items-center">{text}</Text>
    </button>
  )
}