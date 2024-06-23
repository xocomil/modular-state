import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { VEHICLE_INFO_STATE, Vehicle } from './vehicle.model';

export const VehicleInfoStore = signalStore(
  withState(() => inject(VEHICLE_INFO_STATE)),
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
