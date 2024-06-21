import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MdArrowOutward } from "react-icons/md";
import { Spacer, Text } from "~/components";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null
};

export default function Home() {
  const categories = useLoaderData<typeof loader>();

  return (
    <div>
      <header
        className="bg-cover bg-no-repeat relative rounded-2xl w-full min-h-[400px] h-[calc(90vh_-_126px)]"
        style={{
          backgroundImage: `url('./images/banner3.jpg')`,
          backgroundPosition: "center",
        }}
      >
        <div className="p-10 py-20 md:max-w-[50%]">
          <Text size="custom" className="text-6xl font-semibold text-sahdow-sm">
            Las joyas más exclusivas en una sola tienda
          </Text>
          <div>
            <button></button>
            <button></button>
          </div>
        </div>
        <div className="absolute bottom-0 flex items-center justify-center w-full mb-20">
          <Link to={"/shop"} className="flex">
            <Text
              color="black"
              size="14"
              className="font-bold rounded-full bg-white p-4 px-6"
            >
              Ver toda la tienda
            </Text>
            <span className="rounded-full h-auto w-[53px] aspect-square bg-white -ml-1 grid place-content-center">
              <MdArrowOutward className="text-2xl" />
            </span>
          </Link>
        </div>
        <div className="rounded-xl bg-white w-60 h-auto absolute right-10 bottom-0 mb-10">
          <Text color="black">Producto en oferta</Text>
        </div>
      </header>
      <Spacer y={16} />
      <Text color="black" type="title" size="xl" className="w-full text-center">
        Top Categorías
      </Text>
      <Spacer y={16} />
      
    </div>
  );
}
