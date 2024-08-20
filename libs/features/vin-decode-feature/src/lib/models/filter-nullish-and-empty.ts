export type FilterNullishAndEmpty<T> = T extends object
  ? { [key in keyof T]-?: Exclude<T[key], null> }
  : T;
