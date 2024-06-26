import { RiGlobalLine, RiStore2Line } from "react-icons/ri"
import { MdOutlineCurrencyExchange, MdPayment } from "react-icons/md"
import { LuShip, LuTags, LuUser2, LuUserCog2, LuUsers2 } from "react-icons/lu"
import { HiOutlineReceiptTax } from "react-icons/hi"
import { IoFlagOutline } from "react-icons/io5"
import { AiOutlineDollar } from "react-icons/ai"
import { ICategory, IDashboard, IMedia, IProduct, ITag } from "~/components"

export const menu = [
  {
    path: "/admin/dashboard",
    name: "dashboard",
    icon: <IDashboard w={15} h={15} />
  },
  {
    path: "/admin/categorias",
    name: "categorías",
    icon: <ICategory w={15} h={15} />
  },  
  {
    path: "/admin/productos",
    name: "productos",
    icon: <IProduct w={15} h={15} />
  },
  
]
export const menuSetting = [
  {
    path: "/admin/settings/tienda",
    name: "Mi Tienda",
    icon: <RiStore2Line width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/monedas",
    name: "monedas",
    icon: <MdOutlineCurrencyExchange  width={15} height={15} className="text-white" />
  },  
  {
    path: "/admin/settings/staff",
    name: "administradores",
    icon: <LuUserCog2 width={16} height={16} className="text-white" />
  },
  {
    path: "/admin/settings/roles",
    name: "roles",
    icon: <LuUsers2 width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/shipping",
    name: "métodos de envío",
    icon: <LuShip width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/payments",
    name: "pagos",
    icon: <MdPayment width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/tax-category",
    name: "Tax categorías",
    icon: <LuTags width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/tax-rates",
    name: "Tax Rates",
    icon: <HiOutlineReceiptTax width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/paises",
    name: "Países",
    icon: <IoFlagOutline width={15} height={15} className="text-white" />
  },
  {
    path: "/admin/settings/zonas",
    name: "Zonas",
    icon: <RiGlobalLine width={15} height={15} className="text-white" />
  },
]