import { map, mapValues, reduce } from 'lodash';
import { SideType } from '../../../../icons/DownIcon';
import {
  cooldownTimeMs,
  intensivityThresholds,
  positiveScoreThresholdLines,
  punishmentDivider,
} from '../configurationProvider';

const gazePredictionScores: { [side: string]: number } = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
};

const isSideLocked = {
  top: false,
  bottom: false,
  left: false,
  right: false,
};

const gazePredictionResetTimouts: {
  top?: NodeJS.Timeout;
  bottom?: NodeJS.Timeout;
  left?: NodeJS.Timeout;
  right?: NodeJS.Timeout;
} = {
  top: undefined,
  bottom: undefined,
  left: undefined,
  right: undefined,
};

type SideScoreType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

/**
 *
 * @param sideProximity - Tells how close the coordinates are to the interval's 'start'.
 *                        Here, 'start' stands for the side, so if the right side means 1024px,
 *                        and the prediction is 924px, then the sideProximity is 100px (side - prediction).
 * @param wholeInterval - The length of the interval which can be the x or y axis of the screen.
 *                        It is the inner height/width.
 * @param side - String descriptor of the side we calculate proximity score to.
 * @returns
 */
const getAdjustedSideScores = (
  sideProximity: number,
  wholeInterval: number,
  side: SideType
) => {
  let res = 0;
  const activeInterval = wholeInterval * positiveScoreThresholdLines[side];

  if (sideProximity <= activeInterval) {
    res = (activeInterval - sideProximity) / activeInterval;
  } else {
    res =
      sideProximity >= 3 * activeInterval
        ? 1
        : (sideProximity - activeInterval) / (2 * activeInterval);
    res = -res / punishmentDivider[side];
  }

  return res;
};

const getScorePerSide = (side: SideType, prediction: number) => {
  let res = 0;

  switch (side) {
    case 'top':
      res = getAdjustedSideScores(prediction, window.innerHeight, side);
      break;
    case 'bottom':
      res = getAdjustedSideScores(
        window.innerHeight - prediction,
        window.innerHeight,
        side
      );
      break;
    case 'left':
      res = getAdjustedSideScores(prediction, window.innerWidth, side);
      break;
    case 'right':
      res = getAdjustedSideScores(
        window.innerWidth - prediction,
        window.innerWidth,
        side
      );
      break;

    default:
      res = 0;
      break;
  }

  const isPunishment = res < 0;

  res = res * 10;
  res = res * res;

  return isPunishment ? -res : res;
};

const getAdjustedScores = (
  xCoordinate: number,
  yCoordinate: number
): SideScoreType => {
  const adjustedX =
    xCoordinate < 0
      ? 0
      : xCoordinate > window.innerWidth
      ? window.innerWidth
      : xCoordinate;

  const adjustedY =
    yCoordinate < 0
      ? 0
      : yCoordinate > window.innerHeight
      ? window.innerHeight
      : yCoordinate;

  return {
    top: getScorePerSide('top', adjustedY),
    bottom: getScorePerSide('bottom', adjustedY),
    left: getScorePerSide('left', adjustedX),
    right: getScorePerSide('right', adjustedX),
  };

  //   Todo: test if triangle solution works better (when you also substract points when the user gazes to the sides)
};

const getNeighbourKeys = (side: SideType): SideType[] => {
  switch (side) {
    case 'top':
    case 'bottom':
      return ['left', 'right'];

    case 'left':
    case 'right':
      return ['top', 'bottom'];
  }
};

const getSideDistinctionPunishmentScore = (
  adjustedScores: SideScoreType,
  side: SideType
): number => {
  const neighbourKeys = getNeighbourKeys(side);

  return reduce(
    neighbourKeys,
    (acc, currentNeighbourKey) =>
      acc + adjustedScores[currentNeighbourKey] / 10,
    0
  );
};

export const calculateSideGazeScores = (coordinates: number[]) => {
  if (coordinates.length >= 2) {
    const adjustedScores = getAdjustedScores(coordinates[0], coordinates[1]);

    for (const key in gazePredictionScores) {
      if (!isSideLocked[key as SideType]) {
        gazePredictionScores[key] =
          gazePredictionScores[key] +
          adjustedScores[key as SideType] -
          getSideDistinctionPunishmentScore(adjustedScores, key as SideType);

        gazePredictionScores[key] =
          gazePredictionScores[key] < 0 ? 0 : gazePredictionScores[key];
      }

      // *If we are over the threshold for the first time
      if (
        gazePredictionScores[key] > intensivityThresholds[key as SideType] &&
        gazePredictionResetTimouts[key as SideType] === undefined
      ) {
        isSideLocked[key as SideType] = true;
        console.log({ msg: 'locking', side: key });

        // *We are resetting it in n seconds
        gazePredictionResetTimouts[key as SideType] = setTimeout(() => {
          isSideLocked[key as SideType] = false;
          gazePredictionScores[key] = 0;
          gazePredictionResetTimouts[key as SideType] = undefined;
          console.log({ msg: 'resetting', side: key });
        }, cooldownTimeMs);
      }
    }

    console.log({ cooldownTimeMs });

    return mapValues(gazePredictionScores, (gazePrediction) =>
      (gazePrediction / 10).toFixed()
    );
  }
};
