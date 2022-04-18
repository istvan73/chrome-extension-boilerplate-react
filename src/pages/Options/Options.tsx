import React, { useState } from 'react';
import 'rc-slider/assets/index.css';
import EyeIcon from '../../icons/EyeIcon';
import { ConfigurationPage, IntroPage, TrainigPage } from './components';
import './Options.scss';

interface Props {
  title: string;
}

const contentPages = {
  intro: IntroPage,
  training: TrainigPage,
  config: ConfigurationPage,
};

type PageOption = 'intro' | 'training' | 'config';

const Options: React.FC<Props> = ({ title }: Props) => {
  const [selectedPage, setSelectedPage] = useState<PageOption>('config');

  const ContentPage = contentPages[selectedPage];

  return (
    <div className="OptionsContainer">
      <div className="top-section header">
        <EyeIcon />
        &nbsp;
        <EyeIcon />
        <h1>&nbsp;- Control settings</h1>
      </div>
      <div className="middle-section">
        <div className="left-sidebar">
          <button
            className="sidebar-button"
            onClick={() => setSelectedPage('intro')}
          >
            Intro
          </button>
          <button
            className="sidebar-button"
            onClick={() => setSelectedPage('training')}
          >
            How to do stuff
          </button>
          <button
            className="sidebar-button"
            onClick={() => setSelectedPage('config')}
          >
            Control da Power
          </button>
        </div>
        <div className="content">
          <ContentPage />
        </div>
      </div>
      <div className="bottom-section footer">Made by Pi2</div>
    </div>
  );
};

export default Options;
