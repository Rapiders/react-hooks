import { fireEvent, render, screen } from '@testing-library/react';
import useAnimation from './useAnimation';
import React from 'react';

const Test = () => {
  const { show, AnimationWrapper, hide } = useAnimation({
    mountClassName: 'show',
    unmountClassName: 'hide',
  });
  return (
    <>
      <AnimationWrapper>
        <div>테스트</div>
      </AnimationWrapper>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
    </>
  );
};

const TestNoHide = () => {
  const { show, AnimationWrapper, hide } = useAnimation({
    mountClassName: 'show',
  });
  return (
    <>
      <AnimationWrapper>
        <div>테스트</div>
      </AnimationWrapper>
      <button onClick={show}>Show</button>
      <button onClick={hide}>Hide</button>
    </>
  );
};

describe('useAnimation 테스트', () => {
  it('버튼을 누르면 AnimationWrapper에 className이 show로 변하고, 화면에 내용이 보인다.', () => {
    const { container } = render(<Test />);
    expect(() => screen.getByText('테스트')).toThrow();
    fireEvent.click(screen.getByText('Show'));
    expect(screen.getByText('테스트')).toBeTruthy();
    expect(container.querySelector('.show')).toBeTruthy();
  });

  it('hide버튼을 누르면 AnimationWrapper에 className이 hide로 변하고, 화면에 내용이 보이지 않는다.', () => {
    const { container } = render(<Test />);
    fireEvent.click(screen.getByText('Show'));
    expect(container.querySelector('.show')).toBeTruthy();
    expect(screen.getByText('테스트')).toBeTruthy();

    fireEvent.click(screen.getByText('Hide'));
    expect(container.querySelector('.hide')).toBeTruthy();

    fireEvent.animationEnd(container.querySelector('div')!);
    expect(() => screen.getByText('테스트')).toThrow();
  });

  it('hide className이 없는 경우, hide버튼 클릭시 AnimationWrapper의 className이 지정되지 않고, 화면에 내용이 보이지 않는다.', () => {
    const { container } = render(<TestNoHide />);
    fireEvent.click(screen.getByText('Show'));
    expect(container.querySelector('.show')).toBeTruthy();
    expect(screen.getByText('테스트')).toBeTruthy();

    fireEvent.click(screen.getByText('Hide'));
    expect(container.querySelector('.hide')).toBeFalsy();

    fireEvent.animationEnd(container.querySelector('div')!);
    expect(() => screen.getByText('테스트')).toThrow();
  });
});
