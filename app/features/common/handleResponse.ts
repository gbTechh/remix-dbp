import { TypedResponse, json } from "@remix-run/node";
import { TError } from "~/interfaces";

export type IHandleResponse<T, E> = (
  { message, hasError, state, body }: THandleResponse<T, E>,
  status?: number
) => TypedResponse<THandleResponse<T, E>>;

export type THandleResponse<T, E> = {
  message: string | unknown;
  hasError: boolean;
  state?: "idle" | "finished" | undefined;
  body?: {
    error: TError<E> | null;
    data: T | null;
  };
};

export const handleResponse: IHandleResponse<unknown, unknown> = (
  {
    message = "",
    hasError = false,
    state = "idle",
    body = { error: null, data: null },
  }: THandleResponse<unknown, unknown>,
  status = 400
) => {
  const objResponse: THandleResponse<unknown, unknown> = {
    message,
    hasError,
    state,
    body: {
      error: body.error,
      data: body.data,
    },
  };
  return json(objResponse, { status });
};
