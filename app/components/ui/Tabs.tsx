import React from "react";
import { Link, useLocation } from "@remix-run/react";
// import classNames from "classnames";
import { HTMLAttributes } from "react";
import { Text } from ".";

interface Props extends HTMLAttributes<HTMLDivElement> {
  routes: TRoutes[]
}

export type TRoutes = {
  id: number
  path: string;
  name: string
}

export function Tabs({ routes }: Props) {
  const location = useLocation();
  const clasesActuaPath = (path:string) => {
    let clases = ''
    if(location.pathname === path){
      clases = 'bg-gradient-to-bl from-gradientbuttonend to-gradientbuttonstart border-primary hover:opacity-90'
    }else{
      clases = 'bg-zinc-800  border-transparent opacity-50'
    }
    return clases
  }
  return (   
    <nav className="w-full py-2 border-b-[0.8px] border-primary">
      <ul className="w-full flex gap-2">
      {
        routes?.length && routes.map(e => (
          <li key={e.id} className={`min-w-[100px] text-center  transition-all hover:bg-gradient-to-bl hover:from-gradientbuttonend hover:to-gradientbuttonstart rounded-lg hover:border-primary border-[0.8px] ${clasesActuaPath(e.path)}`}>
              <Link to={e.path} className="p-2 block capitalize">
                <Text as='span' size="xs">
                {e.name}
                </Text>
              </Link>
            </li>   
          ))
      }
      </ul>          
    </nav>
  );
}