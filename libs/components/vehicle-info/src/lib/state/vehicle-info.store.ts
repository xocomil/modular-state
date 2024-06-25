import { signalStore } from '@ngrx/signals';
import { withVehicleInfo } from './vehicle-info.store.feature';

export const VehicleInfoStore = signalStore(withVehicleInfo());
