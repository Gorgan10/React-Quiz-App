import React from 'react';
import cl from './Button.module.css'

const Button = (props) => {
  const classes = [
    cl.Button,
    cl[props.type]
  ]

  return (
    <button
      onClick={props.onClick ? (e) => props.onClick(e) : undefined}
      className={classes.join(' ')}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;