import { calculateSideGazeScores } from './sidegazeCalculator';
import { getConfig } from '../configurationProvider';
import { StorageItemNamspaces } from '../../../protocol';
import { extractRootDomain } from '../../../Shared/helpers';
import { Webgazer } from './webgazer.types';

let isWebgazerRunning = false;
let shouldWebgazerBeRunning = false;
const defaultScrollBehaviour = document.documentElement.style.scrollBehavior;

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
    if (nextAllowedDomains && currentDomain) {
      shouldWebgazerBeRunning = nextAllowedDomains[currentDomain];
    }
  });

  setInterval(() => {
    if (getConfig().smoothenScroll) {
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      document.documentElement.style.scrollBehavior = defaultScrollBehaviour;
    }
    Webgazer.showPredictionPoints(getConfig().showGazeIndicator);
    Webgazer.showVideoPreview(getConfig().showVideo);

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

Webgazer.setGazeListener(function (data) {
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
  Webgazer.showVideoPreview(true).showPredictionPoints(true);

  Webgazer.begin();
};

const removeWebgazer = () => {
  Webgazer.showVideoPreview(false).showPredictionPoints(false);
  // webgazer.clearGazeListener();
  Webgazer.end();
  // document.getElementById('webgazerVideoContainer').remove();
};

// ? Sooo, cool thing about localForage usage in WebGazer.

// ? It uses localForage to save each new click event positon. It does a regresssion based on those click events in real time,
// ? as well as the position of the eye. It saves into the localForage then the global data, the regression.

// ! We must limit the amount of data.
// ! The localForage should be replacable with the Chrome api
