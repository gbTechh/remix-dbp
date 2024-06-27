/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from 'react';
import { Form, useLoaderData, useNavigation, useActionData, useNavigate, redirect } from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { IoAdd } from 'react-icons/io5';
import { useForm } from '~/hooks';
import { ROUTES } from '~/utils';
import { Alert, Box, Button, Input, OptionsProps, RichText, Select, Spacer, Text } from '~/components';
import { THandleResponse, verifyAuth } from '~/features';
import { ICategory, ICategoryFormOrUpdate, IProduct, IProductCreate, IProductFormOrUpdate } from '~/interfaces';
import { actionEditProduct, listProductById } from '~/features/product';



export const loader = async (context: LoaderFunctionArgs) => {
  const isAuth = await verifyAuth(context.request);
  if (!isAuth) return redirect(ROUTES.ADMIN_LOGIN);
  return await listProductById(context);
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
  console.log({action})
  const { id } = params
  return await actionEditProduct(request, Number(id));
};


export default function AdminAddCategory() {

  const { productById, categories } = useLoaderData<typeof loader>();

  const { name, slug, categoryId, description, discountPrice, mainImage, price, rating, shortDescription, onChange, changeData } = useForm<IProductCreate>({
    name: productById?.name!,
    slug: productById?.slug!,
    categoryId: productById.categoryId!,
    description: productById.description!,
    shortDescription: productById.shortDescription!,
    discountPrice: productById.discountPrice!,
    mainImage: productById.mainImage!,
    price: productById.price!,
    rating: productById.rating!,
    secondaryImages: ''
  });

  const [valueName, setValueName] = useState<string>(productById?.name ?? '');
  const [contentSlug, setContentSlug] = useState<string>(productById?.slug ?? '');
  const [descriptionState, setDescriptionState] = useState<string>(
    productById.description ?? ''
  );
  const [shortDescriptionState, setShortDescriptionState] = useState<string>(
    productById?.shortDescription ?? ""
  );


  const transition = useNavigation()
  // const actionData = useActionData<IHandleResponse>()
  const actionData = useActionData<THandleResponse<IProduct, IProductFormOrUpdate>>()


  useEffect(() => {
    if (valueName) {
      const slug: string = valueName?.replaceAll(" ", "-").toLowerCase();
      setContentSlug(slug);
    }
  }, [valueName]);


 
  const navigate = useNavigate();
  useEffect(() => {
    if (!actionData?.hasError && actionData?.message) {
      navigate(ROUTES.PRODUCT, {
        state: {
          success: true,
          id: actionData.body?.data?.id,
          messageAlert: actionData.message,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.hasError])


  const allCategoriesMappedToSelect: OptionsProps[] = categories.map((e) => {
    return {
      value: `${e.id}`,
      valueText: e.name,
    };
  });

  const [imageState, setImageState] = useState<string>(productById.mainImage ?? '');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageState(file.name); // Set the filename or path as needed
    }
  };

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
      <Spacer y={4} />
      <div className="w-full">
        <Text size="md" type="title">
          Editar un producto
        </Text>
        <Spacer y={2} />
        <Text size="xs" color="contrast" type="base">
          Editar el producto de la tienda.
        </Text>
      </div>
      <Spacer y={12} />
      <Form
        className="flex flex-wrap gap-4"
        method="POST"
        encType="multipart/form-data"
      >
        <div className="flex items-center justify-end w-full">
          <Button
            size="large"
            color="primary"
            className="flex gap-2 items-center justify-center"
            type="submit"
            disabled={transition.state === "submitting"}
          >
            <IoAdd />
            Editar producto
          </Button>
        </div>
        <Box
          w="min-w-[65%] w-8/12"
          nobg
          className=" flex flex-col flex-wrap flex-grow-[2] gap-3  self-baseline"
        >
          <div className="flex items-center w-full flex-col gap-2">
            <div className="grid form-2-cols justify-between w-full gap-2">
              <Input
                label="Nombre"
                className="w-full"
                name="name"
                value={valueName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setValueName(e.target.value);
                }}
                error={actionData?.body?.error?.body?.name}
              />
              <Input
                label="Slug"
                className="w-full lowercase"
                placeholder="pizza-hawaiana"
                name="slug"
                value={contentSlug}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setContentSlug(
                    e.target.value.replaceAll(" ", "-").toLowerCase()
                  );
                }}
                error={actionData?.body?.error?.body?.slug}
              />
            </div>
            <Spacer y={4} />
            <div className="justify-between w-full gap-2">
              <RichText
                label="Descripción"
                name="description"
                value={descriptionState}
                onChange={(e) => {
                  setDescriptionState(e.target.value);
                }}
              />
            </div>
            <div className="justify-between w-full gap-2">
              <RichText
                label="Descripción Corta"
                name="shortDescription"
                value={shortDescriptionState}
                onChange={(e) => {
                  setShortDescriptionState(e.target.value);
                }}
              />
            </div>
            <Spacer y={4} />
            <div className="grid form-2-cols justify-between w-full gap-2">
              <Input
                label="Precio Normal"
                className="w-full"
                placeholder="109.00"
                name="price"
                value={price!}
                onChange={(e) => onChange(e)}
                error={actionData?.body?.error?.body?.price as any}
                type="number"
                step="0.01"
              />
              <Input
                label="Precio descuento"
                className="w-full"
                placeholder="99.90"
                name="discountPrice"
                value={discountPrice!}
                onChange={(e) => onChange(e)}
                type="number"
                step="0.01"
                error={actionData?.body?.error?.body?.discountPrice as any}
              />
            </div>
            <Spacer y={4} />
            <div className="grid form-2-cols justify-between w-full gap-2">
              <Input
                label="Rating"
                className="w-full"
                placeholder="5"
                name="rating"
                type="number"
                value={rating!}
                onChange={(e) => onChange(e)}
                maxLength={5}
                minLength={0}
                error={actionData?.body?.error?.body?.rating as any}
              />
            </div>
          </div>
        </Box>
        <Box
          w="min-w-[300px] w-3/12"
          nobg
          className="flex flex-col flex-wrap flex-grow-[2] gap-3  self-baseline"
        >
          <Spacer y={2} />
          <Select
            arrOptions={allCategoriesMappedToSelect}
            defaultValue="Seleccionar categoría"
            label="Categoría"
            className="w-full"
            name="categoryId"
            value={`${categoryId}`}
            onChange={(ev) => {
              onChange(ev);
            }}
            error={actionData?.body?.error?.body?.categoryId as any}
          />
          <Spacer y={4} />
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