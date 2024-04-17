import React from 'react';
import cl from './QuizList.module.css'
import {NavLink} from 'react-router-dom';

class QuizList extends React.Component {
  renderQuizList = () => {
    return [1, 2, 3].map((quiz, index) => {
      return (
        <li key={index}>
          <NavLink to={`/quiz/${index + 1}`}>Quiz {quiz}</NavLink>
        </li>
      );
    })
  }


  render() {
    return (
      <div className={cl.QuizList}>
        <div>
          <h1>List of Quiz</h1>

          <ul>
            {this.renderQuizList()}
          </ul>
        </div>
      </div>
    );
  }
}

export default QuizList;