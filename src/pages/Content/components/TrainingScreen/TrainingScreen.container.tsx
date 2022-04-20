import React, { useState } from 'react';
import { GeneralPopup } from '../../../Shared';
import './style.scss';
import TrainingComponent from './TrainingComponent';

type TrainingScreenProps = {
  closeTrainingMode: () => void;
};

const TrainingScreen: React.FC<TrainingScreenProps> = ({
  closeTrainingMode,
}) => {
  const [isTraining, setIsTraining] = useState(false);
  const [isInitialModalOpen, setIsInitialModalOpen] = useState(true);
  const [isTrainingFinishedModalOpen, setIsTrainingFinishedModalOpen] =
    useState(false);

  return (
    <>
      {isTraining && (
        <TrainingComponent
          finishTraining={() => {
            setIsTraining(false);
            setIsTrainingFinishedModalOpen(true);
          }}
        />
      )}
      {isInitialModalOpen && (
        <GeneralPopup
          title="You are about to train"
          onClose={() => {
            setIsInitialModalOpen(false);
            closeTrainingMode();
          }}
          width={800}
        >
          <div className="training-popup-container">
            <p>
              When training the algo, make sure your head stays in a fixed
              position, the lighting is good in the room, and you are about 60cm
              away from your monitor.
            </p>

            <p>
              Your eye movement will be synchronized with your mouse movement
              and clicks.
            </p>
            <p>
              Soo, follow the mouse with your eyes. The game is: keep clicking
              on the little orange dot on the screen.
            </p>
            <button
              className="button-primary"
              onClick={() => setIsTraining(true)}
            >
              Let's go
            </button>
          </div>
        </GeneralPopup>
      )}

      {isTrainingFinishedModalOpen && (
        <GeneralPopup
          title="You did it!"
          onClose={() => {
            setIsTrainingFinishedModalOpen(false);
            closeTrainingMode();
          }}
          width={800}
        >
          <div className="training-popup-container">
            <p>You have managed to train the algo, now go and check it out!</p>
            <p>
              Just do a click somewhere on the page, and then start looking at
              the sides.
            </p>
            <p>If something is wrong, you can train again.</p>
            <button
              className="button-primary"
              onClick={() => {
                setIsTrainingFinishedModalOpen(false);
                closeTrainingMode();
              }}
            >
              Let's go
            </button>
          </div>
        </GeneralPopup>
      )}
    </>
  );
};

export default TrainingScreen;
