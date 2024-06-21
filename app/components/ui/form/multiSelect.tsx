/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useEffect, useRef } from 'react'
import { FaCheckSquare } from 'react-icons/fa'
import { IoIosClose } from 'react-icons/io'
import { Text } from '..'

export interface OptionMultiSelect {
  value: string
  valueText: string
}

export interface MultiSelectProps {
  options: OptionMultiSelect[]
  onChange: (selectedOptions: OptionMultiSelect[]) => void
  placeholder?: string
  label?: string

}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  onChange = () => {},
  placeholder
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<OptionMultiSelect[]>(
    []
  )
  const [filterText, setFilterText] = useState('')
  const inputRef = useRef<HTMLInputElement | null>(null)
  const dropdownRef = useRef<HTMLDivElement | null>(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const toggleOption = (option: OptionMultiSelect) => {
    setSelectedOptions((prevSelected) =>
      prevSelected.some((item) => item.value === option.value)
        ? prevSelected?.filter((item) => item.value !== option.value)
        : [...prevSelected, option]
    )
  }

  const filteredOptions = options?.filter((option) =>
    option?.valueText?.toLowerCase().includes(filterText.toLowerCase())
  )

  useEffect(() => {
    onChange(selectedOptions)
  }, [selectedOptions])

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        inputRef.current &&
        dropdownRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener('click', handleOutsideClick)
    }

    return () => {
      window.removeEventListener('click', handleOutsideClick)
    }
  }, [isOpen])

  const handleCloseTag = (value: string) => {
    // Filtrar los elementos para eliminar el que coincide con el id
    const updatedItems = selectedOptions?.filter((item) => item.value !== value);
    setSelectedOptions(updatedItems);
  }
  return (
    <div className="border-[0.8px] border-primary rounded-md relative flex items-center flex-wrap p-1">
      <div className="w-auto flex gap-1 flex-wrap items-center select-none">
        {selectedOptions.map((option) => (
          <div
            key={option.value}
            className="flex w-auto min-w-max rounded-md bg-bblack1"
            onClick={() => handleCloseTag(option.value)}
          >
            <Text
              color="primary"
              className="p-1 px-2"
              size="sm"
              type="title"
            >
              {option.valueText}
            </Text>
            <span className="w-4 self-stretch flex items-center justify-center cursor-pointer">
              <IoIosClose className="text-white font-bold" />
            </span>
          </div>
        ))}
      </div>
      <div className="w-full" ref={dropdownRef}>
        <input
          type="text"
          placeholder={placeholder ?? 'Busca las opciones...'}
          onClick={toggleDropdown}
          onChange={(e) => setFilterText(e.target.value)}
          className="p-1 focus:outline-none w-full bg-transparent font-raleway text-13 md:text-15 font-medium text-tblack2"
          ref={inputRef}
        />
        {isOpen && (
          <div className="absolute top-full left-0 w-full border bg-white mt-1 rounded-md shadow-md p-2 pt-0 max-h-[300px] overflow-y-auto z-20">
            <div className="border-b-[1px] border-brgrey2 py-3">
              <Text>Selecciona todas las opciones</Text>
            </div>
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className={`flex items-center p-3 my-1 cursor-pointer hover:bg-bgray1t rounded-lg ${selectedOptions.some((item) => item.value === option.value)
                    ? 'bg-bgray1t'
                    : ''
                  }`}
                onClick={() => toggleOption(option)}
              >
                <div className="flex items-center mr-2 ">
                  {selectedOptions.some(
                    (item) => item.value === option.value
                  ) ? (
                    <FaCheckSquare className="text-tprimary1 text-16" />
                  ) : (
                    <div className="w-4 h-4 border border-brgrey2 rounded-sm" />
                  )}
                </div>
                <Text as="span" type="title">
                  {option.valueText}
                </Text>
              </div>
            ))}
            {filteredOptions.length <= 0 && (
              <Text className="italic" type="title" color="contrast">
                No hay coincidencias...
              </Text>
            )}
          </div>
        )}
      </div>
      <div></div>
    </div>
  )
}
