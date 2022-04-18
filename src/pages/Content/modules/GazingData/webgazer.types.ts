const { webgazer } = require('./webgazer2');

export type WebgazerType = {} & WebgazerPublicFunctions;

type WebgazerPublicFunctions = {
  begin: (onFail: onFailCallbackType) => WebgazerType;
  isReady: () => boolean;
  pause: () => WebgazerType;
  resume: () => WebgazerType;
  end: () => WebgazerType;
  stopVideo: () => WebgazerType;
  detectCompatibility: () => boolean;
  showVideoPreview: (val: boolean) => WebgazerType;
  showVideo: (val: boolean) => WebgazerType;
  showFaceOverlay: (val: boolean) => WebgazerType;
  showFaceFeedbackBox: (val: boolean) => WebgazerType;
  showPredictionPoints: (val: boolean) => WebgazerType;
  saveDataAcrossSessions: (val: boolean) => WebgazerType;
  applyKalmanFilter: (val: boolean) => WebgazerType;
  setCameraConstraints: (constraints: CameraConstraintsType) => WebgazerType;
  setInternalVideoBufferSizes: (width: number, height: number) => void;
  setStaticVideo: (videoLoc: string) => WebgazerType;
  setVideoViewerSize: (width: number, height: number) => void;
  addMouseEventListeners: () => WebgazerType;
  removeMouseEventListeners: () => WebgazerType;
  recordScreenPosition: (
    x: number,
    y: number,
    eventType: RecordEventType
  ) => WebgazerType;
  storePoints: (x: number, y: number, k: number) => void;
  setTracker: (name: string) => WebgazerType;
  setRegression: (name: string) => WebgazerType;
  addTrackerModule: (name: string, constructor: () => void) => WebgazerType;
  addRegressionModule: (name: string, constructor: () => void) => WebgazerType;
  addRegression: (name: string) => WebgazerType;
  setGazeListener: (listener: gazeListenerCallbackType) => WebgazerType;
  clearGazeListener: () => WebgazerType;
  setVideoElementCanvas: (canvas: any) => any;
  clearData: () => void;
  getTracker: () => any;
  getRegression: () => any[];
  getCurrentPrediction: (regIndex: number) => any;
  getEventTypes: () => string[];
  getVideoElementCanvas: () => any;
  getVideoPreviewToCameraResolutionRatio: () => number[];
  getStoredPoints: () => any[];
};

type onFailCallbackType = () => void;

type CameraConstraintsType = {
  width: CameraDimensionConstraint;
  height: CameraDimensionConstraint;
  facingMode: 'user' | 'environment';
};

type CameraDimensionConstraint = { min: number; ideal: number; max: number };

type RecordEventType = 'click' | 'move';

type gazeListenerCallbackType = (
  data: null | undefined | { x: number; y: number },
  time: number
) => void;

export const Webgazer = webgazer as WebgazerType;
