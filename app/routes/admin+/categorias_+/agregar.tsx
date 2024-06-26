import { Form, useLoaderData, useNavigation, useActionData, useNavigate, useSubmit, redirect } from '@remix-run/react';

import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from 'react';

import { ROUTES } from '~/utils';
import { Alert, Box, Button, Input, ModalEdit, Select, Spacer, Text, Toggle } from '~/components';
import { THandleResponse } from '~/features/common/handleResponse';
import { CategoryResponse, actionAddCategory, verifyAuth } from '~/features';
import { ICategoryFormOrUpdate } from '~/interfaces';


// export function ErrorBoundary() {
//   return (
//     <div>
//       <Text as='h1' type='title'>Oops!</Text>
//       <Text>Algo salio mal</Text>
//     </div>
//   );   
// }

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isAuth = await verifyAuth(request);
  if (!isAuth) return redirect(ROUTES.ADMIN_LOGIN);
  return null;
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await actionAddCategory(request);
};


export default function AdminAddCategory() {
  const transition = useNavigation();
  const [contentSlug, setContentSlug] = useState<string>("");
  const [valueName, setValueName] = useState<string>();
  const [imgSelected, setImgSelected] = useState<string | null>(null);
  const actionData =
    useActionData<
      THandleResponse<CategoryResponse, ICategoryFormOrUpdate>
    >();
  
  useEffect(() => {
    if (valueName) {
      const slug: string = valueName?.replaceAll(" ", "-");
      setContentSlug(slug);
    }
  }, [valueName]);

   const navigate = useNavigate();
   useEffect(() => {
     if (!actionData?.hasError && actionData?.message) {
       navigate(ROUTES.CATEGORY, {
         state: {
           success: true,
           id: actionData.body?.data,
           messageAlert: actionData.message,
         },
       });
     }
     // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [actionData?.hasError]);
  
  return (
    <div className="">
      <Form className="" method="POST" encType="multipart/form-data">
        <Spacer y={4} />
        <div className="w-full">
          <Text size="md" type="title">
            Agregar una nueva categoría
          </Text>
          <Spacer y={2} />
          <Text size="xs" color="contrast" type="base">
            Agrega una nueva categoría a tu tienda.
          </Text>
        </div>
        <Spacer y={6} />
        <div className="flex items-center justify-end w-full">
          <Button
            size="large"
            color="primary"
            className="flex gap-2 items-center justify-center"
            type="submit"
            disabled={transition.state === "submitting"}
          >
            <IoAdd />
            Agregar categoría
          </Button>
        </div>
        <Spacer y={6} />
        <div className="flex flex-wrap gap-4">
          <Box
            nobg
            w="w-8/12"
            className="flex flex-col flex-wrap flex-grow-[2] gap-3 self-baseline"
          >
            <div className="flex items-center w-full flex-col gap-2">
              <div className="grid form-2-cols justify-between w-full gap-2">
                <Input
                  label="Nombre"
                  className="w-full"
                  name="name"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setValueName(e.target.value);
                  }}
                  error={actionData?.body?.error?.body?.name}
                />
                <Input
                  label="Slug"
                  className="w-full"
                  name="slug"
                  value={contentSlug}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setContentSlug(e.target.value.replaceAll(" ", "-"));
                  }}
                  error={actionData?.body?.error?.body?.slug}
                />
              </div>
              <Spacer y={4} />
            </div>
          </Box>
          <Box
            nobg
            w="w-3/12"
            className="flex flex-col flex-wrap flex-grow-[2] gap-3 w-3/7 min-w-[300px] w-3/12"
          >
            <label htmlFor="image">
              <Text as="span">Escoja su archivo</Text>
            </label>
            <input
              type="file"
              name="image"
              id="image"
              className="w-full text-white"
            />

            {/* <input type='hidden' name='idfile' value={imgSelected?.id} /> */}
          </Box>
        </div>
      </Form>
      {actionData?.hasError === true && (
        <Alert
          title={actionData.message as string}
          message={actionData.body?.error?.message as string}
          type="error"
          duration={6000}
        />
      )}

      {/* <ModalEdit size={'w-full md:w-10/12 lg:max-w-[1450px]'} open={openModalEdit} setIsOpen={setOpenModalEdit} title='Selecciona la imagen'
        onClickClose={() => {
          setImgSelected(null)
        }}
        buttonAction={<Button type="button" className={`${imgSelected ?? 'opacity-30'}`} disabled={imgSelected === null}
          onClick={() => {
            setOpenModalEdit(false)
          }}>Agregar Imagen</Button>}
      >
        <div className='flex w-full flex-col'>
         <ShowMedia files={dataFiles.files} totalData={dataFiles.count} imgSelected={imgSelected} setImgSelected={setImgSelected} />
        </div>
      </ModalEdit> */}
    </div>
  );
}