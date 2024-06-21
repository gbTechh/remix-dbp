import { Text } from "../Text"

interface Props{
  name: string;
  img: string;
}

export const Card = ({name, img,}: Props) => {
  return (
    <>
      <div className="rounded-xl bg-no-repeat bg-cover bg-center bg-white aspect-[13/16] flex" style={{backgroundImage: `url('${img}')`}}>
        <Text color="black" className="bg-white rounded-full p-1 w-fit self-end m-2 px-4">{name}</Text>
      </div>
    </>
  )
}