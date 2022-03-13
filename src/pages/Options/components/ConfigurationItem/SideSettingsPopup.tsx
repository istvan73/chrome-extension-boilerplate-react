import { isNil, map } from 'lodash';
import React, { useState } from 'react';
import { SideType } from '../../../../icons/DownIcon';
import { SideScoreType } from '../../../Content/Content';
import { ConfigurationItemType } from '../../configuration';
import { SliderWithTooltip } from './ConfigurationItem';

type SideSettingsPopupProps = Omit<ConfigurationItemType, 'value'> & {
  sideValues: SideScoreType;
  open: boolean;
  onClose: () => void;
  onChange: (sideValues: SideScoreType) => void;
};

const SideSettingsPopup: React.FC<SideSettingsPopupProps> = ({
  sideValues,
  open,
  onClose,
  onChange,
  min,
  max,
  title,
  suffix,
  scale,
  step,
}) => {
  const [localSideValues, setLocalSideValues] = useState(sideValues);

  return open ? (
    <div
      className="side-settings-popup-container"
      id="side-settings-backdrop"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.id === 'side-settings-backdrop') onClose();
      }}
    >
      <div className="side-settings-popup-component">
        <div className="side-settings-popup-title">
          <h2>{title}</h2>
        </div>
        {map(sideValues, (_, sideName) => (
          <div className="side-setting-item" key={sideName}>
            <div className="side-setting-title">{sideName}</div>
            <div className="side-setting-slider">
              <SliderWithTooltip
                key={sideName}
                onChange={(value) =>
                  setLocalSideValues((prev) => ({
                    ...prev,
                    [sideName as SideType]: value,
                  }))
                }
                tipFormatter={(value) => {
                  return `${(scale ? scale * value : value).toFixed(2)}${
                    suffix ?? ''
                  }`;
                }}
                value={localSideValues[sideName as SideType]}
                trackStyle={{ backgroundColor: 'rgb(255, 150, 102)' }}
                handleStyle={{ borderColor: 'rgb(255, 150, 102)' }}
                min={min}
                max={max}
                step={step}
              />
            </div>
          </div>
        ))}
        <div className="side-setting-item">
          <button
            className="save-button sidebar-button"
            onClick={() => {
              onChange(localSideValues);
              onClose();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default SideSettingsPopup;
