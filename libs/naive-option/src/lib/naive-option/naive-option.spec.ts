import { defaultIfNone, naiveIsSome, naiveMatch, naiveNone, naiveSome } from './naive-option';

describe('NaiveOption', () => {
  describe('naiveSome', () => {
    const types = [
      { value: 42, description: 'number' },
      { value: '42', description: 'string' },
      { value: { value: 42 }, description: 'object' },
      { value: [42], description: 'array' },
      { value: true, description: 'boolean' },
    ];

    types.forEach(({ value, description }) => {
      it(`should create a NaiveSome with a ${description} value`, () => {
        const some = naiveSome(value);

        expect(some).toEqual({
          type: 'Some',
          value,
          bind: expect.any(Function),
        });
      });
    });

    describe('bind', () => {
      it('should return the result of the function passed to bind', () => {
        const some = naiveSome(42);

        const result = some.bind((value: number) =>
          naiveSome(value.toString()),
        );

        expect(result).toEqual({
          type: 'Some',
          value: '42',
          bind: expect.any(Function),
        });
      });

      it('should chain multiple binds', () => {
        const some = naiveSome(42);

        const result = some
          .bind((value: number) => naiveSome(value * 2))
          .bind((value: number) => naiveSome(value.toString()))
          .bind((value: string) => naiveSome([value]));

        expect(result).toEqual({
          type: 'Some',
          value: ['84'],
          bind: expect.any(Function),
        });
      });
    });
  });

  describe('naiveNone', () => {
    it('should create a NaiveNone', () => {
      const none = naiveNone();

      expect(none).toEqual({
        type: 'None',
        bind: expect.any(Function),
      });
    });

    describe('bind', () => {
      it('should return naive none', () => {
        const none = naiveNone();

        const result = none.bind((value: number) =>
          naiveSome(value.toString()),
        );

        expect(result).toEqual(none);
      });

      it('should chain multiple binds', () => {
        const none = naiveNone();

        const result = none
          .bind((value: number) => naiveSome(value * 2))
          .bind((value: number) => naiveSome(value.toString()))
          .bind((value: string) => naiveSome([value]));

        expect(result).toEqual(none);
      });

      it('should handle a naive None mid-chain', () => {
        const some = naiveSome(42);
        const none = naiveNone();

        const result = some
          .bind((value: number) => naiveSome(value * 2))
          .bind(() => none)
          .bind((value: number) => naiveSome(value.toString()))
          .bind((value: string) => naiveSome([value]));

        expect(result).toEqual(none);
      });
    });
  });

  describe('naiveIsSome', () => {
    it('should return true for a NaiveSome', () => {
      const some = naiveSome(42);

      expect(naiveIsSome(some)).toBe(true);
    });

    it('should return false for a NaiveNone', () => {
      const none = naiveNone();

      expect(naiveIsSome(none)).toBe(false);
    });
  });

  describe('naiveMatch', () => {
    it('should call onSome with the value of a NaiveSome', () => {
      const some = naiveSome(42);

      const onSome = jest.fn();
      const onNone = jest.fn();

      naiveMatch(some, onSome, onNone);

      expect(onSome).toHaveBeenCalledWith(42);
      expect(onNone).not.toHaveBeenCalled();
    });

    it('should call onNone with a NaiveNone', () => {
      const none = naiveNone();

      const onSome = jest.fn();
      const onNone = jest.fn();

      naiveMatch(none, onSome, onNone);

      expect(onSome).not.toHaveBeenCalled();
      expect(onNone).toHaveBeenCalled();
    });
  });

  describe('defaultIfNone', () => {
    it('should return the value of a NaiveSome', () => {
      const some = naiveSome(42);

      const result = defaultIfNone(some, 0);

      expect(result).toBe(42);
    });

    it('should return the default value for a NaiveNone', () => {
      const none = naiveNone();

      const result = defaultIfNone(none, 0);

      expect(result).toBe(0);
    });
  });
});
