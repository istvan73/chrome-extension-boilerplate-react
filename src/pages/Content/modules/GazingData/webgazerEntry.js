import { webgazer } from './webgazer2';
import { calculateSideGazeScores } from './sidegazeCalculator';
import { getConfig } from '../configurationProvider';

let bulkedGazeData = [];
const getBulkedCoordinates = (gazeDataset) => {
  return getStandardDeviation(gazeDataset);
};

function getStandardDeviation(array) {
  const n = array.length;
  const sums = array.reduce((a, b) => [a[0] + b[0], a[1] + b[1]]);
  return [sums[0] / n, sums[1] / n];
}

const eventHostElement = document.body;

export const initializeWebgazer = () => {
  webgazer
    .setGazeListener(function (data, time) {
      if (!data) {
        return;
      }

      const adjustedX =
        data.x < 0
          ? 0
          : data.x > window.innerWidth
          ? window.innerWidth
          : data.x;

      const adjustedY =
        data.y < 0
          ? 0
          : data.y > window.innerHeight
          ? window.innerHeight
          : data.y;

      if (bulkedGazeData.length < getConfig().gazeCoordinateBulkingLimit) {
        bulkedGazeData.push([adjustedX, adjustedY]);
      } else {
        const bulkedCoodrinates = getBulkedCoordinates(bulkedGazeData);
        const sideGazeScores = calculateSideGazeScores(bulkedCoodrinates);
        const sidegazeScoresChangedEvent = new CustomEvent(
          'sidegazeScoresChanged',
          { detail: sideGazeScores }
        );
        eventHostElement.dispatchEvent(sidegazeScoresChangedEvent);
        bulkedGazeData = [[adjustedX, adjustedY]];
      }
    })
    .begin();
};
