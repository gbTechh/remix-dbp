import React, { useId } from 'react'
import { Text } from '..'

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  textSize?: string
  className?: string
  defaultValue?: string
  defaultValueOption?: string
  arrOptions: OptionsProps[]
  error?: string
  pd?: string
  value?:string
  selected?: string
}

export interface OptionsProps {
  value: string
  valueText: string
}


export const Select = ({
  label,
  name,
  value,
  className = '',
  arrOptions = [],
  defaultValue = '',
  defaultValueOption,
  error = '',
  pd,
  selected,
  ...props
}: Props) => {
  const idInput = useId()
  return (
    <div className={`flex flex-col w-full ${className}`}>
      <label htmlFor={idInput} className={`mb-2`}>
        <Text color="primary" size='sm' type='title'>
          {label}
        </Text>
      </label>
      <select
        value={value}
        {...props}
        id={idInput}
        name={name}
        className={`${error.length > 0 ? 'focus:outline-red-500' : 'focus:outline-violet-700'} outline-none focus:outline-[2px] rounded-md font-raleway text-sm font-medium ${pd ? pd : 'p-2 px-3'} text-primary border-[0.8px] border-primary bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonstart bg-bgray4 ${error.length > 0 ? 'border-red-500' : 'border-primary ' } ` }
      >
        {defaultValue !== '' && <option value={defaultValueOption ?? 0} className='bg-gradientbuttonend font-raleway'>{defaultValue}</option>}
        {arrOptions.map((e, i) => (
          <option key={i} value={e.value} selected={e.value === selected} className='bg-gradientbuttonend font-raleway'>
            {e.valueText}
          </option>
        ))}
      </select>
      {error.length > 0 && <Text color='error' size='sm' className='px-1 mt-1'>{error}</Text>}
    </div>
  )
}
