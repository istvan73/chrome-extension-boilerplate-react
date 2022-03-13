import { map, mapValues } from 'lodash';
import React, { useState } from 'react';
import { StorageItemNamspaces } from '../../protocol';
import configuration from '../configuration';
import ConfigurationItem, {
  ConfigurationFieldType,
} from './ConfigurationItem/ConfigurationItem';
import './style.scss';

const ConfigurationPage = () => {
  const [configurationValues, setConfigurationValues] = useState(
    mapValues(configuration, ({ value }) => value)
  );

  const handleConfigChange = (id: string, fieldValue: ConfigurationFieldType) =>
    setConfigurationValues((prev) => ({ ...prev, [id]: fieldValue }));

  const handleSaveConfig = () => {
    console.log(configurationValues);

    chrome.storage.sync.set({
      [StorageItemNamspaces.OPTIONS_CONFIGURATION]: configurationValues,
    });
  };

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
          className="save-button sidebar-button"
          onClick={handleSaveConfig}
        >
          I dare to save dis config!
        </button>
      </div>
    </div>
  );
};

export default ConfigurationPage;
