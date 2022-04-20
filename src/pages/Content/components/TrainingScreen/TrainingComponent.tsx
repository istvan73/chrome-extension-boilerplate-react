import { Line } from 'rc-progress';
import React, { useEffect, useState } from 'react';
import ClickableTarget from './ClickableTarget';

type TrainingComponentProps = {
  finishTraining: () => void;
};

const TrainingComponent: React.FC<TrainingComponentProps> = ({
  finishTraining,
}) => {
  const targets = [
    { xCoord: 1, yCoord: 1 },
    { xCoord: 25, yCoord: 1 },
    { xCoord: 25, yCoord: 25 },
    { xCoord: 1, yCoord: 50 },
    { xCoord: 25, yCoord: 75 },
    { xCoord: 1, yCoord: 97 },
    { xCoord: 50, yCoord: 97 },
    { xCoord: 75, yCoord: 97 },
    { xCoord: 75, yCoord: 75 },
    { xCoord: 50, yCoord: 50 },
    { xCoord: 75, yCoord: 25 },
    { xCoord: 95, yCoord: 50 },
    { xCoord: 95, yCoord: 97 },
    { xCoord: 50, yCoord: 97 },
    { xCoord: 95, yCoord: 1 },
    { xCoord: 50, yCoord: 1 },
    { xCoord: 75, yCoord: 1 },
    { xCoord: 50, yCoord: 50 },
  ];

  const [targetPositionIndex, setTargetPositionIndex] = useState(0);

  const goToNextPosition = () =>
    setTargetPositionIndex((currentIndex) => currentIndex + 1);

  useEffect(() => {
    targetPositionIndex >= targets.length && finishTraining();
  }, [targetPositionIndex]);

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: 1000,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#1e1e1ee6',
        cursor: 'crosshair',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: '300px' }}>
        <Line
          strokeWidth={10}
          trailWidth={10}
          percent={(targetPositionIndex * 100) / targets.length}
          trailColor="rgba(235, 235, 235, 0.1)"
          strokeColor="rgba(3, 252, 57, 0.1)"
        />
      </div>

      <ClickableTarget
        {...targets[targetPositionIndex]}
        goToNextPosition={goToNextPosition}
      />
    </div>
  );
};

export default TrainingComponent;
