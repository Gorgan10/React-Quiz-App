import {configureStore} from '@reduxjs/toolkit';
import quizListState from './slices/quizListSlice/quizList.slice';
import quizState from './slices/quizSlice/quiz.slice'
import createQuizState from './slices/quizCreatorSlice/quizCreator.slice'
import authState from './slices/authSlice/auth.slice'

const store = configureStore({
  reducer: {
    quizList: quizListState,
    quiz: quizState,
    quizCreator: createQuizState,
    auth: authState
  }
})

export default store;