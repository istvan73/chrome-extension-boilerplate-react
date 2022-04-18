import React from 'react';

import './style.scss';

type GeneralPopupProps = {
  title: string;
  onClose: () => void;
  width?: number;
};

const GeneralPopup: React.FC<GeneralPopupProps> = ({
  title,
  onClose,
  width = 400,
  children,
}) => {
  return (
    <div
      className="general-popup-container"
      id="general-backdrop"
      onClick={(event) => {
        const target = event.target as HTMLElement;
        if (target.id === 'general-backdrop') onClose();
      }}
    >
      <div className="general-popup-component" style={{ width: `${width}px` }}>
        <div className="general-popup-title">
          <h2>{title}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};

export default GeneralPopup;
