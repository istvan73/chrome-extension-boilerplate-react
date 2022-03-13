import React from 'react';
import { DefaultIconProps } from './types';

const rotationPerSide = {
  bottom: 0,
  left: 90,
  top: 180,
  right: 270,
};

export type SideType = 'bottom' | 'top' | 'left' | 'right';

type DownIconType = DefaultIconProps & {
  side: SideType;
};

const DownIcon = ({
  width = 50,
  height = 50,
  color = '#010002',
  side = 'bottom',
}: DownIconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        transform: `rotate(${rotationPerSide[side]}deg)`,
      }}
    >
      <rect width={48} height={48} fill="rgba(0,0,0,0)" fillOpacity="0.01" />
      <path
        style={{ transform: 'translate(-1px, 2px)' }}
        d="M37 18L25 30L13 18"
        stroke={color}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default DownIcon;
