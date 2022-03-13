import { isNil, map } from 'lodash';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import React, { useState } from 'react';
import SettingsIcon from '../../../../icons/SettingsIcon';
import { SideScoreType } from '../../../Content/Content';
import { ConfigurationItemType } from '../../configuration';
import SideSettingsPopup from './SideSettingsPopup';
import './style.scss';

export type ConfigurationFieldType = number | boolean | SideScoreType;

type ConfigurationItemProps = Omit<ConfigurationItemType, 'value'> & {
  id: string;
  title: string;
  fields: ConfigurationFieldType;
  onChange: (id: string, fieldValue: ConfigurationFieldType) => void;
};

export const SliderWithTooltip = createSliderWithTooltip(Slider);

const ConfigurationItem: React.FC<ConfigurationItemProps> = ({
  id,
  title,
  fields,
  onChange,
  min,
  max,
  suffix,
  scale,
}) => {
  const [sidesSettingsPopupShown, setSidesSettingsPopupShown] = useState(false);

  const handleChange = (fieldValue: ConfigurationFieldType) =>
    onChange(id, fieldValue);

  const handleToggleSideSettings = () =>
    setSidesSettingsPopupShown((prev) => !prev);

  const renderField = () => {
    switch (typeof fields) {
      case 'number':
        return (
          <SliderWithTooltip
            onChange={handleChange}
            tipFormatter={(value) => {
              return `${(scale ? scale * value : value).toFixed(2)}${
                suffix ?? ''
              }`;
            }}
            value={fields}
            trackStyle={{ backgroundColor: 'rgb(255, 150, 102)' }}
            handleStyle={{ borderColor: 'rgb(255, 150, 102)' }}
            min={min}
            max={max}
            step={isNil(max) || isNil(min) ? undefined : (max - min) / 100}
          />
        );
      case 'boolean':
        return <input type="checkbox" checked={fields} />;
      default:
        return (
          <>
            {sidesSettingsPopupShown && (
              <SideSettingsPopup
                sideValues={fields}
                open={sidesSettingsPopupShown}
                onClose={handleToggleSideSettings}
                min={min}
                max={max}
                // Todo: fixit
                onChange={handleChange}
                title={title}
                suffix={suffix}
                scale={scale}
              />
            )}
            <div className="side-settings-container">
              <div className="side-setting-values">
                {map(fields, (fieldValue, fieldName) => (
                  <>
                    {`${fieldName}`}:<i>{` ${fieldValue}; `}</i>
                  </>
                ))}
              </div>
              <button
                className="settings-button"
                onClick={handleToggleSideSettings}
              >
                <SettingsIcon />
              </button>
            </div>
          </>
        );
    }
  };

  return (
    <div className="configuration-item-container">
      <div className="configuration-title">{title}</div>
      <div className="configuration-field">{renderField()}</div>
    </div>
  );
};

export default ConfigurationItem;
