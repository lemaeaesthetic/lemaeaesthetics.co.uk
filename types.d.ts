export interface LocalStorageInterface {
  get: (key: string) => string | null;
  set: (key: string, value: string) => string | null;
  remove: (key: string) => void;
  clear: () => void;
}
