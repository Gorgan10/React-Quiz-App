import React from 'react';
import cl from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

const Drawer = (props) => {

  const links = [
    {to: '/', label: 'Home'}
  ]

  const renderLinks = (links) => {

    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            className={cl.active}
            onClick={props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }
    const classes = [cl.Drawer]

    if (!props.isOpen) {
      classes.push(cl.close)
    }

    if (props.isAuthenticated) {
      links.push({to: '/quiz-creator', label: 'Create a Quiz'})
      links.push({to: '/logout', label: 'Log Out'})
    } else {
      links.push({to: '/auth', label: 'Log In'})
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {renderLinks(links)}
          </ul>
        </nav>
        {props.isOpen ? <Backdrop onClick={props.onClose} /> : null}
      </React.Fragment>
    )
}

export default Drawer;