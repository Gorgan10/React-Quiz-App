import React from 'react';
import cl from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';

class Quiz extends React.Component {
  state = {
    quiz: [
      {
        question: 'What is your name?',
        answers: [
          {text: 'James'},
          {text: 'Bob'},
          {text: 'Arthur'},
          {text: 'Gor'},
        ]
      }
    ]
  }
  render() {
    return (
      <div className={cl.Quiz}>
        <div className={cl.QuizWrapper}>
          <h1>Answer the Question</h1>
          <ActiveQuiz answers={this.state.quiz[0].answers} question={this.state.quiz[0].question} />
        </div>
      </div>
    )
  }
}

export default Quiz;