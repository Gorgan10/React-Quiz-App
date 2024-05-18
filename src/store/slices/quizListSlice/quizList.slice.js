import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  quizList: [],
  loadingState: 'idle'
};

export const fetchQuizzes = createAsyncThunk('quizList/fetchQuizzes', async () => {
  const response = await axios.get('/quiz.json');
  return Object.keys(response.data).map((key, index) => ({
    id: key,
    name: `Quiz ${index + 1}`
  }));
});

const quizListSlice = createSlice({
  name: 'quizList',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuizzes.pending, (state) => {
        state.loadingState = 'loading';
      })
      .addCase(fetchQuizzes.fulfilled, (state, action) => {
        state.quizList = action.payload;
        state.loadingState = 'succeeded';
      })
      .addCase(fetchQuizzes.rejected, (state) => {
        state.loadingState = 'failed';
      });
  }
});

export default quizListSlice.reducer;
