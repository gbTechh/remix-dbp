import React, { useState, useEffect } from 'react';
import { Text } from '.';
import { ICheck, IError } from '../icons';

interface AlertProps {
  type: 'success' | 'error' | 'warning';
  title: string;
  message: string;
  duration: number;
}

export const Alert: React.FC<AlertProps> = ({ type, message, duration = 3000, title = 'Mensaje de alerta' }) => {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    
    const timeout = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => {
      clearTimeout(timeout);
    };
  }, [duration]);
  

  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return 'alert-succes';
      case 'error':
        return 'alert-error';
      case 'warning':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <>
      {showAlert && (
        <div
          className={`flex overflow-hidden border-[0.8px] gap-4 border-primary fixed top-2 right-2 mx-auto py-3 px-6 rounded-md text-white min-w-[200px] z-[100] ${getAlertStyle()}`}
        >
          <div className={`absolute w-full h-1 ${type === 'success' && 'bg-emerald-950'} ${type === 'error' && 'bg-red-950'} top-0 left-0`}></div>
          <div className='w-8 h-8'>
            <span className={`flex items-center justify-center w-8 h-8 rounded-full border-[4px] 
            ${type === 'success' && 'bg-emerald-600  border-emerald-950'} ${type === 'error' && 'bg-red-700  border-red-950'}
            `}>
              {type === 'success' && (<ICheck w={13} h={13} />)}
              {type === 'error' && (<IError w={13} h={13} />)}              
            </span>
          </div>
          <div className='w-full flex flex-col'>
            <Text type='title' size='md' color='contrast'>
              {title}
            </Text>
            <Text type='subtitle' color='custom' className={`${type === 'success' && 'text-emerald-500'} ${type === 'error' && 'text-red-500'}`} size='xs'>
              {message}
            </Text>
          </div>
        </div>
      )}
    </>
  );
};

