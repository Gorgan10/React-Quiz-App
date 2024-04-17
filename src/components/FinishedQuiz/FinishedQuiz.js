import React from 'react';
import cl from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom'

const FinishedQuiz = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === 'success') {
      total++
    }
    return total
  }, 0)

  return (
    <div className={cl.FinishedQuiz}>
      <ul>
        {props.quiz.map((quiz, index) => {
          const classes = [
            'fa',
            props.results[quiz.id] === 'error' ? 'fa-times' : 'fa-check',
            cl[props.results[quiz.id]]
          ]
          return (
            <li key={index}>
              <strong>{index + 1}.</strong>&nbsp;
              {quiz.question}
              <i className={classes.join(' ')}/>
            </li>
          )
        })}
      </ul>

      <p>Correct answers: {successCount} of {props.quiz.length}</p>

      <div>
        <Button onClick={props.onRetry} type='primary'>Try Again</Button>
        <Link to='/'>
          <Button type='success'>See Other Quiz</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishedQuiz;