import { map } from 'lodash';
import React, { useEffect, useState } from 'react';
import { SideType } from '../../../../icons/DownIcon';
import {
  PopupConfigurationStorageItem,
  StorageItemNamspaces,
} from '../../../protocol';
import { SideScoreType } from '../../Content.component';
import GeneralScrollControl from '../GeneralScrollControl';

type ScrollControlScreenProps = {
  configuration: PopupConfigurationStorageItem | undefined;
  sidePercentages: SideScoreType;
};

const ScrollControlScreen: React.FC<ScrollControlScreenProps> = ({
  configuration,
  sidePercentages,
}) => {
  return (
    <>
      {map(configuration?.selectedSides, (side) => {
        return sidePercentages[side as SideType] > 10 ? (
          <GeneralScrollControl
            key={side + '-scroll-control'}
            percent={sidePercentages[side as SideType]}
            side={side as SideType}
          />
        ) : null;
      })}
    </>
  );
};

export default ScrollControlScreen;
