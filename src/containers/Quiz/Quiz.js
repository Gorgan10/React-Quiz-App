import React from 'react';
import cl from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

class Quiz extends React.Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [],
    isLoad: true
  }

  onAnswerClick = (id) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = {...this.state.results}

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

  async componentDidMount() {
    try {
      const {data} = await axios.get(`/quiz/${this.props.id}.json`);
      const quiz = [];

      Object.keys(data).forEach(key => {
        quiz.push({
          id: data[key].id,
          options: data[key].options,
          question: data[key].question,
          rightAnswerId: data[key].rightAnswerId
        });
      });

      this.setState({
        quiz,
        isLoad: false
      });

    } catch (error) {
      console.error("Error loading quiz:", error);
    }
  }

  render() {
    return (
      <div className={cl.Quiz}>
        <div className={cl.QuizWrapper}>
          <h1>Answer the Question</h1>

          {
            this.state.isLoad
            ? <Loader/>
            : this.state.isFinished
                ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
                : <ActiveQuiz
                    answers={this.state.quiz[this.state.activeQuestion].options}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick={this.onAnswerClick}
                    quizLength={this.state.quiz.length}
                    questionNumber={this.state.activeQuestion + 1}
                    status={this.state.answerState}
                  />
          }
        </div>
      </div>
    )
  }
}

export default function QuizWrapper(props) {
  const {id} = useParams()

  return <Quiz {...props} id={id} />
}