import { SideType } from '../../../icons/DownIcon';
import { getConfig } from '../modules/configurationProvider';

export const getStylePerSide = (side: SideType, percent: number) => {
  switch (side) {
    case 'bottom':
      return {
        bottom: `${Math.round(percent / 10) * 10 - 50}px`,
        left: 'calc(50vw - 25px)',
        transition: 'bottom 1s linear',
      };
    case 'top':
      return {
        top: `${Math.round(percent / 10) * 10 - 50}px`,
        left: 'calc(50vw - 25px)',
        transition: 'top 1s linear',
      };
    case 'left':
      return {
        top: 'calc(50vh - 25px)',
        left: `${Math.round(percent / 10) * 10 - 50}px`,
        transition: 'left 1s linear',
      };
    case 'right':
      return {
        top: 'calc(50vh - 25px)',
        right: `${Math.round(percent / 10) * 10 - 50}px`,
        transition: 'right 1s linear',
      };
    default:
      return {};
  }
};

export const getScrollAmountPerSide = (side: SideType): number[] => {
  console.log(getConfig());
  const scrollCoefficient = getConfig().scrollAmount[side];

  switch (side) {
    case 'bottom':
      return [0, window.innerHeight * scrollCoefficient];
    case 'top':
      return [0, -window.innerHeight * scrollCoefficient];
    case 'left':
      return [window.innerWidth * scrollCoefficient, 0];
    case 'right':
      return [-window.innerWidth * scrollCoefficient, 0];
    default:
      return [];
  }
};
