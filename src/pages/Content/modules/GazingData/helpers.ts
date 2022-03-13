import { mapValues } from 'lodash';
import { SideType } from '../../../../icons/DownIcon';

const gazePredictionScores = {
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
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

const getScorePerSide = (side: SideType, prediction: number) => {
  let res = 0;

  switch (side) {
    case 'top':
      res = (prediction / (window.innerHeight * 0.25)) * 10;
      break;
    case 'bottom':
      res =
        ((window.innerHeight - prediction) / (window.innerHeight * 0.25)) * 10;
      break;
    case 'left':
      res = (prediction / (window.innerWidth * 0.25)) * 10;
      break;
    case 'right':
      res =
        ((window.innerWidth - prediction) / (window.innerWidth * 0.25)) * 10;
      break;

    default:
      res = 0;
      break;
  }

  return res * res;
};

export const handleGazeForSide = (
  side: SideType,
  gazeCoordinatePrediction: number,
  threshold: number
) => {
  if (!gazePredictionScores.hasOwnProperty(side)) {
    return;
  }

  // Score between 0 and 10
  const score = getScorePerSide(side, gazeCoordinatePrediction);

  gazePredictionScores[side] += score;

  //   const newRefinedScore = Math.ceil(gazePredictionScores[side] / divider);

  //   if (newRefinedScore !== refinedScore) {
  //     setRefinedScore(newRefinedScore);
  //   }

  if (
    gazePredictionScores[side] > threshold &&
    gazePredictionResetTimouts[side] === undefined
  ) {
    gazePredictionResetTimouts[side] = setTimeout(() => {
      gazePredictionScores[side] = 0;
      gazePredictionResetTimouts[side] = undefined;
    }, 100);
  }
};

const handleGazeAwayForSide = (side: SideType, prediction: number) => {
  const scoreFromSide = getScorePerSide(side, prediction) / 8;

  gazePredictionScores[side] =
    gazePredictionScores[side] <= scoreFromSide
      ? 0
      : gazePredictionScores[side] - scoreFromSide;
};

export const handleGazingVerticalMiddle = (prediction: number) => {
  if (
    prediction <= window.innerHeight * 0.75 &&
    prediction >= window.innerHeight * 0.25
  ) {
    handleGazeAwayForSide('top', prediction);
    handleGazeAwayForSide('bottom', prediction);
  }
};

export const getRefinedValues = (divider: number) => {
  return mapValues(gazePredictionScores, (value) =>
    Math.floor(value / divider)
  );
};
