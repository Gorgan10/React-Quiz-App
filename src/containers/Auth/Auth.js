import React from 'react';
import cl from './Auth.module.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';

class Auth extends React.Component {
  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Invalid Email',
        valid: false,
        touched: false,
        rules: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Invalid Password',
        valid: false,
        touched: false,
        rules: {
          required: true,
          minLength: 6
        }
      }
    }
  }

  loginHandler = () => {

  }
  registerHandler = () => {

  }

  submitHandler = e => {
    e.preventDefault()
  }

  validateControl = (value, rules) => {
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

  onChangeHandler = (event, controlName) => {
    const { value } = event.target;

    this.setState(prevState => {
      const updatedControls = {
        ...prevState.formControls,
        [controlName]: {
          ...prevState.formControls[controlName],
          value,
          touched: true,
          valid: this.validateControl(value, prevState.formControls[controlName].rules)
        }
      };

      let isFormValid = true;
      for (let control in updatedControls) {
        isFormValid = updatedControls[control].valid && isFormValid;
      }

      return {
        formControls: updatedControls,
        isFormValid: isFormValid
      };
    });
  }

  renderInput = () => {
    return Object.keys(this.state.formControls).map((ctrlName, index) => {
      const control = this.state.formControls[ctrlName]
      return (
        <Input
          key={ctrlName + index}
          label={control.label}
          type={control.type}
          value={control.value}
          valid={control.valid}
          touched={control.touched}
          errorMessage={control.errorMessage}
          shouldValidate={!!control.rules}
          onChange={(e) => this.onChangeHandler(e, ctrlName)}
        />
      )
    })
  }


  render() {
    return (
      <div className={cl.Auth}>
        <div>
          <h1>Log In</h1>

          <form className={cl.Form} onSubmit={this.submitHandler}>

            {this.renderInput()}


            <div className={cl.buttons}>
              <Button type='primary' onClick={this.loginHandler} disabled={!this.state.isFormValid}>Sign in</Button>
              <Button type='success' onClick={this.registerHandler} disabled={!this.state.isFormValid}>Sign up</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Auth;