import { webgazer } from './webgazer2';
import { calculateSideGazeScores } from './sidegazeCalculator';
import { getConfig } from '../configurationProvider';
import { StorageItemNamspaces } from '../../../protocol';
import { extractRootDomain } from '../../../Shared/helpers';

let isWebgazerRunning = false;
let shouldWebgazerBeRunning = false;

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
  const currentDomain = extractRootDomain(window.location.href);

  chrome.storage.local.get([StorageItemNamspaces.ALLOWED_DOMAINS], (items) => {
    const allowedDomains = items[StorageItemNamspaces.ALLOWED_DOMAINS];

    if (allowedDomains && currentDomain) {
      shouldWebgazerBeRunning = allowedDomains[currentDomain];
    }
  });

  chrome.storage.onChanged.addListener((changes) => {
    const nextAllowedDomains =
      changes[StorageItemNamspaces.ALLOWED_DOMAINS].newValue;
    console.log({ nextAllowedDomains, currentDomain });
    if (nextAllowedDomains && currentDomain) {
      shouldWebgazerBeRunning = nextAllowedDomains[currentDomain];
    }
  });

  setInterval(() => {
    if (shouldWebgazerBeRunning && !isWebgazerRunning) {
      isWebgazerRunning = true;
      addWebgazer();
    }

    if (!shouldWebgazerBeRunning && isWebgazerRunning) {
      isWebgazerRunning = false;
      removeWebgazer();
    }
  }, 1000);
};

webgazer.setGazeListener(function (data, time) {
  if (!data) {
    return;
  }

  const adjustedX =
    data.x < 0 ? 0 : data.x > window.innerWidth ? window.innerWidth : data.x;

  const adjustedY =
    data.y < 0 ? 0 : data.y > window.innerHeight ? window.innerHeight : data.y;

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
});

const addWebgazer = () => {
  webgazer.showVideoPreview(true).showPredictionPoints(true);

  webgazer.begin();
};

const removeWebgazer = () => {
  webgazer.showVideoPreview(false).showPredictionPoints(false);
  // webgazer.clearGazeListener();
  webgazer.end();
  // document.getElementById('webgazerVideoContainer').remove();
};
