export interface CustomHttpResponse<T> {
  data: T;
  statusCode: number;
  errorMsg: string;
}
