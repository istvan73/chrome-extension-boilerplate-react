import React, { useState } from 'react';

import 'rc-slider/assets/index.css';
import './Popup.scss';
import PopupContent from './components/PopupContent';
import { MessageProtocol } from '../protocol';
import InfoIcon from './components/icons/InfoIcon';

const Popup = () => {
  const [isTraining, setIsTraining] = useState(false);

  const toggleTraining = () => {
    setIsTraining(!isTraining);

    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].id) {
        const message: MessageProtocol = {
          command: 'START_ALGO_TRAIN',
          payload: !isTraining,
        };
        chrome.tabs.sendMessage(tabs[0].id, message);
      }
    });
  };

  return (
    <div className="popup-container">
      <div className="header">
        <div>Configure me!</div>
        <InfoIcon />
      </div>
      <PopupContent />
      <div className="footer">
        <input
          className="popup-button"
          type="button"
          value="Let's train the algo"
          onClick={toggleTraining}
        />
        {isTraining && (
          <input
            className="popup-button cancel-button"
            type="button"
            value="Stop training"
            onClick={toggleTraining}
          />
        )}
      </div>
    </div>
  );
};

export default Popup;
