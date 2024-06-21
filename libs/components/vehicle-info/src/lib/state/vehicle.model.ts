import { InjectionToken } from '@angular/core';
import { create } from 'mutative';

export type Vehicle = {
  year: number;
  make: string;
  model: string;
  trim: string;
  vin: string;
  stockNumber: string;
};

function defaultState(): Vehicle {
  return create(
    {
      year: 2022,
      make: 'Chevrolet',
      model: 'Silverado',
      trim: 'LT',
      vin: '1GCUYDED7NZ123456',
      stockNumber: 'A001',
    },
    () => {},
  );
}

export const VEHICLE_INFO_STATE = new InjectionToken<Vehicle>(
  'VehicleInfoState',
  {
    factory: defaultState,
  },
);
