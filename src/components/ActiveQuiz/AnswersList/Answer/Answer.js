import React from 'react';
import cl from './Answer.module.css'

const Answer = (props) => {
  return (
    <li className={cl.Answer}>
      {props.answer.text}
    </li>
  );
};

export default Answer;