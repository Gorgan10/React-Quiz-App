import React, {useCallback, useEffect} from 'react';
import cl from './Quiz.module.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import {useParams} from 'react-router-dom';
import Loader from '../../components/UI/Loader/Loader';
import {useDispatch, useSelector} from 'react-redux';
import {advanceQuestion, fetchQuiz, setToDefault, validateAnswer} from '../../store/slices/quizSlice/quiz.slice';

export const Quiz = () => {
  const {quiz, results, answerState, activeQuestion, isFinished, isLoading} = useSelector(state => state.quiz)
  const dispatch = useDispatch()
  const {id} = useParams()

  const onAnswerClick = useCallback((answerId) => {
    dispatch(validateAnswer(answerId))
    dispatch(advanceQuestion())
  }, [dispatch])

  const retryHandler = () => {
    dispatch(setToDefault())
  }

  useEffect( () => {
    dispatch(fetchQuiz(id))
  },[id, dispatch]);

  useEffect(() => {
    retryHandler();

    return () => {
      retryHandler();
    }
    // eslint-disable-next-line
  }, []);


    return (
      <div className={cl.Quiz}>
        <div className={cl.QuizWrapper}>
          <h1>Answer the Question</h1>

          {
            isLoading === 'loading' || quiz.length === 0
              ? <Loader/>
              : isFinished
                ? <FinishedQuiz
                  results={results}
                  quiz={quiz}
                  onRetry={retryHandler}
                />
                : <ActiveQuiz
                  answers={quiz[activeQuestion].options}
                  question={quiz[activeQuestion].question}
                  onAnswerClick={(answerId) => onAnswerClick(answerId)}
                  quizLength={quiz.length}
                  questionNumber={activeQuestion + 1}
                  status={answerState}
                />
          }
        </div>
      </div>
    )
}