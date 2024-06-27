/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Form, useLoaderData, useNavigation, useActionData, useNavigate, redirect } from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { IoAdd } from 'react-icons/io5';
import { useForm } from '~/hooks';
import { ROUTES } from '~/utils';
import { Alert, Box, Button, Input, ModalEdit, Select, Spacer, Text, Toggle } from '~/components';
import { THandleResponse, actionEditCategory, listCategoryById, verifyAuth } from '~/features';
import { ICategory, ICategoryFormOrUpdate } from '~/interfaces';



export const loader = async (context: LoaderFunctionArgs) => {
  const isAuth = await verifyAuth(context.request);
  if (!isAuth) return redirect(ROUTES.ADMIN_LOGIN);
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
  return await actionEditCategory(request, Number(id));
};


export default function AdminAddCategory() {

  const categoryById = useLoaderData<typeof loader>();

  const { name, slug, image, onChange, changeData } = useForm({
    name: categoryById?.name,
    slug: categoryById?.slug,
    image: categoryById?.image,
  });

  const [imageState, setImageState] = useState<string>(image);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageState(file.name); // Set the filename or path as needed
    }
  };


  const transition = useNavigation()
  // const actionData = useActionData<IHandleResponse>()
  const actionData = useActionData<THandleResponse<ICategory, ICategoryFormOrUpdate>>()
  console.log({actionData})
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

 const refInputFile = useRef<HTMLInputElement>(null); 
  const handleDeleteImage = () => {
    if (refInputFile.current) {
      refInputFile.current.value = "";
      setImageState("");
      setImagePreview(null);
    }
  };



  return (
    <div className="">
      <Form className="" method="POST" encType="multipart/form-data">
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
            className="flex flex-col flex-wrap flex-grow-[2] gap-3 w-3/7 min-w-[300px] w-3/12 overflow-hidden"
          >
            <Text size="sm">Editar imagen:</Text>
            <div className="w-32 h-32 relative aspect-square">
              <img
                className="object-cover w-full h-full aspect-square rounded-lg"
                src={imagePreview || `${imageState}`}
              />
              {imageState !== "" && (
                <div className="bg-black/80 opacity-0 hover:opacity-100 grid place-items-center w-full h-full absolute top-0 left-0">
                  <Text
                    color="error"
                    as="button"
                    className="w-full h-full"
                    onClick={handleDeleteImage}
                  >
                    Eliminar
                  </Text>
                </div>
              )}
            </div>
            <Spacer y={1} />

            <input
              ref={refInputFile}
              type="file"
              name="image"
              onChange={handleFileChange}
              className="text-white text-[14px]"
            />
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