import React from 'react';
import cl from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
  return !valid && shouldValidate && touched
}

const Input = (props) => {
  const classes = [cl.Input]
  const htmlFor = `${props.type || 'text'}-${Math.random()}`

  if (isInvalid(props)) {
    classes.push(cl.invalid)
  }

  return (
    <div className={classes.join(' ')}>
      <label style={props.labelStyle || {color: '#fff'}} htmlFor={htmlFor}>{props.label}</label>
      <input
        type={props.type || 'text'}
        placeholder={props.placeholder}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />

      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Invalid Key'}</span>
          : undefined
      }

    </div>
  );
};

export default Input;