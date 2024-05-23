import { renderHook, act } from '@testing-library/react';
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
    mockGetItem.mockReturnValueOnce(null);
    const { result } = renderHook(() => useLocalStorage('test', 'initial'));
    expect(result.current[0]).toBe('initial');
  });

  it('만료시간 설정을 할 수 있음', () => {
    const { result } = renderHook(() => useLocalStorage('test', '', { expire: 1000 }));
    act(() => result.current[1]('newValue'));

    expect(mockSetItem).toHaveBeenCalled();
    const [key, value] = mockSetItem.mock.calls[0];
    expect(key).toBe('test');

    const storedValue = JSON.parse(value);
    expect(storedValue.value).toBe('newValue');
    expect(typeof storedValue.expire).toBe('number');
  });

  it('저장된 값을 지울 수 있음', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'value'));
    act(() => result.current[2]());
    expect(mockRemoveItem).toHaveBeenCalledWith('test');
  });

  it('저장된 값이 있다면 저장된 값을 사용', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify({ value: 'storedValue', expire: null }));

    const { result } = renderHook(() => useLocalStorage('test', 'initialValue'));
    expect(result.current[0]).toBe('storedValue');
  });

  it('만료시간이 지난 경우 저장된 값을 지우고 initialValue를 사용', () => {
    mockGetItem.mockReturnValueOnce(JSON.stringify({ value: 'expiredValue', expire: 1000 }));

    const { result } = renderHook(() => useLocalStorage('test', 'initialValue'));
    expect(mockRemoveItem).toHaveBeenCalledWith('test');
    expect(result.current[0]).toBe('initialValue');
  });

  it('초기값이 null일 때 value가 null', () => {
    mockGetItem.mockReturnValueOnce(null);
    const { result } = renderHook(() => useLocalStorage('test', null));
    expect(result.current[0]).toBeNull();
  });

  it('만료시간이 설정되지 않은 경우', () => {
    const { result } = renderHook(() => useLocalStorage('test', 'value'));
    act(() => result.current[1]('newValue'));

    expect(mockSetItem).toHaveBeenCalled();
    const [key, value] = mockSetItem.mock.calls[0];
    expect(key).toBe('test');

    const storedValue = JSON.parse(value);
    expect(storedValue.value).toBe('newValue');
    expect(storedValue.expire).toBeNull();
  });

  it('초기값이 null이고 만료시간이 지난 경우 value가 null', () => {
    const expiredTime = Date.now() - 1000; // 1초 전 만료
    mockGetItem.mockReturnValueOnce(JSON.stringify({ value: 'expiredValue', expire: expiredTime }));

    const { result } = renderHook(() => useLocalStorage('test', null));
    expect(result.current[0]).toBeNull();
    expect(mockRemoveItem).toHaveBeenCalledWith('test');
  });

  it('SSR 환경인 경우 초기 값을 반환', () => {
    jest.spyOn(utils, 'isServer').mockImplementation(() => true);

    const { result: ssrResult } = renderHook(() => useLocalStorage('test', 'initialValue'));
    expect(mockGetItem).not.toHaveBeenCalled(); // 로컬 스토리지에 접근하지 않음
    expect(ssrResult.current[0]).toBe('initialValue'); // 저장된 값이 있어도 초기 값을 반환
  });
});
