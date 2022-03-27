import { map } from 'lodash';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import React, { useEffect, useMemo, useState } from 'react';
import Select, { MultiValue } from 'react-select';
import {
  PopupConfigurationStorageItem,
  StorageItemNamspaces,
} from '../../protocol';
import { defaultConfiguration } from '../../storage.defaults';
import { extractRootDomain } from '../../Shared/helpers';
import { useDomainWhitelist } from './hooks/useDomainWhitelist';
import InputGroup from './InputGroup';

const SliderWithTooltip = createSliderWithTooltip(Slider);

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export type SideSelectionOption = {
  value: string;
  label: string;
};

const PopupContent: React.FC = () => {
  const options = [
    { value: 'top', label: 'Top' },
    { value: 'bottom', label: 'Bottom' },
    { value: 'left', label: 'Left' },
    { value: 'right', label: 'Right' },
  ];

  const [scrollSize, setScrollSize] = useState(defaultConfiguration.scrollSize);
  const [sensitivity, setSensitivity] = useState(
    defaultConfiguration.sensitivity
  );
  const [selectedSides, setSelectedSides] = useState<
    MultiValue<SideSelectionOption> | undefined
  >(
    map(defaultConfiguration.selectedSides, (item) => ({
      value: item,
      label: capitalizeFirstLetter(item),
    }))
  );
  const [currentDomain, setCurrentDomain] = useState<string | undefined>(
    undefined
  );

  const { isCurrentDomainWhitelisted, updateCurrentDomainStatus } =
    useDomainWhitelist(currentDomain);

  const [shouldUpdateConfiguration, setShouldUpdateConfiguration] =
    useState(false);

  const updateConfiguration = () => {
    setShouldUpdateConfiguration(true);
  };

  const selectedSideTracker = useMemo(
    () => JSON.stringify(map(selectedSides, (side) => side.value)),
    selectedSides
  );

  useEffect(() => {
    chrome.storage.sync.get(
      [StorageItemNamspaces.POPUP_CONFIGURATION],
      (items) => {
        const configuration = items[
          StorageItemNamspaces.POPUP_CONFIGURATION
        ] as PopupConfigurationStorageItem;

        if (!!configuration) {
          setScrollSize(configuration.scrollSize);
          setSensitivity(configuration.sensitivity);
          setSelectedSides(
            map(configuration.selectedSides, (item) => ({
              value: item,
              label: capitalizeFirstLetter(item),
            }))
          );
        }
      }
    );

    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
      let url = tabs?.[0]?.url;

      if (url) {
        setCurrentDomain(extractRootDomain(url));
      }
    });
  }, []);

  useEffect(() => {
    if (shouldUpdateConfiguration) {
      chrome.storage.sync.set({
        [StorageItemNamspaces.POPUP_CONFIGURATION]: {
          selectedSides: map(selectedSides, (side) => side.value),
          scrollSize,
          sensitivity,
        },
      });
      setShouldUpdateConfiguration(false);
    }
  }, [selectedSideTracker, scrollSize, sensitivity, shouldUpdateConfiguration]);

  const handleActivateCheckboxChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked;

    updateCurrentDomainStatus(checked);
  };

  const handleSideSelection = (
    selectedOption: MultiValue<SideSelectionOption>
  ) => {
    setSelectedSides(selectedOption);
    updateConfiguration();
  };

  return (
    <div className="content">
      <InputGroup
        title={`Use I-Control on this domain (${currentDomain})`}
        singleRow
      >
        <div>
          <input
            type="checkbox"
            onChange={handleActivateCheckboxChanged}
            checked={isCurrentDomainWhitelisted}
          />
        </div>
      </InputGroup>

      <InputGroup title="Percentage of screen to be scrolled">
        <SliderWithTooltip
          onAfterChange={updateConfiguration}
          tipFormatter={(value) => {
            return `${value}%`;
          }}
          value={scrollSize}
          onChange={setScrollSize}
          trackStyle={{ backgroundColor: 'rgb(255, 150, 102)' }}
          handleStyle={{ borderColor: 'rgb(255, 150, 102)' }}
        />
      </InputGroup>
      <InputGroup title="Sensitivity of algorithm">
        <SliderWithTooltip
          onAfterChange={updateConfiguration}
          tipFormatter={(value) => {
            return `${value}%`;
          }}
          value={sensitivity}
          onChange={setSensitivity}
          trackStyle={{ backgroundColor: 'rgb(255, 150, 102)' }}
          handleStyle={{ borderColor: 'rgb(255, 150, 102)' }}
        />
      </InputGroup>
      <InputGroup title="Sides with i-control">
        <div className="input-group-control multi-select-control">
          <Select
            value={selectedSides}
            isMulti
            onChange={handleSideSelection}
            options={options}
            classNamePrefix="side-select"
          />
        </div>
      </InputGroup>
    </div>
  );
};

export default PopupContent;
