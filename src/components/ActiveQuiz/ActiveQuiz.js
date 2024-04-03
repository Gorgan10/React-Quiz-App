import React from 'react';
import cl from './ActiveQuiz.module.css'
import AnswersList from './AnswersList/AnswersList';
import Question from './Question/Question';

const ActiveQuiz = (props) => {
  return (
    <div className={cl.ActiveQuiz}>
      <p className={cl.Question}>
        <Question question={props.question} />
        <small>4 of 12</small>
      </p>

      <AnswersList answers={props.answers}/>
    </div>
  );
};

export default ActiveQuiz;