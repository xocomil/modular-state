import { computed, inject } from '@angular/core';
import {
  patchState,
  signalStoreFeature,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { VEHICLE_INFO_STATE, Vehicle } from './vehicle.model';

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
