import { computed } from '@angular/core';
import { defaultIfNone } from '@modular-state/naive-option';
import {
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { emptyVinDecodeState } from '../state/vin-decode.model';

export function withVinDecoder() {
  return signalStoreFeature(
    { state: type<{ vin: string }>() },
    withState(() => emptyVinDecodeState()),
    withComputed((store) => ({
      errorMessage: computed(() => {
        const error = store._errorMessage();

        return defaultIfNone(error, '');
      }),
    })),
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
