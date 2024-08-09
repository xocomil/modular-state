import { computed, Provider } from '@angular/core';
import {
  VehicleDetailsToken,
  withVehicleDetails,
} from '@modular-state/vehicle.details.state';
import {
  VehicleInfoToken,
  withVehicleInfo,
} from '@modular-state/vehicle.info.state';
import {
  VinDecoderFeature,
  withVinDecoder,
} from '@modular-state/vin.decode.feature';
import { signalStore, withComputed } from '@ngrx/signals';

export const VehicleStore = signalStore(
  withVehicleInfo(),
  withVehicleDetails(),
  withVinDecoder(),
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
    {
      provide: VinDecoderFeature,
      useExisting: VehicleStore,
      deps: [VehicleStore],
    },
  ];
}
