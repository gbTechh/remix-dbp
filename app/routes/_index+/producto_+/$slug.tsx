import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { CardProduct, Spacer, Text, TextF } from "~/components";
import { listProductbySlug, listProductsbyCategory, productPage } from "~/features/product";
import { useCartStore } from "~/store";

export const meta: MetaFunction = () => {
  return [
    { title: "Categorias" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async (context: LoaderFunctionArgs) => {
  return listProductbySlug(context);
};

export default function Products() {
  const { product } = useLoaderData<typeof loader>();
  const { categoryId,description,discountPrice,id,mainImage,name,price,rating,secondaryImages,shortDescription,slug } = product!

  const [count, setCount] = useState<number>(1)
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addItem = useCartStore((state) => state.addItem);

  const addToCart = () => {
    addItem({
      id,
      name: name!,
      price: price!,
      quantity: count,
      image: mainImage!,
    });
  };
  
  return (
    <div className="flex flex-col md:flex-row md:gap-10">
      <div className="overflow-hidden">
        <img
          className="rounded-3xl aspect-square object-cover"
          src={`/uploads/products/${mainImage}`}
        />
      </div>
      <div className="px-2 w-full">
        <Spacer y={8} />
        <div className="flex items-center">
          <TextF type="base">{rating}</TextF>
          <FaStar className="text-yellow-400 pb-1" />
        </div>
        <Spacer y={1} />
        <TextF type="base" size="xl" className="capitalize font-semibold">
          {name}
        </TextF>
        <Spacer y={4} />
        <div className="flex gap-10">
          <div className="flex flex-col gap-1">
            <TextF color="contrast" size="xs" className="font-medium">
              Precio
            </TextF>
            <TextF>S/.{price}</TextF>
          </div>
          <div className="flex flex-col gap-1">
            <TextF color="contrast" size="xs" className="font-medium">
              Precio Descuento
            </TextF>
            <TextF>S/.{discountPrice}</TextF>
          </div>
        </div>
        <Spacer y={4} />
        <div className="border-b-[0.8px] border-b-gray-200 border-t-[0.8px] border-t-gray-200 py-4">
          <TextF color="contrast" size="sm">
            description
          </TextF>
        </div>
        <Spacer y={4} />
        <div className="w-full grid place-items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={decrement}
              className="group-hover:bg-white group-hover:text-yellow-400 text-white font-bold bg-fprimary h-8 w-8 rounded-md"
            >
              -
            </button>
            <TextF>{count}</TextF>
            <button
              onClick={() => setCount(count + 1)}
              className="group-hover:bg-white group-hover:text-yellow-400 text-white font-bold bg-fprimary h-8 w-8 rounded-md"
            >
              +
            </button>
          </div>
        </div>
        <Spacer y={8} />
        <div className="mb-10 w-full flex-wrap flex items-center justify-center gap-4">
          <button
            className="bg-fprimary rounded-full p-2 px-4 min-w-[150px]"
            onClick={addToCart}
          >
            <TextF color="white" className="" as="span">
              agregar
            </TextF>
          </button>
          <button className="bg-green-500 rounded-full p-2 px-4 min-w-[150px]">
            <TextF color="white" className="" as="span">
              whatsapp
            </TextF>
          </button>
        </div>
      </div>
    </div>
  );
}
