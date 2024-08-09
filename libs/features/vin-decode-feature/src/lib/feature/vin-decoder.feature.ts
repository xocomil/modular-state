import { computed, InjectionToken } from '@angular/core';
import {
  defaultIfNone,
  naiveNone,
  naiveSome,
} from '@modular-state/naive-option';
import { RxMethod } from '@modular-state/signal.store.helpers.types';
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

export function withVinDecoder<_>() {
  return signalStoreFeature(
    {
      state: type<{ vin: string; year: number; make: string; model: string }>(),
    },
    withState(() => emptyVinDecodeState()),
    withComputed((store) => ({
      errorMessage: computed(() => {
        const error = store._errorMessage();

        return defaultIfNone(error, '');
      }),
    })),
    withMethods((state) => ({
      // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
      decodeVin: rxMethod<void>(
        tap(() => {
          console.log('decodeVin() called', 1234);

          patchState(state, resetError());

          const vin = state.vin();

          if (vin.length !== 17) {
            patchState(state, setError('VIN must be 17 characters to decode.'));
          }

          patchState(state, { model: `You tried to decode ${vin}` });
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

export type VinDecoderFeature = {
  decodeVin: RxMethod<void>;
};

export const VinDecoderFeature = new InjectionToken<VinDecoderFeature>(
  'VinDecoderFeature',
);
