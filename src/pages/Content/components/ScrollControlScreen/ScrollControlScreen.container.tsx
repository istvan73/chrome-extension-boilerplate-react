import React, { useEffect, useState } from 'react';
import {
  PopupConfigurationStorageItem,
  StorageItemNamspaces,
} from '../../../protocol';
import { SideScoreType } from '../../Content.component';
import ScrollControlScreen from './ScrollControlScreen.component';

const ScrollControlScreenContainer = () => {
  const [configuration, setConfiguration] = useState<
    PopupConfigurationStorageItem | undefined
  >();
  const [sidePercentages, setSidePercentages] = useState<SideScoreType>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  });

  useEffect(() => {
    chrome.storage.sync.get(
      [StorageItemNamspaces.POPUP_CONFIGURATION],
      (items) => {
        const config = items[
          StorageItemNamspaces.POPUP_CONFIGURATION
        ] as PopupConfigurationStorageItem;

        setConfiguration(config);
      }
    );

    chrome.storage.onChanged.addListener((changes) => {
      const currentChange = changes[StorageItemNamspaces.POPUP_CONFIGURATION];
      const newValue = currentChange ? currentChange['newValue'] : undefined;

      if (JSON.stringify(newValue) !== JSON.stringify(configuration)) {
        setConfiguration(newValue);
      }
    });
  }, []);

  useEffect(() => {
    const elem = document.body;
    elem.addEventListener(
      'sidegazeScoresChanged',
      (e: CustomEventInit) => {
        const gazeScores = e.detail as SideScoreType;
        setSidePercentages(gazeScores);
      },
      false
    );
  }, []);

  return (
    <ScrollControlScreen
      configuration={configuration}
      sidePercentages={sidePercentages}
    />
  );
};

export default ScrollControlScreenContainer;
