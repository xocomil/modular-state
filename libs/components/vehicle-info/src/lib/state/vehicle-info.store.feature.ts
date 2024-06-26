import { computed, inject, InjectionToken, Signal } from '@angular/core';
import {
  RxMethod,
  SignalStoreProps,
} from '@modular-state/signal.store.helpers.types';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { Vehicle, VEHICLE_INFO_STATE } from './vehicle.model';

export function withVehicleInfo() {
  return signalStoreFeature(
    withState(() => inject(VEHICLE_INFO_STATE)),
    withComputed((store) => ({
      vinLast6: computed(() => store.vin().slice(-6)),
    })),

    withMethods((store) => ({
      update: rxMethod<Partial<Vehicle> | null>((update$) =>
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

export type VehicleInfoStore = SignalStoreProps<Vehicle> & {
  update: RxMethod<Partial<Vehicle> | null>;
  vinLast6: Signal<string>;
};

export const VehicleInfoToken = new InjectionToken<VehicleInfoStore>(
  'VehicleInfoToken',
);
