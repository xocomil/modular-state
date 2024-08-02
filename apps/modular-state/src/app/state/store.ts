import { computed, Provider } from '@angular/core';
import {
  VehicleDetailsToken,
  // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
  withVehicleDetails,
} from '@modular-state/vehicle.details.state';
import {
  VehicleInfoToken,
  // eslint-disable-next-line tree-shaking/no-side-effects-in-initialization
  withVehicleInfo,
} from '@modular-state/vehicle.info.state';
import { signalStore, withComputed } from '@ngrx/signals';

export const VehicleStore = signalStore(
  withVehicleInfo(),
  withVehicleDetails(),
  withComputed((store) => ({
    vehicleDescription: computed(
      () => `${store.year()} ${store.make()} ${store.model()}`,
    ),
  })),
);

export function provideAppState(): Provider[] {
  return [
    VehicleStore,
    {
      provide: VehicleDetailsToken,
      useExisting: VehicleStore,
      deps: [VehicleStore],
    },
    {
      provide: VehicleInfoToken,
      useExisting: VehicleStore,
      deps: [VehicleStore],
    },
  ];
}
