import { computed } from '@angular/core';
import {
  defaultIfNone,
  naiveNone,
  naiveSome,
} from '@modular-state/naive-option';
import {
  PartialStateUpdater,
  patchState,
  signalStoreFeature,
  type,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tap } from 'rxjs';
import { emptyVinDecodeState, VinDecodeState } from '../state/vin-decode.model';

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
          patchState(state, resetError());

          if (vin.length !== 17) {
            patchState(state, setError('VIN must be 17 characters to decode.'));
          }
        }),
      ),
    })),
  );
}

export function setError(
  errorMessage: string,
): PartialStateUpdater<VinDecodeState> {
  return () => ({
    _errorMessage: naiveSome(errorMessage),
  });
}

export function resetError(): PartialStateUpdater<VinDecodeState> {
  return () => ({ _errorMessage: naiveNone() });
}
