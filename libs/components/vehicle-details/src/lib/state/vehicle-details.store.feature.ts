import { inject, InjectionToken, Signal } from '@angular/core';
import {
  RxMethod,
  SignalStoreProps,
} from '@modular-state/signal.store.helpers.types';
import {
  patchState,
  signalStoreFeature,
  type,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { VEHICLE_DETAILS_STATE, VehicleDetails } from './vehicle-details.model';

export function withVehicleDetails() {
  return signalStoreFeature(
    { state: type<{ vin: string }>() },
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

export type VehicleDetailsStore = SignalStoreProps<VehicleDetails> & {
  vin: Signal<string>;
  update: RxMethod<Partial<VehicleDetails> | null>;
};

export const VehicleDetailsToken = new InjectionToken<VehicleDetailsStore>(
  'VehicleDetailsToken',
);
