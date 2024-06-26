import { Signal } from '@angular/core';
import { Observable, Unsubscribable } from 'rxjs';

export type RxMethod<T> = ((
  input: Observable<T> | Signal<T> | T,
) => Unsubscribable) &
  Unsubscribable;
