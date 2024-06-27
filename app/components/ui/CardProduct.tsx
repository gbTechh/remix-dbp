import { useCartStore } from "~/store";
import { Spacer } from "./Spacer";
import { TextF } from "./TextF";
import { Link } from "@remix-run/react";
import { ProductResponse } from "~/features/product";

interface Props {
	data: ProductResponse
  children?: React.ReactNode
}

export function CardProduct({
   data:{ mainImage, id, slug, price, rating, name, shortDescription },
   
}: Props) {

  const addItem = useCartStore((state) => state.addItem);

  const addToCart = () => {
    addItem({
      id,
      name: name!,
      price: price!,
      quantity: 1,
      image: mainImage!,
    });
  };

  return (
    <div className="relative pt-[4rem] grid place-items-center ">
      <img
        src={
          mainImage
        }
        className="z-20  rounded-full w-[80%] aspect-square max-w-[120px] object-cover shadow-[rgba(0,_0,_0,_0.2)_0px_20px_30px_-7px] absolute top-0 mx-auto border-[1px] border-gray-100 "
      />
      <div className="group hover:bg-fprimary transition-colors w-full pt-16 rounded-2xl bg-whitebg shadow-[0_8px_30px_rgb(0,0,0,0.12)] relative flex flex-col justify-between items-center p-6  z-10 h-72 content-stretch overflow-hidden">
        {/* {best_seller && (
          <span className="absolute -top-2 -left-2 h-8 w-8 bg-red-600 rounded-xl"></span>
        )} */}
        <Link to={`/producto/${slug}`} className="mt-4">
          <TextF
            as="h2"
            type="base"
            color="primary"
            size="md"
            className="group-hover:text-white font-semibold hover:underline text-center transition-all cursor-pointer"
          >
            {name}
          </TextF>
        </Link>
        <Spacer y={4} />
        <div className="flex w-full gap-2 justify-between items-center border-t-[1px] border-b-[1px] border-gray-200 py-4">
          <TextF
            size="xs"
            color="contrast"
            className="group-hover:text-white"
          >{`${rating} estrellas`}</TextF>
          <span className="h-1 w-1 rounded-full  bg-yellow-400" />
          <TextF
            size="xs"
            color="contrast"
            className="group-hover:text-white"
          >{`${shortDescription}`}</TextF>
        </div>
        <Spacer y={4} />
        <div className="flex justify-between items-center w-full">
          <TextF
            as="p"
            color="primary"
            size="lg"
            className="font-bold group-hover:text-white"
          >
            {`S/.${price}`}
          </TextF>
          <button
            onClick={addToCart}
            className="group-hover:bg-white group-hover:text-yellow-400 text-white font-bold bg-fprimary h-8 w-8 rounded-md"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
