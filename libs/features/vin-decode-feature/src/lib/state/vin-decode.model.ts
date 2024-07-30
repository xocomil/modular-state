import { naiveNone, NaiveOption } from '@modular-state/naive-option';

export type VinDecodeState = {
  errorMessage: NaiveOption<string>; // We want to make this Optional<string>
};

export const emptyVinDecodeState = (): VinDecodeState => ({
  errorMessage: naiveNone(),
});
