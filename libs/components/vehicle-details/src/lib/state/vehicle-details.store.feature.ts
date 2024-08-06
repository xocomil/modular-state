import { inject, InjectionToken, Signal } from '@angular/core';
import { NaiveOption } from '@modular-state/naive-option';
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

export function withVehicleDetails<_>() {
  return signalStoreFeature(
    { state: type<{ vin: string }>() },
    withState(() => inject(VEHICLE_DETAILS_STATE)),
    withMethods((store) => ({
      update: rxMethod<NaiveOption<Partial<VehicleDetails>>>((update$) =>
        update$.pipe(
          tap((updates) => {
            updates.bind((updateValues) => {
              patchState(store, () => updateValues);

              return updates;
            });
          }),
        ),
      ),
    })),
  );
}

export type VehicleDetailsStore = SignalStoreProps<VehicleDetails> & {
  vin: Signal<string>;
  update: RxMethod<NaiveOption<Partial<VehicleDetails>>>;
};

export const VehicleDetailsToken = new InjectionToken<VehicleDetailsStore>(
  'VehicleDetailsToken',
);
