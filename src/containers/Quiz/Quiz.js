import React from 'react';
import cl from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

class Quiz extends React.Component {
  state = {
    results: {}, // {[id]: success error}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {{[id: 'success' 'error'}}
    quiz: [
      {
        id: 1,
        question: 'What is your name?',
        rightAnswerId: 4,
        answers: [
          {text: 'James', id: 1},
          {text: 'Bob', id: 2},
          {text: 'Arthur', id: 3},
          {text: 'Gor', id: 4}
        ]
      },
      {
        id: 2,
        question: 'What is your favorite color?',
        rightAnswerId: 3,
        answers: [
          {text: 'Blue', id: 1},
          {text: 'Red', id: 2},
          {text: 'Black', id: 3},
          {text: 'Green', id: 4}
        ]
      }
    ]
  }

  onAnswerClick = (id) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === id) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }
      this.setState({
        answerState: {[id]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log('Finished')
          this.setState({
            isFinished: true
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null
          })
        }

        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'
      this.setState({
        answerState: {[id]: 'error'},
        results
      })
      setTimeout(() => {
        this.setState({
          answerState: null
        })
      }, 1000)
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    })
  }

  render() {
    return (
      <div className={cl.Quiz}>
        <div className={cl.QuizWrapper}>
          <h1>Answer the Question</h1>
          {this.state.isFinished
          ? <FinishedQuiz
              results={this.state.results}
              quiz={this.state.quiz}
              onRetry={this.retryHandler}
            />
          : <ActiveQuiz
             answers={this.state.quiz[this.state.activeQuestion].answers}
             question={this.state.quiz[this.state.activeQuestion].question}
             onAnswerClick={this.onAnswerClick}
             quizLenth={this.state.quiz.length}
             quetionNumber={this.state.activeQuestion + 1}
             status={this.state.answerState}
           />}
        </div>
      </div>
    )
  }
}

export default Quiz;