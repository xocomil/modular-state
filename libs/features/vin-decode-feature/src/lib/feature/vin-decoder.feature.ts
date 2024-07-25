import { signalStoreFeature, type, withMethods } from '@ngrx/signals';

export function withVinDecoder() {
  return signalStoreFeature(
    { state: type<{ vin: string }>() },
    withMethods((state) => ({})),
  );
}
