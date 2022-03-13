import { ConfigurationFieldType } from './components/ConfigurationItem/ConfigurationItem';

export type ConfigurationItemType = {
  value: ConfigurationFieldType;
  title: string;
  min?: number;
  max?: number;
  suffix?: string;
  scale?: number;
  step?: number;
};

type ConfigurationType = {
  [configurationName: string]: ConfigurationItemType;
};

const configuration: ConfigurationType = {
  intensityThresholds: {
    value: {
      top: 1000,
      bottom: 1000,
      left: 1000,
      right: 1000,
    },
    title: 'Intensity Thresholds',
    min: 500,
    max: 2000,
    step: 10,
  },
  positiveScoreThresholdLines: {
    value: {
      top: 0.25,
      bottom: 0.25,
      left: 0.25,
      right: 0.25,
    },
    title: 'Positive Score Threshold Lines',
    min: 0,
    max: 0.5,
    suffix: '%',
    scale: 100,
    step: 0.05,
  },
  punishmentDivider: {
    value: {
      top: 1,
      bottom: 1,
      left: 1,
      right: 1,
    },
    title: 'Punishment Divider',
    min: 1,
    max: 5,
    step: 0.5,
    // Todo: validate above
  },
  cooldownTimeMs: {
    value: 5000,
    title: 'Cooldown Time (ms)',
    min: 1000,
    max: 10000,
    suffix: 'ms',
    step: 500,
  },
  gazeCoordinateBulkingLimit: {
    value: 10,
    title: 'Gaze Coordinate Bulking Limit',
    min: 2,
    max: 50,
    suffix: ' measurement/calculation',
    step: 1,
  },
  sidegazeDistinctionCoefficient: {
    value: {
      top: 0.1,
      bottom: 0.1,
      left: 0.1,
      right: 0.1,
    },
    title: 'Sidegaze Distinction Coefficient',
    min: 0,
    max: 1,
    suffix: '%',
    scale: 100,
    step: 0.05,
  },
};

export default configuration;
