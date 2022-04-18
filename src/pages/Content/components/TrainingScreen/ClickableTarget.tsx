import React, { useEffect, useState } from 'react';

const colorZeroClick = [235, 123, 26];
const colorDiffs = [12, -92, -19];

type ClickableTargetProps = {
  xCoord: number;
  yCoord: number;
  goToNextPosition: () => void;
};

const ClickableTarget: React.FC<ClickableTargetProps> = ({
  xCoord,
  yCoord,
  goToNextPosition,
}) => {
  const [clickCount, setClickCount] = useState(0);
  const nextColors = colorDiffs.map((diff, i) =>
    Math.floor(colorZeroClick[i] + (clickCount * 20 * diff) / 100)
  );

  const handleClick = () => {
    setClickCount((currentClickCount) => currentClickCount + 1);
  };

  useEffect(() => {
    if (clickCount >= 5) {
      goToNextPosition();
      setClickCount(0);
    }
  }, [clickCount, goToNextPosition]);

  return (
    <div
      className="target"
      onClick={handleClick}
      style={{
        zIndex: 1001,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '15px',
        height: '15px',
        borderRadius: 100,
        transform: `translateX(${xCoord}vw) translateY(${yCoord}vh)`,
        transition: 'transform 1.5s',
        backgroundColor: `rgba(${nextColors[0]},${nextColors[1]},${nextColors[2]},1)`,
        boxShadow: `
            0 0 20px rgba(255, 81, 0, 0.7), 
            0 0 40px rgb(255, 81, 0, 0.8),
            0 0 60px rgb(255, 81, 0), 
            0 0 80px rgb(255, 81, 0),
            0 0 0 4px rgba(255, 81, 0, 0.2), 
            0 0 0 8px rgba(255, 81, 0, 0.1)
            `,
      }}
    ></div>
  );
};

export default ClickableTarget;
