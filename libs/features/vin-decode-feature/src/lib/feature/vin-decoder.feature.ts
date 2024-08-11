import { computed, inject, InjectionToken, Injector } from '@angular/core';
import {
  defaultIfNone,
  naiveNone,
  naiveSome,
} from '@modular-state/naive-option';
import { RxMethod } from '@modular-state/signal.store.helpers.types';
import { tapResponse } from '@ngrx/operators';
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
import { injectLazy } from 'ngxtension/inject-lazy';
import { filter, of, pipe, switchMap } from 'rxjs';
import { emptyVinDecodeState, VinDecodeState } from '../state/vin-decode.model';

const ImportVinDecoderService = () =>
  import('../services/vin-decoder.service').then((m) => m.VinDecoderService);

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
    withMethods((state) => {
      const injector = inject(Injector);

      return {
        // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
        decodeVin: rxMethod<void>(
          pipe(
            switchMap(() => {
              console.log('decodeVin() called', 1234);

              patchState(state, resetError());

              const vin = state.vin();

              if (vin.length !== 17) {
                patchState(
                  state,
                  setError('VIN must be 17 characters to decode.'),
                );

                of();
              }

              return injectLazy(ImportVinDecoderService, injector).pipe(
                switchMap((service) => {
                  return service.decodeVin(vin);
                }),
              );
            }),
            filter((response) => response !== null),
            tapResponse({
              next: (response) => {
                console.log('response', response);
              },
              error: (error) => {
                console.error('error', error);
              },
            }),
          ),
        ),
      };
    }),
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
