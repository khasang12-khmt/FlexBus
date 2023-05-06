export interface ResponseStatus<T> {
  data?: T;
  message: string;
  code: number;
}
