import { inject, InjectionToken, Signal } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  StateSignal,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Observable, tap, Unsubscribable } from 'rxjs';
import { VEHICLE_DETAILS_STATE, VehicleDetails } from './vehicle-details.model';

export function withVehicleDetails() {
  return signalStoreFeature(
    withState(() => inject(VEHICLE_DETAILS_STATE)),
    withMethods((store) => ({
      update: rxMethod<Partial<VehicleDetails> | null>((update$) =>
        update$.pipe(
          tap((updates) => {
            if (updates == null) {
              return;
            }

            patchState(store, () => updates);
          }),
        ),
      ),
    })),
  );
}

type RxMethod<T> = ((input: Observable<T> | Signal<T> | T) => Unsubscribable) &
  Unsubscribable;

type SignalStore<T extends object> = {
  [key in keyof T]: Signal<T[key]>;
} & StateSignal<T>;

export type VehicleDetailsStore = SignalStore<VehicleDetails> & {
  update: RxMethod<Partial<VehicleDetails> | null>;
};

export const VehicleDetailsToken = new InjectionToken<VehicleDetailsStore>(
  'VehicleDetailsToken',
);
