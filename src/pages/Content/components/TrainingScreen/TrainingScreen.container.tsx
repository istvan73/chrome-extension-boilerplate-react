import React, { useState } from 'react';
import { GeneralPopup } from '../../../Shared';
import TrainingComponent from './TrainingComponent';

import './style.scss';

const TrainingScreen: React.FC = () => {
  const [isTraining, setIsTraining] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return isTraining ? (
    <TrainingComponent />
  ) : isModalOpen ? (
    <GeneralPopup
      title="You are about to train"
      onClose={() => setIsModalOpen(false)}
      width={800}
    >
      <div className="training-popup-container">
        <p>
          When training the algo, make sure your head stays in a fixed position,
          the lighting is good in the room, and you are about 60cm away from
          your monitor.
        </p>

        <p>
          Your eye movement will be synchronized with your mouse movement and
          clicks.
        </p>
        <p>
          Soo, follow the mouse with your eyes. The game is: keep clicking on
          the little orange dot on the screen.
        </p>
        <button onClick={() => setIsTraining(true)}>Let's go</button>
      </div>
    </GeneralPopup>
  ) : (
    <></>
  );
};

export default TrainingScreen;
