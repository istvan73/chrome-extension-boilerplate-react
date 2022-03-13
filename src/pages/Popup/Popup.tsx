import React from 'react';

import 'rc-slider/assets/index.css';
import './Popup.scss';
import PopupContent from './components/PopupContent';
import { MessageProtocol } from '../protocol';
import InfoIcon from './components/icons/InfoIcon';

const Popup = () => {
  return (
    <div className="popup-container">
      <div className="header">
        <div>Configure me!</div>
        <InfoIcon />
      </div>
      <PopupContent />
      <div className="footer">
        <input
          className="lets-train-button"
          type="button"
          value="Let's train the algo"
          onClick={() =>
            chrome.tabs.query(
              { active: true, currentWindow: true },
              function (tabs) {
                if (tabs[0].id) {
                  const message: MessageProtocol = {
                    command: 'START_ALGO_TRAIN',
                    payload: true,
                  };
                  chrome.tabs.sendMessage(tabs[0].id, message);
                }
              }
            )
          }
        />
      </div>
    </div>
  );
};

export default Popup;
