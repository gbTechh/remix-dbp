import { useId } from 'react';
import { Text } from '..';

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  name: string
  className ?: string;
  error ?: string;
  placeholder ?: string;
  value?:string
}

export const RichText = ({ placeholder = "Escriba el contenido aquí", label = "label", name, className = '', value='',error = '', ...props }:Props) => {
  const idInput = useId();

  return (
    <div className="w-full h-auto" >
      <Text color="primary" size='sm' type='title' className='mb-2'>
        {label}
      </Text>
      
      <textarea 
        {...props}
        id={idInput}
        name={name}
        value={value}
        placeholder={placeholder}
        className={`${className ?? ''} w-full min-h-[150px] outline-none focus:outline-[2px] border-[0.8px] text-sm md:text-sm text-primary font-medium p-2 px-3 rounded-md bg-gradientbuttonend ${error.length > 0 ? 'border-red-500' : 'border-primary '} p-2  rounded-md ${error.length > 0 ? 'focus:outline-red-500' : 'focus:outline-violet-700'}
        `}>

      </textarea>
    </div>
  );
};