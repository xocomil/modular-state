import { Signal } from '@angular/core';
import { StateSignal } from '@ngrx/signals';

export type SignalStoreProps<T extends object> = {
  [key in keyof T]: Signal<T[key]>;
} & StateSignal<T>;
