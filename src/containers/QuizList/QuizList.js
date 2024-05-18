import React, {useEffect} from 'react';
import cl from './QuizList.module.css'
import {NavLink} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {fetchQuizzes} from '../../store/slices/quizListSlice/quizList.slice';

const  QuizList = () => {
  const {quizList, loadingState} = useSelector(state => state.quizList)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchQuizzes());
  }, [dispatch]);

  const renderQuizList = () => {
    return quizList.map((quiz) => {
      return (
        <li key={quiz.id}>
          <NavLink to={`/quiz/${quiz.id}`}>{quiz.name}</NavLink>
        </li>
      );
    })
  }

    return (
      <div className={cl.QuizList}>
        <div>
          <h1>List of Quiz</h1>
          {loadingState === 'loading' ? <Loader /> : <ul>{renderQuizList()}</ul>}
        </div>
      </div>
    );
}

export default QuizList;