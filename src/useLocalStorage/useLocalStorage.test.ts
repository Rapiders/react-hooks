import { renderHook, act, waitFor } from '@testing-library/react';
import useLocalStorage from './useLocalStorage';
import * as utils from '../utils/isServer';

// 로컬 스토리지 목업
const mockGetItem = jest.fn();
const mockSetItem = jest.fn();
const mockRemoveItem = jest.fn();

describe('useLocalStorage', () => {
  beforeAll(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: mockRemoveItem,
        clear: jest.fn(),
        length: 0,
        key: jest.fn(),
      },
      writable: true,
    });
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('저장된 값이 없을 때 initialValue를 사용', () => {
    mockGetItem.mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('저장된 값을 지울 수 있음', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'value'));
    act(() => result.current[2]());
    expect(mockRemoveItem).toHaveBeenCalledWith('test');
  });

  it('저장된 값이 있다면 저장된 값을 사용', () => {
    mockGetItem.mockReturnValue(JSON.stringify('storedValue'));

    const { result } = renderHook(() => useLocalStorage('test', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('초기값이 null일 때 value가 null', () => {
    mockGetItem.mockReturnValue(null);
    const { result } = renderHook(() => useLocalStorage('test', null));
    expect(result.current[0]).toBeNull();
  });

  it('값을 저장할 수 있음', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'initialValue'));
    expect(result.current[0]).toBe('initialValue');

    act(() => result.current[1]('newValue'));
    waitFor(() => expect(result.current[0]).toBe('newValue'));
  });

  it('deserializer를 사용가능', () => {
    mockGetItem.mockReturnValue('storedValue');
    const { result } = renderHook(() =>
      useLocalStorage('test', 'initialValue', { serializer: (value: string) => value, deserializer: (storedValue: string) => storedValue }),
    );
    expect(result.current[0]).toBe('storedValue');
  });

  it('serializer를 사용가능', () => {
    const { result } = renderHook(() =>
      useLocalStorage('test', 'initialValue', { serializer: (value: string) => value, deserializer: (storedValue: string) => storedValue }),
    );

    act(() => result.current[1]('newValue'));
    waitFor(() => expect(result.current[0]).toBe('newValue'));
  });

  it('같은 key를 갖는 두 훅이 서로의 값을 변경할 수 있음', () => {
    const { result: firstHook } = renderHook(() => useLocalStorage('test', 'initialValue'));
    const { result: secondHook } = renderHook(() => useLocalStorage('test', 'initialValue'));

    act(() => firstHook.current[1]('newValue'));
    waitFor(() => expect(secondHook.current[0]).toBe('newValue'));
  });

  it('다른 key를 갖는 두 훅은 서로 영향을 주지 않음', () => {
    const { result: firstHook } = renderHook(() => useLocalStorage('test', 'initialValue'));
    const { result: secondHook } = renderHook(() => useLocalStorage('test2', 'initialValue2'));

    act(() => firstHook.current[1]('newValue'));
    waitFor(() => {
      expect(firstHook.current[0]).toBe('newValue');
      expect(secondHook.current[0]).toBe('initialValue2');
    });
  });

  it('SSR 환경인 경우 초기 값을 반환', () => {
    jest.spyOn(utils, 'isServer').mockImplementation(() => true);

    const { result: ssrResult } = renderHook(() => useLocalStorage('test', 'initialValue'));
    expect(mockGetItem).not.toHaveBeenCalled(); // 로컬 스토리지에 접근하지 않음
    expect(ssrResult.current[0]).toBe('initialValue'); // 저장된 값이 있어도 초기 값을 반환
  });
});
