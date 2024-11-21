import { fireEvent, render } from '@testing-library/react';
import useFocus from './useFocus';
import React from 'react';

interface Entrie {
  target: Element;
  isIntersecting: boolean;
}

const mockIntersectionObserver = class {
  entries: Entrie[];
  constructor(callback) {
    this.entries = [];
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.entries.map((entry) => {
          entry.isIntersecting = this.isInViewPort();
        });
      }
      callback(this.entries, this);
    });
  }

  isInViewPort() {
    return true;
  }

  observe(target: Element) {
    this.entries.push({ isIntersecting: false, target });
  }

  unobserve(target) {
    this.entries = this.entries.filter((ob) => ob.target !== target);
  }

  disconnect() {
    this.entries = [];
  }
};

describe('useFocus 기능 테스트', () => {
  beforeEach(() => {
    // eslint-disable-next-line
    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  it('focus되었을때 onFocusCallback을 실행시킬 수 있다.', async () => {
    const mock = jest.fn();
    const Test = () => {
      const ref = useFocus<HTMLDivElement>(mock);
      return <div ref={ref}>Test</div>;
    };
    render(<Test />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    expect(mock).toHaveBeenCalled();
  });
});
