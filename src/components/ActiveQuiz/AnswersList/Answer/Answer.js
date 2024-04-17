import React from 'react';
import cl from './Answer.module.css'

const Answer = (props) => {
  const classes = [cl.Answer]

  if (props.status) {
    classes.push(cl[props.status])
  }

  return (
    <li className={classes.join(' ')} onClick={() => props.onAnswerClick(props.answer.id)}>
      {props.answer.text}
    </li>
  );
};

export default Answer;