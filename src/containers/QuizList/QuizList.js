import React from 'react';
import cl from './QuizList.module.css'
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/UI/Loader/Loader';

class QuizList extends React.Component {
  state = {
    quizList: [],
    isLoad: true
  }

  renderQuizList = () => {
    return this.state.quizList.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    })
  }

  async componentDidMount() {
    try {
      const {data} = await axios.get('/quiz.json')
      const quizList = []

      Object.keys(data).forEach((key, index) => {
        quizList.push({
          id: key,
          name: `Quiz ${index + 1}`
        })
      })

      this.setState({
        quizList,
        isLoad: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={cl.QuizList}>
        <div>
          <h1>List of Quiz</h1>

          {this.state.isLoad
            ? <Loader />
            : <ul>
                {this.renderQuizList()}
              </ul>
          }
        </div>
      </div>
    );
  }
}

export default QuizList;