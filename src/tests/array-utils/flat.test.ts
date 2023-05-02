import { flat, definedFilter, notArrayError } from '../../array-utils';

describe('flat', () => {
  const set = [
    {
      input: [1, [2, [3, ['a', ['b'], ['b']]]], [5, [[, 6]]]],
      expected: [1, 2, 3, 'a', 'b', 'b', 5, 6],
      message: 'filter out deeply nested `undefined` preceding value 6',
    },
    {
      input: [1, [2, [3, [4]]], [5, [[, 6]]]],
      expected: [1, 2, 3, 4, 5, 6],
      message: 'filter out `undefined` preceding value 6',
    },
    {
      input: [1, [null], [2, [3, [4]]], [5, [[, 6]]]],
      expected: [1, 2, 3, 4, 5, 6],
      message: 'filter out `null` preceding value 2',
    },
    {
      input: [0, 1, [2, [3, [4]]], , 5],
      expected: [0, 1, 2, 3, 4, 5],
      message: 'filter out `undefined` preceding value 6',
    },
    {
      input: [1, [2, [3]], 4],
      expected: [1, 2, 3, 4],
      message: 'return expected result',
    },
    {
      input: [1, 2, 3, 4, 5],
      expected: [1, 2, 3, 4, 5],
      message: 'return expected result',
    },
    {
      input: [4, [2, [3]], 1],
      expected: [4, 2, 3, 1],
      message: 'return expected result',
    },
    {
      input: [[[[[0]], [1]], [[[2], [3]]], [[4], [5]]]],
      expected: [0, 1, 2, 3, 4, 5],
      message: 'return expected result',
    },
    {
      input: [
        [0, 1],
        [2, 3],
        [4, 5, [6, 7, [8, [9, 10]]]],
      ],
      expected: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      message: 'return expected result',
    },
    {
      input: [{ a: 0, b: 1 }, { a: 2, b: 3 }, [{ a: 4, b: 5 }, 3], [, 4, [6, 7, [8, [9, 10]]]]],
      expected: [{ a: 0, b: 1 }, { a: 2, b: 3 }, { a: 4, b: 5 }, 3, 4, 6, 7, 8, 9, 10],
      message: 'filter out `undefined` preceding value 4',
    },
  ];

  it.each(set)('should flatten an array and $message', ({ input, expected }) =>
    expect(flat(input).filter(definedFilter)).toStrictEqual(expected),
  );

  it('should throw an error due to invalid type ', () => {
    const input = { a: 0, b: 1 } as unknown as [];

    expect(() => flat(input)).toThrow(notArrayError);
  });
});
