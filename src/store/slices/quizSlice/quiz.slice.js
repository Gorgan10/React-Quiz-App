import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  quiz: [],
  results: {},
  answerState: null,
  activeQuestion: 0,
  isFinished: false,
  isLoading: 'idle'
}

export const fetchQuiz = createAsyncThunk('quiz/fetchQuiz', async (id) => {
  const {data} = await axios.get(`/quiz/${id}.json`);
  const fetchedQuiz = [];
  Object.keys(data).forEach(key => {
    fetchedQuiz.push({
      id: data[key].id,
      options: data[key].options,
      question: data[key].question,
      rightAnswerId: data[key].rightAnswerId
    });
  })
  return fetchedQuiz;
})

export const advanceQuestion = () => (dispatch, getState) => {
  const { quiz, activeQuestion } = getState().quiz;
  setTimeout(() => {
    dispatch(resetAnswerState())
    if (activeQuestion + 1 < quiz.length) {
      dispatch(nextQuestion());
    } else {
      dispatch(finishQuiz());
    }
  }, 500);
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    setToDefault: state => {
      state.activeQuestion = 0
      state.answerState = null
      state.isFinished = false
      state.results = {}
    },
    nextQuestion: state => {
      state.activeQuestion += 1
    },
    finishQuiz: (state) => {
      state.isFinished = true;
    },
    resetAnswerState: (state) => {
      state.answerState = null;
    },
    validateAnswer: (state, action) => {
      const answerId = action.payload;
      const currentQuestion = state.quiz[state.activeQuestion];

      if (state.answerState) {
        const key = Object.keys(state.answerState)[0];
        if (state.answerState[key] === 'success') {
          return;
        }
      }

      if (currentQuestion.rightAnswerId === answerId) {
        if (!state.results[currentQuestion.id]) {
          state.results[currentQuestion.id] = 'success';
        }
        state.answerState = { [answerId]: 'success' };
      } else {
        state.results[currentQuestion.id] = 'error';
        state.answerState = { [answerId]: 'error' };
      }
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchQuiz.pending, (state) => {
        state.isLoading = 'loading'
      })
      .addCase(fetchQuiz.fulfilled, (state, action) => {
        state.quiz = action.payload
        state.isLoading = 'succeeded'
      })
      .addCase(fetchQuiz.rejected, state => {
        state.isLoading = 'failed'
      })
  }
})

export const {setToDefault, nextQuestion, validateAnswer, finishQuiz, resetAnswerState} = quizSlice.actions
export default quizSlice.reducer;