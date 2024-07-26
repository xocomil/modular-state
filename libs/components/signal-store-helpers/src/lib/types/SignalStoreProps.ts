import { Signal } from '@angular/core';
import { WritableStateSource } from '@ngrx/signals';

export type SignalStoreProps<T extends object> = {
  [key in keyof T]: Signal<T[key]>;
} & WritableStateSource<T>;
