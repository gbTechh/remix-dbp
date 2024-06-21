export type TError<T> = {
  message: string | unknown;
  hasError: boolean;
  state?: "idle" | "finished";
  body?: T;
};
