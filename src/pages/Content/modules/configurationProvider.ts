import { mapValues } from 'lodash';
import configuration from '../../Options/configuration';
import {
  OptionsConfigurationStorage,
  StorageItemNamspaces,
} from '../../protocol';
import { SideScoreType } from '../Content.component';

export type ConfigurationModel = {
  intensityThresholds: SideScoreType;
  positiveScoreThresholdLines: SideScoreType;
  punishmentDivider: SideScoreType;
  cooldownTimeMs: number;
  gazeCoordinateBulkingLimit: number;
  sidegazeDistinctionCoefficient: SideScoreType;
  scrollAmount: SideScoreType;
  smoothenScroll: boolean;
  showVideo: boolean;
  showGazeIndicator: boolean;
  saveTrainedModelBetweenPages: boolean;
};

let configurationValues = mapValues(configuration, ({ value }) => value);

chrome.storage.onChanged.addListener((changes) => {
  const currentChange = changes[StorageItemNamspaces.OPTIONS_CONFIGURATION];

  const newValue = currentChange ? currentChange['newValue'] : undefined;

  if (
    !!newValue &&
    JSON.stringify(newValue) !== JSON.stringify(configurationValues)
  ) {
    configurationValues = newValue as OptionsConfigurationStorage;
  }
});

chrome.storage.sync.get(
  [StorageItemNamspaces.OPTIONS_CONFIGURATION],
  (items) => {
    const newConfig = items[
      StorageItemNamspaces.OPTIONS_CONFIGURATION
    ] as OptionsConfigurationStorage;

    configurationValues = newConfig;
  }
);

export const getConfig = () => configurationValues as ConfigurationModel;
