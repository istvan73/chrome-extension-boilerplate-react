import React, { useEffect, useState } from 'react';
import { MessageProtocol } from '../protocol';
import { ScrollControlScreen } from './components/ScrollControlScreen';
import { TrainingScreen } from './components/TrainingScreen';
import './Content.scss';

export type SideScoreType = {
  top: number;
  bottom: number;
  left: number;
  right: number;
};

const Content = () => {
  const [isTrainingOn, setIsTrainingOn] = useState(false);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: MessageProtocol) => {
      if (message.command === 'START_ALGO_TRAIN') {
        setIsTrainingOn(message.payload);
      }
    });
  }, []);

  return (
    <div className="i-control-root">
      {isTrainingOn ? (
        <div className="i-control-content">
          <TrainingScreen closeTrainingMode={() => setIsTrainingOn(false)} />
        </div>
      ) : (
        <ScrollControlScreen />
      )}
    </div>
  );
};

export default Content;
