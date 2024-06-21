import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { ICartShop, Text } from "~/components";




export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const action = form.get("action");


};

export default function ShopLayout() {
  const categories = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <Banner />
      <HeaderMenu />
      <main className="px-2 md:px-4">
        <Outlet />
      </main>
    </div>
  );
}



const HeaderMenu = () => {
  return (
    <div className="flex p-2 py-2 px-2 md:px-4">
      <nav className="hidden  items-center h-auto flex-1">
        <ul className="flex items-center gap-2">
          <li className="px-2">
            <Link to={"/categorias/géneros"}>Géneros</Link>
          </li>
          <li className="px-2">
            <Link to={"/categorias"}>Categorías</Link>
          </li>
          <li className="px-2">
            <Link to={"/shop"}>Shop</Link>
          </li>
          <li className="px-2">
            <Link to={"/ofertas"}>Ofertas</Link>
          </li>
          <li className="px-2">
            <Link to={"/nosotros"}>Nosotros</Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center min-w-[100px] flex-1">
        <button className="w-10 flex items-start justify-center gap-1 flex-col h-4">
          <span className="w-6 bg-black block h-[2px] rounded-full"></span>
          <span className="w-3 bg-black block h-[2px] rounded-full"></span>
          <span className="w-6 bg-black block h-[2px] rounded-full"></span>
        </button>
      </div>
      <div className="flex-1">
        <Text
          type="title"
          className="w-full text-center text-[1.5rem] sm:text-[1.8rem] font-medium"
          color="black"
          size="custom"
        >
          Tienda
        </Text>
      </div>
      <div className="flex items-center flex-1 justify-end">
        <ul className="flex gap-2 items-center">
          <li className="px-1">
            <Link to={"/nosotros"}>
              <Text as="span" color="black">
                Nosotros
              </Text>
            </Link>
          </li>
          <li className="px-1">
            <Link to={"/nosotros"}>
              <Text as="span" color="black">
                Faq
              </Text>
            </Link>
          </li>
          <button className="rounded-full justify-center border-[1px] border-shopborder w-10 h-10 flex items-center">
            <ICartShop color="#858585" w={12} h={12} />
          </button>
        </ul>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <div className="bg-black w-full p-2 ">
      <Text size="sm" type="title" className="text-center w-full">
        Get 25% off this summer Sole, Grob it Fost!!
      </Text>
    </div>
  );
};
