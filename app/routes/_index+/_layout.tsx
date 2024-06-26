import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Button, ICartShop, Text, TextF } from "~/components";
import { useCartStore } from "~/store";




export const loader = async ({ request }: LoaderFunctionArgs) => {
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const action = form.get("action");


};

export default function Layout() {
 

  return (
    <div className="w-full min-h-screen bg-whitecontrast">
      <div className=" max-w-[1400px] mx-auto">
        <HeaderMenu />
        <main className="px-2 md:px-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

interface CartProps {
  setOpenCart: React.Dispatch<React.SetStateAction<boolean>>;
}
const CartAside = ({ setOpenCart }: CartProps) => {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  console.log({items})
  return (
    <div className="fixed z-50 w-screen h-screen top-0 left-0">
      <div className="bg-black/20 w-full h-full flex justify-end">
        <div className="bg-white w-full shadow-2xl max-w-[300px] rounded-tl-3xl rounded-bl-3xl p-6 flex flex-col gap-2">
          <div className="border-b-[0.8px] border-b-gray-200 flex justify-between items-center pb-4 mb-4">
            <TextF>Mi carrito</TextF>
            <button onClick={() => setOpenCart(false)}>
              <IoClose />
            </button>
          </div>
          <div>
            {items.length === 0 ? (
              <TextF className="py-4">Tu carrito esta vacío...!</TextF>
            ) : (
              <ul className="flex flex-col gap-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-row gap-2 items-center p-2 border-[0.8px] border-gray-200 rounded-xl"
                  >
                    <div className="w-12 min-w-[48px] grid place-items-center">
                      <img className="aspect-square w-full h-full rounded-full object-cover" src={`/uploads/products/${item.image}`}/>
                    </div>
                    <div className="flex gap-1 flex-col items-start w-full">
                      <TextF size="sm">
                        {item.name}
                      </TextF>
                      <TextF size="xs" color="contrast">
                        S/.{(Number(item.price.toFixed(2)) * item.quantity)} x {item.quantity}
                      </TextF>

                    </div>
                    <button onClick={() => removeItem(item.id)}>
                      <TextF color="error" size="xs">
                        eliminar
                      </TextF>
                    </button>
                    {/* <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value, 10))
                      }
                      min="1"
                    /> */}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const HeaderMenu = () => {
  const [openCart, setOpenCart] = useState<boolean>(false)
  const items = useCartStore((state) => state.items);
  const [quantityCart, setQuantityCart] = useState<number>(0)

  useEffect(() => {
    let q = 0
    for (const item of items) {
      q += item.quantity
    }

    setQuantityCart(q)
  
  }, [items])
  
  return (
    <div className="flex p-2 py-2 px-2 md:px-4">
      <nav className="w-full py-4 grid grid-cols-8">
        <div className="col-span-3">
          <a href="/">Logo</a>
        </div>
        <div className="col-span-3"></div>
        <div className="col-span-2 flex justify-end items-center">
          <Button
            onClick={() => setOpenCart(true)}
            className="w-auto flex gap-2"
          >
            Mi carrito
            {
              quantityCart > 0 &&
              <span className="bg-fprimary rounded-full w-5 block text-black">
                {quantityCart}
              </span>
            }
          </Button>
        </div>
      </nav>
      {openCart && <CartAside setOpenCart={setOpenCart} />}
    </div>
  );
};

