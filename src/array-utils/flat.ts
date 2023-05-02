export const notArrayError = new Error('Not an array');

export const flat = <T>(input: (T | unknown)[]): unknown[] => {
  if (!Array.isArray(input)) {
    throw notArrayError;
  }

  let cache: unknown[] = [];

  for (let index = 0; index < input.length; index++) {
    const value = Array.isArray(input[index]) ? flat(input[index] as []) : [input[index]];
    cache = [...cache, ...value];
  }

  return cache;
};
