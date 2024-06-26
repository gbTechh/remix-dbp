import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MdArrowOutward } from "react-icons/md";
import { CardProduct, Spacer, Text, TextF } from "~/components";
import { listProducts } from "~/features/product";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return listProducts(request)
};

export default function Home() {
  const products = useLoaderData<typeof loader>();

  return (
    <>
      <header>
        <div className="mt-4 mx-auto max-w-[650px]">
          <TextF
            as="h1"
            color="primary"
            type="title"
            className="w-full text-center font-bold  text-4xl md:text-5xl  lg:text-6xl"
            size="custom"
          >
            Despierta temprano! Come fresco y saludable
          </TextF>
          <Spacer y={8} />
          <TextF color="contrast" className="text-center">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            vero ipsum autem error ex vitae, odit voluptate placeat eveniet
            fugiat explicabo sit delectus at quo? Deserunt cum eum labore quasi?
          </TextF>
        </div>
      </header>
      <Spacer y={18} />
      <main className="flex justify-center flex-col">
        <TextF
          type="title"
          color="contrast"
          size="custom"
          className="w-full text-center text-2xl"
        >
          Nuestros mejores productos para ti.
        </TextF>
        <Spacer y={12} />
        <Link
          to="/productos"
          className="font-biryani bg-yellow-500 text-white font-semibold p-3 text-sm rounded-xl self-center w-auto"
        >
          Conoce nuestra carta
        </Link>
        <Spacer y={12} />
        <section className="flex flex-wrap gap-8 justify-center items-center">
          {products.slice(0,4).map((p) => (
            <CardProduct key={p.id} data={p} />
          ))}
        </section>
      </main>
    </>
  );
}
