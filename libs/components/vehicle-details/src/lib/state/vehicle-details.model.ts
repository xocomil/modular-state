import { InjectionToken } from '@angular/core';

export type VehicleDetails = {
  color: string;
  engine: string;
  fuelType: string;
  tintedWindows: boolean;
  sunroof: boolean;
  heatedSeats: boolean;
  navigation: boolean;
};

export const defaultState = (): VehicleDetails => ({
  color: 'Black',
  engine: 'V8',
  fuelType: 'Gasoline',
  tintedWindows: true,
  sunroof: false,
  heatedSeats: true,
  navigation: true,
});

export const VEHICLE_DETAILS_STATE = new InjectionToken<VehicleDetails>(
  'VehicleDetailsState',
  {
    factory: defaultState,
  },
);
