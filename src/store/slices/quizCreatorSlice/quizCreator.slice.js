import {createFormControl} from './formControls';
import {createSlice} from '@reduxjs/toolkit';
import {validateControl, validateForm} from '../../../form/formFramework';

const initialState = {
  quiz: [],
  rightAnswerId: 1,
  isFormValid: false,
  formControls: createFormControl()
}

const createQuizSlice = createSlice({
  name: 'createQuiz',
  initialState,
  reducers: {
    createQuestion: state => {
      const newQuiz = [...state.quiz]
      const index = newQuiz.length + 1

      const {question, option1, option2, option3, option4} = state.formControls

      const questionItem = {
        question: question.value,
        id: index,
        rightAnswerId: state.rightAnswerId,
        options: [
          {text: option1.value, id: option1.id},
          {text: option2.value, id: option2.id},
          {text: option3.value, id: option3.id},
          {text: option4.value, id: option4.id}
        ]
      }

      newQuiz.push(questionItem)
      state.quiz = newQuiz
      state.formControls = createFormControl()
      state.isFormValid = false
      state.rightAnswerId = 1
    },
    setToDefault: state => {
      state.quiz = []
      state.formControls = createFormControl()
      state.isFormValid = false
      state.rightAnswerId = 1
    },
    setRightAnswer: (state, action) => {
      state.rightAnswerId = +action.payload
    },
    updateControls: (state, action) => {
      const { value, controlKey, rules } = action.payload;

      state.formControls[controlKey].value = value;
      state.formControls[controlKey].touched = true;
      state.formControls[controlKey].valid = validateControl(value, rules);
      state.isFormValid = validateForm(state.formControls);
    },
  }
})


export const {createQuestion, setRightAnswer, updateControls, setToDefault} = createQuizSlice.actions
export default createQuizSlice.reducer