import { faker } from '@faker-js/faker';
import { naiveSome } from '@modular-state/naive-option';
import { emptyVinDecodeState } from '../state/vin-decode.model';
import { resetError, setError } from './vin-decoder.feature';

describe('vin-decoder.feature.ts', () => {
  describe('setError()', () => {
    it('should return a state with the error in a naiveSome()', () => {
      const randomErrorMessage = faker.word.words({
        count: { min: 10, max: 40 },
      });

      expect(setError(randomErrorMessage)(emptyVinDecodeState())).toEqual({
        _errorMessage: naiveSome(randomErrorMessage),
      });
    });
  });

  describe('resetError()', () => {
    it('should return a state with error as naiveNone()', () => {
      expect(resetError()(emptyVinDecodeState())).toEqual({
        _errorMessage: { bind: expect.any(Function), type: 'None' },
      });
    });
  });
});
