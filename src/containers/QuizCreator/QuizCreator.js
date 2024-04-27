import React from 'react';
import cl from './QuizCreator.module.css'
import Button from '../../components/UI/Button/Button';
import {createControl, validateControl, validateForm} from '../../form/formFramework';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';

function createOptionControl(id) {
  return createControl(
    {
      label: `Option ${id}`,
      placeholder: 'Type an option...',
      id,
      errorMessage: 'Required Field'
    },
    {
      required: true
    })
}

function createFormControl () {
  return {
    question: createControl({
      label: 'Question',
      placeholder: 'Type a question...',
      errorMessage: 'Required Field'
    }, {required: true}),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  }
}

class QuizCreator extends React.Component {
  state = {
    quiz: [],
    rightAnswerId: 1,
    isFormValid: false,
    formControls: createFormControl()
  }

  submitHandler = (e) => {
    e.preventDefault()
  }

  createQuestionHandler = (event) => {
    const quiz = this.state.quiz.concat()
    const index = quiz.length + 1

    const {question, option1, option2, option3, option4} = this.state.formControls

    const questionItem = {
      question: question.value,
      id: index,
      options: [
        {text: option1.value, id: option1.id},
        {text: option2.value, id: option2.id},
        {text: option3.value, id: option3.id},
        {text: option4.value, id: option4.id}
      ]
    }

    quiz.push(questionItem)

    this.setState({
      quiz,
      formControls: createFormControl(),
      isFormValid: false,
      rightAnswerId: 1
    })
  }

  createQuizHandler = (event) => {
    console.log(this.state.quiz)
  }

  onChangeHandler = (event, controlKey, rules) => {
    const {value} = event.target

    this.setState(prevState => {
      const updatedControls = {
        ...prevState.formControls,
        [controlKey]: {
          ...prevState.formControls[controlKey],
          value,
          touched: true,
          valid: validateControl(value, rules)
        }
      }

      return {
        formControls: updatedControls,
        isFormValid: validateForm(updatedControls)
      }
    })
  }

  renderControls = (formControls) => {
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
            onChange={(e) => this.onChangeHandler(e, controlKey, control.rules)}
          />
          {index === 0 ? <hr key={key} /> : undefined}
        </React.Fragment>
      )
    })
  }

  selectChangeHandler = (value) => {
    this.setState({
      rightAnswerId: +value
    })
  }

  render() {
    const select = <Select
      label={'Select correct answer'}
      value={this.state.rightAnswerId}
      onChange={e => this.selectChangeHandler(e.target.value)}
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

          <form onSubmit={this.submitHandler}>

            {this.renderControls(this.state.formControls)}

            {select}

            <div className={cl.buttons}>
              <Button type='primary' disabled={!this.state.isFormValid} onClick={(event) => this.createQuestionHandler(event)}>Add the Question</Button>
              <Button type='success' disabled={this.state.quiz.length === 0} onClick={this.createQuizHandler}>Create the Quiz</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default QuizCreator;