import React from 'react';
import Answer from './Answer/Answer';
import cl from './AnswersList.module.css'
const AnswersList = (props) => {
  return (
    <ul className={cl.AnswersList}>
      {props.answers.map((answer, index) => {
        return (
          <Answer key={index} answer={answer}/>
        )
      })}
    </ul>
  );
};

export default AnswersList;