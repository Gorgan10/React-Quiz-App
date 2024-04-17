import React from 'react';
import cl from './MenuToggle.module.css'

const MenuToggle = (props) => {
  const classes = [
    cl.MenuToggle,
    'fa'
  ]

  if (props.isOpen) {
    classes.push('fa-times')
    classes.push(cl.open)
  } else {
    classes.push('fa-bars')
  }

  return (
    <i
      className={classes.join(' ')}
      onClick={props.onToggle}
    />
  );
};

export default MenuToggle;