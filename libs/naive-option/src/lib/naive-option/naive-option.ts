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
  bind<U>(_fn: naiveBindFn<never, U>): NaiveOption<U>;
};

export type NaiveOption<T> = NaiveSome<T> | NaiveNone;

export function naiveSome<T>(value: T): NaiveSome<T> {
  return { type: 'Some', value, bind: naveSomeBind };
}

export function naiveNone(): NaiveNone {
  return {
    type: 'None',
    bind: function (this: NaiveNone) {
      return this;
    },
  };
}

export function naiveIsSome<T>(option: NaiveOption<T>): option is NaiveSome<T> {
  return option.type === 'Some';
}

export function naiveMatch<T>(
  option: NaiveOption<T>,
  onSome: (value: T) => void,
  onNone: () => void,
): void {
  if (naiveIsSome(option)) {
    onSome(option.value);
  } else {
    onNone();
  }
}

export function defaultIfNone<T>(option: NaiveOption<T>, defaultValue: T): T {
  return naiveIsSome(option) ? option.value : defaultValue;
}
