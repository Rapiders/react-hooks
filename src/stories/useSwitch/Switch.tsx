import useSwitch from '../../useSwitch/useSwitch';
import React, { ChangeEventHandler } from 'react';

import './Switch.css';

export default function Switch() {
  const sw = useSwitch(false);

  const handleChangeSwitch: ChangeEventHandler<HTMLInputElement> = () => {
    sw.toggle();
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={sw.isOn} onChange={handleChangeSwitch} />
      <span className="slider round"></span>
      check
    </label>
  );
}
