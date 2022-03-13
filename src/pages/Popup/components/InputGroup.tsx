import React from 'react';

type InputGroupType = {
  title: string;
};

const InputGroup: React.FC<InputGroupType> = ({ title, children }) => {
  return (
    <div className="input-group-container">
      <div className="input-group-title">{title}</div>
      {children}
    </div>
  );
};

export default InputGroup;
