import {createControl} from '../../../form/formFramework';

export function createOptionControl(id) {
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

export function createFormControl () {
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