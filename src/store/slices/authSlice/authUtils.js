export const validateControl = (value, rules) => {
  if (!rules) {
    return true
  }

  let isValid = true
  if (rules.required && isValid) {
    isValid = value.trim() !== ''
  }

  if (rules.email && isValid) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(value);
  }

  if (rules.minLength && isValid) {
    isValid = value.length >= rules.minLength
  }

  return isValid
}