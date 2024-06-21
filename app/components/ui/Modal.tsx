import { HTMLAttributes, useEffect } from "react";
import { Box, Button, DividerX, Spacer, Text } from ".";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string;
  open: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void
  title: string
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none'
  minH?: string;
  buttonSubmit?: React.ReactNode
}

export function Modal({ buttonSubmit, onClose = () => {}, minH = 'auto' , open, blur = 'md', setIsOpen, children, title= "Titulo" }: Props) {
  
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
          <div className={`fixed  h-screen w-screen z-50 top-0 left-0 backdrop-blur-${blur} back grid place-items-center`}>
            <Box w="w-full md:w-7/12 max-w-[650px]" className="flex flex-col justify-between max-h-[90vh] h-auto ">
              <div className="flex justify-between w-full">
                <Text type="title">{title}</Text>
                <Button size="small" onClick={() => { setIsOpen(false) }}>x</Button>
              </div>
              <Spacer y={4} />
              <div className={`w-full h-full flex-col flex items-center justify-start flex-1 ${minH}`}>
                {children}
              </div>
              <Spacer y={4}/>
              <DividerX />
              <Spacer y={2}/>
              <div className="flex justify-end items-center gap-2 h-full">
                <Button type="button" color="danger" size="small" onClick={() => {
                  setIsOpen(false);
                  onClose()
                }}>Cancelar</Button>
                {
                  buttonSubmit ?? (<Button type="submit">Guardar</Button>)
                }
              </div>
            </Box>           
          </div>
        )
      }
    </>
  )
     
  
}