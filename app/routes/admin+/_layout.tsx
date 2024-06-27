import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  useLoaderData,
  Link,
  Outlet,
  useMatches,
  Form,
} from "@remix-run/react";
import React, { useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";

import { IoSettingsOutline } from "react-icons/io5";
import { FaCaretDown } from "react-icons/fa";
import { Box, Button, DividerX, DividerY, DropdownMenu, ISquare, Spacer, Text, Toggle } from "~/components";
import { menu, menuSetting } from "~/utils/menu";
import { ROUTES } from "~/utils";
import { authenticator } from "~/features";
import { IAuthStaff } from "~/interfaces";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    
  const user = (await authenticator.isAuthenticated(request, {
    failureRedirect: ROUTES.ADMIN_LOGIN,
  })) as IAuthStaff | null;
  return { user };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const form = await request.formData();
  const action = form.get("action");

  switch (action) {
    case "logout":
      await authenticator.logout(request, { redirectTo: ROUTES.ADMIN_LOGIN });
      break;
    default:
      return null;
  }
};

const HeaderMenu = ({ name }: { name: string }) => {
  return (
    <div className="flex">
      <Text size="sm" type="title" className=" mr-1">
        Hola,
      </Text>
      <Text
        size="xs"
        type="base"
        className="capitalize font-bold flex items-center pt-[3px]"
      >
        {name}
      </Text>
    </div>
  );
};

export default function AdminLayout() {
  const { user } = useLoaderData<typeof loader>();
  console.log({user})
  const [isVisible, setIsVisible] = useState(true);

  const matches = useMatches();
  const objPaths = matches.at(-1);
  const actualPath = matches[matches.length - 1].pathname.split("/").at(-1);
  const getMenuPath = menu.find(
    (e) => `${e.path.split("/").at(-1)}` === `${actualPath}`
  );
  const paths = matches[matches.length - 1].pathname.split("/");
  paths.splice(0, 2);

  const currentPath = paths.at(-1);
  // const header = <HeaderMenu name={user?.full_name.split(" ")[0] ?? "user"} />;
  const header = <HeaderMenu name={user?.name!} />;

  const [openSetting, setOpenSetting] = useState(false);
  const handleButtonSetting = () => {
    setOpenSetting(!openSetting);
  };

  return (
    <div className="bg-gradient-to-r from-gradientstart to-gradientbuttonstart h-full w-full min-h-screen flex ">
      <aside
        className={`transition-width fixed z-20 md:relative p-2 md:p-3 md:pr-2 lg:pr-3 lg:p-4 min-h-screen ${
          isVisible ? "flex" : "hidden"
        } md:flex items-stretch w-full h-auto  ${
          isVisible ? "md:max-w-[320px]" : "md:max-w-[160px]"
        } `}
      >
        <Box className="w-full h-auto flex flex-col">
          <Spacer y={3} />
          <div className="flex justify-between items-center">
            <div className="w-auto h-auto flex">
              {isVisible && (
                <span className="rounded-full w-3 h-3 bg-violet-800 block"></span>
              )}
              <span className="rounded-full w-3 h-3 bg-violet-700 block"></span>
              <span className="rounded-full w-3 h-3 bg-violet-600 block"></span>
            </div>
            <div className="flex items-center justify-end">
              <Toggle
                onChange={() => {
                  setIsVisible(!isVisible);
                }}
                isChecked={isVisible}
                text={isVisible ? "Menu" : ""}
                name=""
              />
            </div>
          </div>
          <Spacer y={9} />
          <Text
            as="h1"
            type="title"
            size={`${isVisible ? "md" : "sm"}`}
            className="text-center transition-all"
          >
            Nombre del comercio
          </Text>
          <Spacer y={3} />
          <DividerX />
          <Spacer y={6} />
          <div className="flex flex-col justify-between h-full relative">
            <ul className={`${isVisible && "fadein"} h-auto`}>
              {menu.map((e, i) => (
                <li
                  key={i}
                  className="rounded-lg hover:bg-gradientbuttonend transition-colors p-3 px-4 my-1"
                >
                  <Link
                    to={e.path}
                    className={`w-full flex items-center ${
                      !isVisible && "md:justify-center"
                    }`}
                  >
                    {React.cloneElement(e.icon, {
                      w: isVisible ? 15 : 18,
                      h: isVisible ? 15 : 18,
                    })}
                    <Text
                      as="span"
                      type="base"
                      size="14"
                      className={`ml-2 capitalize ${!isVisible && "md:hidden"}`}
                    >
                      {e.name}
                    </Text>
                  </Link>
                </li>
              ))}
            </ul>
            
          </div>
        </Box>
      </aside>
      <main className="flex flex-col  md:pl-0 lg:pl-0 p-2 md:p-3 lg:p-4 w-full h-auto max-h-screen overflow-hidden">
        <section className="pb-1 md:pb-2 lg:pb-3 ">
          <Box className="flex w-full" p="px-4 py-2">
            <div className="flex-1">asdsad</div>
            <Spacer x={2}></Spacer>
            <DividerY h={2} />
            <Spacer x={2}></Spacer>
            <div className=" items-center justify-center flex">
              <DropdownMenu topHead={header} pdrop="p-0" wdrop="min-w-[150px]">
                <ul className="py-1">
                  <Text
                    as="li"
                    size="xs"
                    className="p-2 px-4 hover:bg-buttonprimary transition-all"
                  >
                    Configuración
                  </Text>
                  {user && (
                    <>
                      <DividerX full />
                      <Text
                        as="li"
                        size="xs"
                        className="cursor-pointer hover:text-white transition-colors flex gap-2 justify-center items-center p-2 px-4"
                        color="contrast"
                      >
                        <AiOutlineLogout />
                        <Form method="post">
                          <button type="submit" name="action" value="logout">
                            Cerrar sesión
                          </button>
                        </Form>
                      </Text>
                    </>
                  )}
                </ul>
              </DropdownMenu>
            </div>
          </Box>
        </section>
        <Box className="h-full flex flex-col max-h-[calc(100vh_-_85px)] overflow-auto scrollbar-thin">
          <div>
            <div className="flex items-center">
              {getMenuPath?.icon &&
                React.cloneElement(getMenuPath?.icon, {
                  w: 12,
                  h: 12,
                  color: "#52E475",
                })}
              <Text size="md" className="capitalize ml-2 pt-[1px]">
                {actualPath}
              </Text>
            </div>
          </div>
          <div className="flex relative mt-3">
            <div className="mx-2 -mt-2">
              <span className="h-5 w-[1.5px] bg-zinc-600 block rounded-full"></span>
              <span className="h-1 w-2  block rounded-sm -mt-[3px] baston-breadcrumb"></span>
            </div>
            <div className="flex">
              {paths.map((e, i) => (
                <div key={i} className="flex">
                  <Link
                    to={`${
                      currentPath !== e
                        ? `${ROUTES.ADMIN}/${e}`
                        : objPaths?.pathname
                    }`}
                    className={`flex items-center `}
                  >
                    <ISquare
                      w={12}
                      h={12}
                      color={`${currentPath !== e ? "#C0C0C0" : "#52525B"}`}
                    />
                    <Text
                      color="custom"
                      size="xs"
                      type="base"
                      as="span"
                      className={`ml-1 ${
                        currentPath !== e ? `text-contrast` : "text-zinc-600"
                      }`}
                    >
                      {e}
                    </Text>
                    {currentPath !== e && (
                      <Text
                        className="mx-2 -mb-1"
                        size="xs"
                        color="contrast"
                        as="span"
                        type="title"
                      >
                        /
                      </Text>
                    )}
                  </Link>
                </div>
              ))}
            </div>
          </div>
          <Spacer y={4} />
          <DividerX />
          <Outlet />
        </Box>
      </main>
    </div>
  );
}
