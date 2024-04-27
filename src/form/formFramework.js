export function createControl(config, rules) {
  return {
    ...config,
    rules,
    valid: !rules,
    touched: false,
    value: ''
  }
}

export const validateControl = (value, rules) => {
  let isValid = true

  if (rules.required && isValid) {
    isValid = value.trim() !== ''
  }

  return isValid
}

export const validateForm = (controls) => {
  let isFormValid = true

  for (let control in controls) {
    isFormValid = controls[control].valid && isFormValid
  }

  return isFormValid
}