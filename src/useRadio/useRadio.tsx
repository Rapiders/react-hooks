import React, { CSSProperties, ReactNode, createContext, useContext, useState } from 'react';

type RadioValue = string | number;
const RadioContext = createContext<[RadioValue | undefined, React.Dispatch<React.SetStateAction<RadioValue | undefined>>]>([
  undefined,
  () => {},
]);

const RadioGroup = <T extends RadioValue>({
  radioState,
  className,
  style,
  children,
}: {
  radioState: [T | undefined, React.Dispatch<React.SetStateAction<T | undefined>>];
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) => {
  return (
    <fieldset className={className} style={style}>
      <RadioContext.Provider value={radioState}>{children}</RadioContext.Provider>
    </fieldset>
  );
};

const Radio = <T extends RadioValue>({
  value,
  className,
  style,
  children,
}: {
  value: T;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) => {
  const [radioValue, setRadioValue] = useContext(RadioContext);

  return (
    <label>
      <input
        type="radio"
        value={value}
        onChange={() => setRadioValue(value)}
        className={className}
        style={style}
        checked={value === radioValue}
      />
      {children}
    </label>
  );
};

export default function useRadio<T extends RadioValue>(defaultValue?: T) {
  const radioState = useState(defaultValue);

  const RadioGroupWrapper = ({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) => {
    return (
      <RadioGroup className={className} style={style} radioState={radioState}>
        {children}
      </RadioGroup>
    );
  };

  return {
    RadioGroup: RadioGroupWrapper,
    Radio: Radio<T>,
    value: radioState[0],
  };
}
