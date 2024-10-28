export interface Action<T> {
  execute(): Promise<T>;
}

export type FormResponse = {
  success: boolean;
  message?: string;
};
