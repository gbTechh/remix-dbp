import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "@remix-run/react";

import { useEffect, useState } from "react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { IoAdd } from "react-icons/io5";
import { THandleResponse, verifyAuth } from "~/features";
import { ProductResponse, actionAddProduct, addProductPage } from "~/features/product";
import { IProductFormOrUpdate } from "~/interfaces";
import { Alert, Box, Button, IAddImage, Input, OptionsProps, RichText, Select, Spacer, Text, TypeMultiselectData, useMultiSelect } from "~/components";
import { ROUTES } from "~/utils";


export const loader = async ({ request }: LoaderFunctionArgs) => {
  const isAuth = await verifyAuth(request);
  if (!isAuth) return redirect(ROUTES.ADMIN_LOGIN);
  return await addProductPage(request);
};

export const action = async ({ request }: ActionFunctionArgs) => {
  return await actionAddProduct(request)
};

export default function AdminAddProduct() {
  const [contentSlug, setContentSlug] = useState<string>("");
  const [valueName, setValueName] = useState<string>();
  const [descriptionState, setDescriptionState] = useState<string>("");
  const [shortDescriptionState, setShortDescriptionState] = useState<string>("");


  const { categories } =
    useLoaderData<typeof loader>();
  const actionData =
    useActionData<
      THandleResponse<ProductResponse, IProductFormOrUpdate>
    >();
  const transition = useNavigation();

 
  const allCategoriesMappedToSelect: OptionsProps[] = categories.map((e) => {
    return {
      value: `${e.id}`,
      valueText: e.name,
    };
  });

  useEffect(() => {
    if (valueName) {
      const slug: string = valueName?.replaceAll(" ", "-");
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
  }, [actionData?.hasError]);

  const titleAlert =
    actionData && actionData.hasError
      ? (actionData?.message as string)
      : "Proceso exitoso";
  const messageAlert =
    actionData && actionData.hasError
      ? (actionData?.body?.error?.message as string)
      : (actionData?.message as string);

  return (
    <div className="">
      {actionData && (
        <Alert
          title={titleAlert}
          message={messageAlert}
          duration={3000}
          type={`${actionData.hasError ? "error" : "success"}`}
        />
      )}
      <Spacer y={4} />
      <div className="w-full">
        <Text size="md" type="title">
          Agregar un nuevo producto
        </Text>
        <Spacer y={2} />
        <Text size="xs" color="contrast" type="base">
          Agrega un nuevo producto a tu tienda.
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
            Agregar producto
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
                placeholder="Pizza hawaiana"
                name="name"
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
                  setContentSlug(e.target.value.replaceAll(" ", "-"));
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
                error={actionData?.body?.error?.body?.price as any}
                type="number"
                step="0.01"
              />
              <Input
                label="Precio descuento"
                className="w-full"
                placeholder="99.90"
                name="discountPrice"
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
            error={actionData?.body?.error?.body?.categoryId as any}
          />
          <Spacer y={4} />
          <div>
            <label htmlFor="mainImage">
              <Text as="span" size="sm">
                Imagen Principal
              </Text>
            </label>
            <Spacer y={4} />
            <input
              type="file"
              name="mainImage"
              id="mainImage"
              className="w-full text-white text-[14px]"
            />
          </div>
          <Spacer y={4} />
          <div>
            <label htmlFor="secondaryImages">
              <Text as="span" size="sm">
                Imagenes Secundarias
              </Text>
            </label>
            <Spacer y={4} />
            <input
              multiple
              type="file"
              name="secondaryImages"
              id="secondaryImages"
              className="w-full text-white text-[14px]"
            />
          </div>
        </Box>
      </Form>
    </div>
  );
}
