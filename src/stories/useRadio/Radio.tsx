import React from 'react';
import useRadio from '../../useRadio/useRadio';

type RadioType = '🍕' | '🍔' | '🍟' | '🌭';

export default function Radio() {
  const { value, Radio, RadioGroup } = useRadio<RadioType>('🍕');
  return (
    <div>
      <RadioGroup
        style={{
          border: 'none',
          display: 'flex',
          flexDirection: 'column',
          fontSize: 35,
        }}
      >
        <Radio value="🍕">🍕</Radio>
        <Radio value="🍔">🍔</Radio>
        <Radio value="🍟">🍟</Radio>
        <Radio value="🌭">🌭</Radio>
      </RadioGroup>
      <div
        style={{
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        오늘 점심은 {value}
      </div>
    </div>
  );
}
