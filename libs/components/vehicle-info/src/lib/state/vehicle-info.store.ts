import { inject } from '@angular/core';
import { signalStore, withState } from '@ngrx/signals';
import { VEHICLE_INFO_STATE } from './vehicle.model';

export const VehicleInfoStore = signalStore(
  withState(() => inject(VEHICLE_INFO_STATE)),
);
