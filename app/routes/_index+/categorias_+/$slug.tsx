import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MdArrowOutward } from "react-icons/md";
import { CardProduct, Spacer, Text, TextF } from "~/components";
import { listProductsbyCategory, productPage } from "~/features/product";

export const meta: MetaFunction = () => {
  return [
    { title: "Categorias" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async (context: LoaderFunctionArgs) => {
  return listProductsbyCategory(context);
};

export default function Products() {
  const { categories, products } = useLoaderData<typeof loader>();
  console.log({products})

  return (
    <>
      <main>
        <div className="rounded-2xl relative  overflow-hidden max-h-[150px] sm:max-h-[100px]">
          <div className="lg:aspect-[321/25] absolute top-0 left-0 w-full bg-slate-800 bg-opacity-70 lg:h-[100px] h-full" ></div>
          <img className="w-full h-full object-cover" src="/images/food.jpg" />
          <div className="absolute flex  left-0 top-0 w-full h-full p-6 justify-between sm:items-center ">
            <div className="pr-2">
              <TextF
                size="xl"
                color="custom"
                className="text-white font-semibold"
              >
                Bell Fresh
              </TextF>
              <TextF size="sm" color="custom" className="text-gray-300">
                Fresh & healthy food recipe
              </TextF>
            </div>
            <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
              <div className="flex flex-col justify-center items-center">
                <TextF
                  color="warning"
                  className="text-2xl font-bold"
                  size="custom"
                >
                  comida
                  {/* {foods.length} */}
                </TextF>
                <TextF
                  color="custom"
                  className="text-gray-300 font-bold"
                  size="xs"
                >
                  Total de comidas
                </TextF>
              </div>
              <div className="hidden sm:block w-[1px] h-auto bg-gray-500 rounded-full"></div>
              <div className="flex flex-col justify-center items-center">
                <TextF
                  color="warning"
                  className="text-2xl font-bold"
                  size="custom"
                >
                  {categories.length}
                </TextF>
                <TextF
                  color="custom"
                  className="text-gray-300 font-bold"
                  size="xs"
                >
                  Categorías
                </TextF>
              </div>
            </div>
          </div>
        </div>
        <Spacer y={6} />
        <div className="w-full">
          <ul className="flex gap-4 overflow-x-scroll">
            <li className="w-full min-w-[120px] max-w-[150px] flex items-center justify-center flex-col gap-4 bg-yellow-400 bg-opacity-10 border-[1px] border-yellow-500 rounded-3xl p-3">
              <img
                src="/allfoods.png"
                className="aspect-square w-14 shadow-2xl rounded-full object-cover"
              />
              <Link to={`/productos`} className="w-full">
                <TextF
                  as="span"
                  size="xs"
                  className="font-semibold block text-center w-full"
                >
                  Todos
                </TextF>
              </Link>
            </li>
            {categories.map((e) => (
              <li
                key={e.id}
                className="w-full min-w-[120px] max-w-[150px] flex items-center justify-center flex-col gap-4 bg-yellow-400 bg-opacity-10 border-[1px] border-yellow-500 rounded-3xl p-3"
              >
                <img
                  src={e.image}
                  className="aspect-square w-14 shadow-2xl rounded-full object-cover"
                />
                <Link to={`/categorias/${e.slug}`} className="w-full">
                  <TextF
                    as="span"
                    size="xs"
                    className="font-semibold block text-center w-full"
                  >
                    {e.name}
                  </TextF>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <Spacer y={6} />

        <div className="form-4-cols-products">
          {products.map((p) => (
            <CardProduct key={p.id} data={{ ...p }} />
          ))}
          {/* {foods.map((p) => (
            <Card data={{ href: `/comidas/${p.id}`, ...p }} />
          ))} */}
        </div>
      </main>
    </>
  );
}
