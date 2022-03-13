import { ConfigurationFieldType } from './Options/components/ConfigurationItem/ConfigurationItem';
import { SideSelectionOption } from './Popup/components/PopupContent';

export type CommandType = 'START_ALGO_TRAIN' | 'SET_CONFIGURATION';

export type MessageProtocol = {
  command: CommandType;
  payload: any;
};

export type StorageItemNamespaceType =
  | 'POPUP_CONFIGURATION'
  | 'OPTIONS_CONFIGURATION';

export const StorageItemNamspaces = {
  POPUP_CONFIGURATION: 'POPUP_CONFIGURATION',
  OPTIONS_CONFIGURATION: 'OPTIONS_CONFIGURATION',
};

export type PopupConfigurationStorageItem = {
  selectedSides: string[];
  scrollSize: number;
  sensitivity: number;
};

export type OptionsConfigurationStorage = {
  [id: string]: ConfigurationFieldType;
};
