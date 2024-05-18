import React from 'react';
import cl from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {
  createQuestion,
  setToDefault,
  setRightAnswer,
  updateControls
} from '../../store/slices/quizCreatorSlice/quizCreator.slice';

const QuizCreator = () => {
  const {quiz, rightAnswerId, isFormValid, formControls} = useSelector(state => state.quizCreator)
  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
  }

  const createQuestionHandler = () => {
    dispatch(createQuestion())
  }

  const createQuizHandler = async () => {
    try {
      await axios.post('/quiz.json', quiz)
      dispatch(setToDefault())
    } catch (e) {
      console.error(e)
    }
  }

  const onChangeHandler = (event, controlKey, rules) => {
    const {value} = event.target
    dispatch(updateControls({value, controlKey, rules}))
  };

  const renderControls = (formControls) => {
    return Object.keys(formControls).map((controlKey, index) => {
      const control = formControls[controlKey]
      const key = `${controlKey}-${index}`

      return (
        <React.Fragment key={key}>
          <Input
            labelStyle={{color: '#000'}}
            placeholder={control.placeholder}
            key={index}
            label={control.label}
            errorMessage={control.errorMessage}
            value={control.value}
            touched={control.touched}
            valid={control.valid}
            shouldValidate={!!control.rules}
            rules={control.rules}
            onChange={(e) => onChangeHandler(e, controlKey, control.rules)}
          />
          {index === 0 ? <hr key={key} /> : undefined}
        </React.Fragment>
      )
    })
  }

  const selectChangeHandler = (value) => {
    dispatch(setRightAnswer(value))
  }

  const select = <Select
    label={'Select correct answer'}
    value={rightAnswerId}
    onChange={e => selectChangeHandler(e.target.value)}
    options={[
      {text: 1, value: 1},
      {text: 2, value: 2},
      {text: 3, value: 3},
      {text: 4, value: 4}
    ]}
    />

    return (
      <div className={cl.QuizCreator}>
        <div>
          <h1>Create a Quiz</h1>

          <form onSubmit={submitHandler}>

            {renderControls(formControls)}

            {select}

            <div className={cl.buttons}>
              <Button type='primary' disabled={!isFormValid} onClick={createQuestionHandler}>Add the Question</Button>
              <Button type='success' disabled={quiz.length === 0} onClick={createQuizHandler}>Create the Quiz</Button>
            </div>
          </form>
        </div>
      </div>
    );
}

export default QuizCreator;