import { mapValues } from 'lodash';
import configuration from '../../Options/configuration';
import {
  OptionsConfigurationStorage,
  StorageItemNamspaces,
} from '../../protocol';

let configurationValues = mapValues(configuration, ({ value }) => value);

chrome.storage.onChanged.addListener((changes) => {
  const { newValue } = changes[StorageItemNamspaces.OPTIONS_CONFIGURATION];
  if (JSON.stringify(newValue) !== JSON.stringify(configurationValues)) {
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

export default configurationValues;
