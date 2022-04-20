import { map } from 'lodash';
import { Circle } from 'rc-progress';
import React, { useEffect, useState } from 'react';
import { getScrollAmountPerSide, getStylePerSide } from './helpers';
import DownIcon, { SideType } from '../../../icons/DownIcon';

const colorZeroPct = [170, 205, 180];
// const colorHundredPct = [170, 205, 180];
const colorDiffs = [-125, 22, -83];

type ScrollDownControlType = {
  percent: number;
  side: SideType;
};

const GeneralScrollControl: React.FC<ScrollDownControlType> = ({
  percent,
  side = 'right',
}) => {
  const [hasScrollOccurred, setHasScrollOccurred] = useState(false);

  const nextColors = map(colorDiffs, (diff, i) =>
    Math.floor(colorZeroPct[i] + (percent * diff) / 100)
  );

  const isCompleted = percent >= 100;

  useEffect(() => {
    if (percent >= 100 && !hasScrollOccurred) {
      const scrollAmount = getScrollAmountPerSide(side);

      window.scrollBy(scrollAmount[0], scrollAmount[1]);
      setHasScrollOccurred(true);
    }

    hasScrollOccurred && percent < 100 && setHasScrollOccurred(false);
  }, [percent, hasScrollOccurred]);

  return (
    <div
      style={{
        ...getStylePerSide(side, percent),
        height: '50px',
        width: '50px',
        borderRadius: '100%',
        boxShadow: `rgb(1 1 1) 0px 0px ${5 + Math.round(percent / 10)}px 0px`,
        backgroundColor: isCompleted
          ? 'rgb(240, 240, 240)'
          : 'rgb(229, 229, 229)',
        position: 'fixed',
        opacity: 0.4 + 0.6 * (percent / 100),
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100000,
      }}
    >
      <div style={{ width: 50, display: 'flex', alignItems: 'center' }}>
        <Circle
          strokeWidth={6}
          percent={percent}
          trailColor="rgb(235, 235, 235)"
          strokeColor={`rgba(${nextColors[0]},${nextColors[1]},${nextColors[2]},0.8)`}
          trailWidth={6}
        />
      </div>
      <div style={{ position: 'absolute', width: 44, height: 44 }}>
        <DownIcon
          color="rgb(170, 170, 170)"
          width={44}
          height={44}
          side={side}
        />
      </div>
    </div>
  );
};

export default GeneralScrollControl;
