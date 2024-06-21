export const FormDataRequest = async <T>(
  request: Request,
  formDataValues: string[],
  fn: () => {}
): Promise<T> => {
  const formData = await request.formData();

  const data: Record<string, any> = {};
  formDataValues.forEach((value) => {
    data[value] = formData.get(value) as string;
  });

  return data as T;
};
