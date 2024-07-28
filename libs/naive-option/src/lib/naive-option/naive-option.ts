type naiveBindFn<T, U> = (value: T) => NaiveOption<U>;

export type NaiveSome<T> = {
  readonly type: 'Some';
  readonly value: T;
  bind<U>(fn: naiveBindFn<T, U>): NaiveOption<U>;
};

function naveSomeBind<T, U>(
  this: NaiveSome<T>,
  fn: naiveBindFn<T, U>,
): NaiveOption<U> {
  return fn(this.value);
}

export type NaiveNone = {
  readonly type: 'None';
  readonly error: NaiveOption<string>;
  bind<U>(_fn: naiveBindFn<never, U>): NaiveOption<U>;
};

export type NaiveOption<T> = NaiveSome<T> | NaiveNone;

export function naiveSome<T>(value: T): NaiveSome<T> {
  return { type: 'Some', value, bind: naveSomeBind };
}

export function naiveNone(error: NaiveOption<string> = naiveNone()): NaiveNone {
  return {
    type: 'None',
    error,
    bind: function (this: NaiveNone) {
      return this;
    },
  };
}

export function naiveIsSome<T>(option: NaiveOption<T>): option is NaiveSome<T> {
  return option.type === 'Some';
}
