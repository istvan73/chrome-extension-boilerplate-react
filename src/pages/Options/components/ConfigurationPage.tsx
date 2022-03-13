import { map, mapValues } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  OptionsConfigurationStorage,
  StorageItemNamspaces,
} from '../../protocol';
import configuration from '../configuration';
import ConfigurationItem, {
  ConfigurationFieldType,
} from './ConfigurationItem/ConfigurationItem';
import './style.scss';

const ConfigurationPage = () => {
  const [configurationValues, setConfigurationValues] = useState(
    mapValues(configuration, ({ value }) => value)
  );

  const [canSave, setCanSave] = useState(false);

  const handleConfigChange = (
    id: string,
    fieldValue: ConfigurationFieldType
  ) => {
    setConfigurationValues((prev) => ({ ...prev, [id]: fieldValue }));
    setCanSave(true);
  };

  const handleSaveConfig = () => {
    chrome.storage.sync.set({
      [StorageItemNamspaces.OPTIONS_CONFIGURATION]: configurationValues,
    });

    setCanSave(false);
  };

  const handleResetConfig = () => {
    const defaultConfig = mapValues(configuration, ({ value }) => value);

    chrome.storage.sync.set({
      [StorageItemNamspaces.OPTIONS_CONFIGURATION]: defaultConfig,
    });
    setConfigurationValues(defaultConfig);
    setCanSave(false);
  };

  useEffect(() => {
    chrome.storage.sync.get(
      [StorageItemNamspaces.OPTIONS_CONFIGURATION],
      (items) => {
        const config = items[
          StorageItemNamspaces.OPTIONS_CONFIGURATION
        ] as OptionsConfigurationStorage;

        !!config && setConfigurationValues(config);
      }
    );
  }, []);

  return (
    <div className="configuration-container">
      <h2>Configurations</h2>
      {map(configuration, (configurationItem, key) => (
        <ConfigurationItem
          {...configurationItem}
          key={key}
          fields={configurationValues[key]}
          id={key}
          onChange={handleConfigChange}
        />
      ))}
      <div>
        <button
          className={
            'save-button sidebar-button ' + (canSave ? '' : 'disabled')
          }
          onClick={handleSaveConfig}
          disabled={!canSave}
        >
          I dare to save dis config!
        </button>
      </div>

      <div>
        <button
          className={'reset-button sidebar-button'}
          onClick={handleResetConfig}
        >
          I wanna reset
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPage;
