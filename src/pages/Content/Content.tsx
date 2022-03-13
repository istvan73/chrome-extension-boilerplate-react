import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import {
  PopupConfigurationStorageItem,
  MessageProtocol,
  StorageItemNamspaces,
} from '../protocol';
import { SideType } from '../../icons/DownIcon';

import './Content.scss';
import TrainingComponent from './TrainingComponent';
import ScrollDownControl from './components/ScrollDownControl';

export type SideScoreType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const Content = () => {
  const [isTrainingOn, setIsTrainingOn] = useState(false);
  const [configuration, setConfiguration] = useState<
    PopupConfigurationStorageItem | undefined
  >();

  // const gazePredictions = useSidegazePredictions();

  // const sidePercentages = {
  //   top: 85,
  //   bottom: gazePredictions.bottomGazeScore,
  //   left: 5,
  //   right: 40,
  // };

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

    chrome.runtime.onMessage.addListener(
      (message: MessageProtocol, sender, sendResponse) => {
        switch (message.command) {
          case 'SET_CONFIGURATION':
            break;
          case 'START_ALGO_TRAIN':
            setIsTrainingOn(true);
            break;

          default:
            break;
        }
      }
    );
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
  // console.log({ sidePercentages });
  return (
    <div className="i-control-root">
      {isTrainingOn && (
        <div className="i-control-content">
          <TrainingComponent />
        </div>
      )}
      {map(configuration?.selectedSides, (side) => {
        return sidePercentages[side as SideType] > 10 ? (
          <ScrollDownControl
            key={side + '-scroll-control'}
            percent={sidePercentages[side as SideType]}
            side={side as SideType}
          />
        ) : null;
      })}
    </div>
  );
};

export default Content;
