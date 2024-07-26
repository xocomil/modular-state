export type VinDecodeState = {
  errorMessage: string; // We want to make this Optional<string>
};

export const emptyVinDecodeState = (): VinDecodeState => ({
  errorMessage: '',
});
