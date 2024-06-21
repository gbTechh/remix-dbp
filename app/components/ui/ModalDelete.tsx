import { HTMLAttributes, useEffect } from "react";
import { Box, Button, DividerX, Spacer, Text } from ".";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: string
}

export function ModalDelete({ open, setIsOpen, children, title= "Titulo" }: Props) {
  
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false)
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
  
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {
        open && (
          <div className="fixed h-screen w-screen z-50 top-0 left-0 backdrop-blur-md grid place-items-center">
            <Box className="w-full md:w-7/12 max-w-[650px]">
              <div className="flex justify-between w-full">
                <Text type="title">{title}</Text>
                <Button size="small" onClick={() => { setIsOpen(false) }}>x</Button>
              </div>
              <Spacer y={4} />
              <div className="w-full flex items-center justify-center">
                {children}
              </div>
              <Spacer y={4}/>
              <DividerX />
              <Spacer y={2}/>
              <div className="flex justify-end items-center gap-2">
                <Button type="submit">Aceptar</Button>
                <Button type="button" color="danger" onClick={() => {setIsOpen(false)}}>Cancelar</Button>
              </div>
            </Box>           
          </div>
        )
      }
    </>
  )
     
  
}