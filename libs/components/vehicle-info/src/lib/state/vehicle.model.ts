import { InjectionToken } from '@angular/core';

export type Vehicle = {
  vin: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  stockNumber: string;
};

const defaultState = (): Vehicle => ({
  year: 2022,
  make: 'Chevrolet',
  model: 'Silverado',
  trim: 'LT',
  vin: '1GCUYDED7NZ123456',
  stockNumber: 'A001',
});

export const VEHICLE_INFO_STATE = new InjectionToken<Vehicle>(
  'VehicleInfoState',
  {
    factory: defaultState,
  },
);
