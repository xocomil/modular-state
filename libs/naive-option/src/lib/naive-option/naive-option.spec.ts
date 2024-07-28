import { naiveSome } from './naive-option';

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
    it('should create a NaiveNone without an error', () => {

    });
  });
});
