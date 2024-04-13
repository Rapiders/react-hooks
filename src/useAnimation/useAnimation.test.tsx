import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import useAnimation from './useAnimation';
import React, { useEffect } from 'react';
describe('useAnimation 테스트', () => {
  it('show를 호출 AnimationWrapper의 children이 화면에 보인다.', () => {
    const Test = () => {
      const { show, AnimationWrapper } = useAnimation({
        mountClassName: 'show',
        unmountClassName: 'hide',
      });
      return (
        <>
          <AnimationWrapper>
            <div>테스트</div>
          </AnimationWrapper>
          <button onClick={show}>Click</button>
        </>
      );
    };
    render(<Test />);
    expect(() => screen.getByText('테스트')).toThrow();
    fireEvent.click(screen.getByText('Click'));
    expect(screen.getByText('테스트')).toBeTruthy();
  });
});
