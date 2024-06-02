import useSwitch from '../../useSwitch/useSwitch';
import React, { ChangeEventHandler } from 'react';
import { baseSlider, checkedSlider, round, switchInput, switchLabel } from './Switch.css';

export default function Switch() {
  const sw = useSwitch(false);

  const handleChangeSwitch: ChangeEventHandler<HTMLInputElement> = () => {
    sw.toggle();
  };

  return (
    <label className={switchLabel}>
      <input type="checkbox" checked={sw.isOn} onChange={handleChangeSwitch} className={switchInput} />
      <span className={`${sw.isOn ? checkedSlider : baseSlider} ${round}`}></span>
      check
    </label>
  );
}
