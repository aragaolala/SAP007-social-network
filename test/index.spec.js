import { myFunction } from '../src/lib/index';

describe('myFunction', () => {
  it('deveria ser uma função', () => {
    expect(typeof myFunction).toBe('function');
  });
});
