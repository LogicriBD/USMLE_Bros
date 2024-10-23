export interface Action<T> {
  execute(): Promise<T>;
}
