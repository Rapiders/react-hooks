import { fireEvent, render, screen } from '@testing-library/react';
import useFocusAnimation from './useFocusAnimation';
import React from 'react';

interface Entrie {
  target: Element;
  isIntersecting: boolean;
}

const mockIntersectionObserver = class {
  entries: Entrie[];
  constructor(callback) {
    this.entries = [];
    window.addEventListener('scroll', (e) => {
      if (window.scrollY > 50) {
        this.entries.map((entry) => {
          entry.isIntersecting = this.isInViewPort(entry.target);
        });
      }
      callback(this.entries, this);
    });
  }

  isInViewPort(target: Element) {
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

describe('useFocusAnimation 기능 테스트', () => {
  beforeEach(() => {
    global.IntersectionObserver = mockIntersectionObserver as any;
  });

  it('scroll isIntersecting이 true일때 animation className에 onFocusClassName이 붙는다.', async () => {
    const Test = () => {
      const ref = useFocusAnimation<HTMLDivElement>('show', 'hide');
      return <div ref={ref}>Test</div>;
    };
    render(<Test />);
    fireEvent.scroll(window, { target: { scrollY: 100 } });
    const element = await screen.findByText('Test');
    expect(element.className).toBe('show');
  });

  it('scroll isIntersecting이 false일때는 animation className에 onFocusOutClassName 붙는다.', async () => {
    const Test = () => {
      const ref = useFocusAnimation<HTMLDivElement>('show', 'hide');
      return <div ref={ref}>Test</div>;
    };
    render(<Test />);
    fireEvent.scroll(window, { target: { scrollY: 0 } });
    const element = await screen.findByText('Test');
    expect(element.className).toBe('hide');
  });
});
