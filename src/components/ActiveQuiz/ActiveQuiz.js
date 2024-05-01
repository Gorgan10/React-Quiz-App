import React from 'react';
import cl from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';

const ActiveQuiz = (props) => {
  return (
    <div className={cl.ActiveQuiz}>
      <p className={cl.Question}>
        <span>
          <strong>{props.questionNumber}.</strong>&nbsp;
           {props.question}
        </span>
        <small>{props.questionNumber} of {props.quizLength}</small>
      </p>

      <AnswersList status={props.status} onAnswerClick={props.onAnswerClick} answers={props.answers}/>
    </div>
  );
};

export default ActiveQuiz;