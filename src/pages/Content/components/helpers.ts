import { SideType } from '../../../icons/DownIcon';

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
