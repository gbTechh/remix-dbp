/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Form, useLoaderData, useNavigation, useActionData, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { IoAdd } from 'react-icons/io5';
import { useForm } from '~/hooks';
import { ROUTES } from '~/utils';
import { Alert, Box, Button, Input, ModalEdit, Select, Spacer, Text, Toggle } from '~/components';
import { THandleResponse, listCategoryById } from '~/features';
import { ICategory, ICategoryFormOrUpdate } from '~/interfaces';



export const loader = async (context: LoaderFunctionArgs) => {
  return await listCategoryById(context)
};

// export function ErrorBoundary() {
//   return (
//     <div>
//       <Text as='h1' type='title'>Oops!</Text>
//       <Text>Algo salio mal</Text>
//     </div>
//   );   
// }


export const action = async ({ request, params }: ActionFunctionArgs) => {
  const { id } = params
  // return await actionEditCategory(request, Number(id))
};


export default function AdminAddCategory() {

  const categoryById = useLoaderData<typeof loader>();

  const { name, slug, image, onChange, changeData } = useForm({
    name: categoryById?.name,
    slug: categoryById?.slug,
    image: categoryById?.image,
  });



  const transition = useNavigation()
  // const actionData = useActionData<IHandleResponse>()
  const actionData = useActionData<THandleResponse<ICategory, ICategoryFormOrUpdate>>()

  useEffect(() => {
    if (name) {
      const slug: string = name?.replaceAll(' ', '-')
      changeData('slug', slug)
    }
  }, [name])

 
  const navigate = useNavigate();
  useEffect(() => {
    if (!actionData?.hasError && actionData?.message) {
      navigate(ROUTES.CATEGORY, {
        state: {
          success: true,
          id: actionData.body?.data?.id,
          messageAlert: actionData.message,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.hasError])



  return (
    <div className="">
      <Form className="" method="POST">
        <Spacer y={4} />
        <div className="w-full">
          <Text size="md" type="title">
            Editar la categoría
          </Text>
          <Spacer y={2} />
          <Text size="xs" color="contrast" type="base">
            Edita la categoría de tu tienda.
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
            Editar categoría
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
                  label="Nombres"
                  className="w-full"
                  name="name"
                  value={name}
                  onChange={(ev) => {
                    onChange(ev);
                  }}
                  error={actionData?.body?.error?.body?.name}
                />
                <Input
                  label="Slug"
                  className="w-full"
                  name="slug"
                  value={slug}
                  onChange={(ev) => {
                    onChange(ev);
                  }}
                  error={actionData?.body?.error?.body?.slug}
                />
              </div>
            </div>
          </Box>
          <Box
            nobg
            w="w-3/12"
            className="flex flex-col flex-wrap flex-grow-[2] gap-3 w-3/7 min-w-[300px] w-3/12"
          >
            <Spacer y={1} />
     
          </Box>
        </div>
        <input type="hidden" value={categoryById!.id} name="id" />
      </Form>
      {actionData?.hasError === true && (
        <Alert
          title={actionData.message as string}
          message={actionData.body?.error?.message as string}
          type="error"
          duration={6000}
        />
      )}
    </div>
  );
}