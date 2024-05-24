import { isServer } from './isServer';

describe('isServer', () => {
  let originalWindow: typeof globalThis.window | undefined;

  beforeAll(() => {
    originalWindow = globalThis.window;
  });

  afterEach(() => {
    Object.defineProperty(globalThis, 'window', {
      value: originalWindow,
      configurable: true,
      writable: true,
    });
  });

  it('window 객체가 undefined인 경우 true 반환', () => {
    Object.defineProperty(globalThis, 'window', {
      value: undefined,
      configurable: true,
      writable: true,
    });

    expect(isServer()).toBe(true);
  });

  it('window 객체가 존재하는 경우 false 반환', () => {
    expect(isServer()).toBe(false);
  });
});
