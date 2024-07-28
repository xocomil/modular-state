import { signalStoreFeature, type, withMethods } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';

export function withVinDecoder() {
  return signalStoreFeature(
    { state: type<{ vin: string }>() },
    withMethods((state) => ({
      decodeVin: rxMethod<string>(
        tap((vin) => {
          if (vin.length !== 17) {
            throw new Error('VIN must be 17 characters long');
          }
        }),
      ),
    })),
  );
}
