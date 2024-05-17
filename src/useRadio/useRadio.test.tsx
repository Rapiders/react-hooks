import useRadio from './useRadio';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

type RadioType = '1' | '2' | '3' | '4';

const RadioTestComponent = () => {
  const { value, Radio, RadioGroup } = useRadio<RadioType>('1');
  return (
    <div>
      <RadioGroup>
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
        <Radio value="4">4</Radio>
      </RadioGroup>
      <div role="result">{value}</div>
    </div>
  );
};

const RadioNonDefaultTestComponent = () => {
  const { value, Radio, RadioGroup } = useRadio<RadioType>();
  return (
    <div>
      <RadioGroup>
        <Radio value="1">1</Radio>
        <Radio value="2">2</Radio>
        <Radio value="3">3</Radio>
        <Radio value="4">4</Radio>
      </RadioGroup>
      <div role="result">{value}</div>
    </div>
  );
};
describe('useRadio 기능테스트', () => {
  it('Radio가 선택되면 값을 변경할 수 있다.', async () => {
    render(<RadioTestComponent />);
    fireEvent.click(await screen.findByText('3'));
    const [result] = await screen.findAllByRole('result');
    expect(result.textContent).toBe('3');

    fireEvent.click(await screen.findByText('1'));
    expect(result.textContent).toBe('1');

    fireEvent.click(await screen.findByText('2'));
    expect(result.textContent).toBe('2');
  });

  it('Default 값이 없는 경우, check되지 않는 상태로 렌더링된다.', async () => {
    const { container } = render(<RadioNonDefaultTestComponent />);
    const result = await screen.findByRole('result');
    expect(result.textContent).toBe('');

    const labels = container.querySelectorAll('label');
    labels.forEach((label) => {
      const input = label.querySelector('input');
      expect(input!.checked).toBeFalsy();
    });
  });
});
