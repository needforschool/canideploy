// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface APIResponse<TData = any> {
  success: boolean;
  data?: TData;
  message?: string;
  error?: string;
}
