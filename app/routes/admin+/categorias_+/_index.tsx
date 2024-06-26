import { useState } from 'react';
import { Form, useActionData, useLoaderData, useLocation, useNavigate } from '@remix-run/react';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { IoAdd } from "react-icons/io5";
import { Alert, Button, IActionOption, ModalDelete, Spacer, Table, Text } from '~/components';
import { ROUTES } from '~/utils';
import { listCategories } from '~/features';



const headers = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Nombre Categoría' },  
  { key: 'slug', label: 'Slug' },
  {
    key: 'image',
    label: 'Imagen',
  },
]

export const loader = async ({request}: LoaderFunctionArgs) => {
  return listCategories(request);
};

export const action = async ({ request }: ActionFunctionArgs) => {

};

export default function AdminCategory() {
  const categories = useLoaderData<typeof loader>()
  const actionData = useActionData<typeof action>()

  const navigate = useNavigate();
  const location = useLocation();
  const [idCategory, setIdCategory] = useState<number | null>(null)
  const [openModal, setOpenModal] = useState(false)
  const actionOptions: IActionOption[] = [
    {
      label: 'Editar',
      onClick: (id: number) => {
        navigate(`${ROUTES.EDIT_CATEGORY}/${id}`)
      },
    },
    {
      label: 'Eliminar',
      onClick: (id) => {
        setIdCategory(id)
        setOpenModal(true)
      },
    },
  ]

  const success = location.state?.success;
  const messageAlert = location.state?.messageAlert;

  const allCategories = categories.map((e) => {
    return {
      ...e,
      image: (
        <img
          src={e.image || "/images/no-image.jpg"}
          alt={e.name}
          width={40}
          height={40}
          className="object-cover aspect-square rounded-lg bg-zinc-600"
        />
      ),
    };
  })


  return (
    <div className="">
      {success && (
        <Alert title='Acción realizada con éxito' message={messageAlert} type="success" duration={3000} />
      )}
      {/* {actionData && (
        <Alert
          message={actionData.body?.error?.message as string}
          type={`${actionData.hasError ? "error" : "success"}`}
          title={actionData.message as string}
          duration={3000}
        />
      )} */}
      <div className="flex">
        <div className="w-full">
          <Spacer y={4} />
          <Text size="sm" type="title">
            Todas las categorías
          </Text>
          <Spacer y={2} />
          <Text size="xs" color="contrast" type="base">
            Cree edite y elimine todas las categorías de su tienda
          </Text>
          <Spacer y={6} />
        </div>
        <div className="flex items-center justify-end w-full">
          <Button
            type="button"
            size="large"
            color="primary"
            className="flex gap-2 items-center justify-center"
            onClick={() => navigate(ROUTES.ADD_CATEGORY)}
          >
            <IoAdd />
            Agregar categoría
          </Button>
        </div>
      </div>
      <Spacer y={6} />
      <Table headers={headers} data={allCategories} actionOptions={actionOptions} />
      <Form
        method="DELETE"
        onSubmit={() => {
          setOpenModal(false);
        }}
      >
        <input type="hidden" name="_method" value="DELETE" />
        <input type="hidden" name="id" value={idCategory! ?? ''} />
        <input type="hidden" name="action" value="delete" />
        <ModalDelete
          open={openModal}
          setIsOpen={setOpenModal}
          title="¿Desea eliminar la categoría?"
        >
          <Text>{idCategory}</Text>
        </ModalDelete>
      </Form>
    </div>
  );
}



