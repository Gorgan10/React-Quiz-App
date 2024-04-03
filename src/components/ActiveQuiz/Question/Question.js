import React from 'react';

const Question = ({question}) => {
  return (
    <span>
      <strong>1.</strong>&nbsp;
      {question}
    </span>
  );
};

export default Question;