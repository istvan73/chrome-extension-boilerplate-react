import { isNil, map } from 'lodash';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import React, { useState } from 'react';
import SettingsIcon from '../../../../icons/SettingsIcon';
import { SideScoreType } from '../../../Content/Content.component';
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
  step,
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
              return `${(scale ? scale * value : value).toFixed(
                step?.toString() === step?.toFixed() ? 0 : 2
              )}${suffix ?? ''}`;
            }}
            value={fields}
            trackStyle={{ backgroundColor: 'rgb(255, 150, 102)' }}
            handleStyle={{ borderColor: 'rgb(255, 150, 102)' }}
            min={min}
            max={max}
            step={step}
          />
        );
      case 'boolean':
        return (
          <input
            type="checkbox"
            checked={fields}
            onClick={() => handleChange(!fields)}
          />
        );
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
                step={step}
              />
            )}
            <div className="side-settings-container">
              <div className="side-setting-values">
                {map(fields, (fieldValue, fieldName) => (
                  <span key={fieldName}>
                    {`${fieldName}`}:<i>{` ${fieldValue}; `}</i>
                  </span>
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
