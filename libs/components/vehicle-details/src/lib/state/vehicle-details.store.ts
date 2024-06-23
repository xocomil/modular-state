import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { VEHICLE_DETAILS_STATE, VehicleDetails } from './vehicle-details.model';

export const VehicleDetailsStore = signalStore(
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
