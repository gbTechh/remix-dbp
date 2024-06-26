import React from "react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Button, Input, Spacer, Text } from "../components";
import { actionLoginAdmin } from "~/features";

export const loader = async ({request}: LoaderFunctionArgs) => {
  return null;
}
export const action = async ({request}: ActionFunctionArgs) => {
  return await actionLoginAdmin(request);
  
}


export default function AdminLogin() {
  // const loaderData = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()
  

  return (    
    <div
      className="relative w-screen h-screen bg-cover bg-center bg-gradient-to-r from-gradientstart to-gradientbuttonstart"
      // style={{
      //   background:
      //     'linear-gradient(180deg, rgb(147 147 155 / 29%) 43%, rgb(255 255 255) 100%)',
      // }}
    >
      <div className="absolute w-[1px] h-[1px] rounded-full login-color1 bg-transparent bottom-0 left-48"></div>
      <div className="absolute w-[1px] h-[1px] rounded-full login-color2 bg-transparent top-0 right-0"></div>
      <div className="absolute w-[1px] h-[1px] rounded-full login-color3 bg-transparent top-0 left-0"></div>
      <div className="absolute w-[1px] h-[1px] rounded-full login-color4 bg-transparent"></div>
      <div className="flex justify-center items-center w-full h-full md:py-5  ">
        <div className={`w-full h-full md:rounded-2xl flex items-center justify-center relative overflow-hidden md:w-1/2 md:max-h-[800px] lg:max-w-[500px] md:border-[0.5px] ${actionData ? 'border-red-900' : 'border-primary'} m-auto`}>
          <div className="absolute animation-border "></div>
          <div
            className="relative login-blur-wrapp  shadow-2xl overflow-hidden m-auto flex w-full h-full"
            // style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)' }}
          >
            <div className="absolute w-[1px] h-[1px] rounded-full login-color11 top-0 left-10"></div>
            <div className="absolute w-[1px] h-[1px] rounded-full login-color22 top-40 left-40"></div>
            <div className="absolute w-[1px] h-[1px] rounded-full login-color33 bottom-0 -left-0"></div>
            <div className="absolute w-[1px] h-[1px] rounded-full login-color44 left-20"></div>
            <div className="p-20 flex flex-col self-center w-full">
              
              <Text
                size="custom"
                type="title"                
                className="text-3xl font-bold uppercase relative"
              >
                Bienvenido.
              </Text>
              <Spacer y={8} />
              <Form method="post">
                <Input 
                  label="Escribe tu email"
                  placeholder="isac.newton@gmail.com"
                  name="email"
                  error={actionData && actionData}
                />
                <Spacer y={4} />
                <Input 
                  label="Escribe tu contraseña"
                  placeholder="Contraseña..."
                  name="password"
                  type="password"
                  error={actionData && actionData}
                />
                <Spacer y={8} />
                <Button size="large" color="primary" full type="submit" className="rounded-md" >Continuar</Button>
              </Form>
             
            </div>
          </div>
        </div>
      </div>
    </div>
   
  );
}

