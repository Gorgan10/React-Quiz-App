export function createFormControl(label, type, errorMessage, rules) {
  return {
    value: '',
    type,
    label,
    errorMessage,
    valid: false,
    touched: false,
    rules
  }
}

export function clearFormControlsHandler() {
  return {
    email: createFormControl('Email', 'email', 'Invalid Email', {required: true, email: true}),
    password: createFormControl('Password', 'password', 'Invalid Password', {required: true, minLength: 6})
  }
}