import { computed, Provider } from '@angular/core';
import {
  VehicleDetailsToken,
  withVehicleDetails,
} from '@modular-state/vehicle.details.state';
import {
  VehicleInfoToken,
  withVehicleInfo,
} from '@modular-state/vehicle.info.state';
import { signalStore, signalStoreFeature, withComputed } from '@ngrx/signals';
import { injectLazy } from 'ngxtension/inject-lazy';

function withFullVehicle() {
  return signalStoreFeature(
    withVehicleInfo(),
    withVehicleDetails(),
    withComputed((store) => ({
      vehicleDescription: computed(
        () => `${store.year()} ${store.make()} ${store.model()}`,
      ),
    })),
  );
}

export const VehicleStore = signalStore(withFullVehicle());

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

export function provideAppStateLazy(): Provider[] {
  const vehicleStoreLoader = () =>
    import('./store').then((m) => m.VehicleStore);

  return [
    {
      provide: VehicleStore,
      useFactory: () => injectLazy(vehicleStoreLoader),
    },
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
