import React from 'react';

type InputGroupType = {
  title: string;
  singleRow?: boolean;
};

const InputGroup: React.FC<InputGroupType> = ({
  title,
  children,
  singleRow,
}) => {
  return (
    <div className={`input-group-container ${singleRow ? 'single-row' : ''}`}>
      <div className="input-group-title">{title}</div>
      {children}
    </div>
  );
};

export default InputGroup;
