import React from 'react';
import cl from './Drawer.module.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import {NavLink} from 'react-router-dom';

const links = [
  {to: '/', label: 'Home'},
  {to: '/auth', label: 'Log In'},
  {to: '/quiz-creator', label: 'Create a Quiz'}
]

class Drawer extends React.Component {
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            className={cl.active}
            onClick={this.props.onClose}
          >
            {link.label}
          </NavLink>
        </li>
      )
    })
  }

  render() {
    const classes = [cl.Drawer]

    if (!this.props.isOpen) {
      classes.push(cl.close)
    }

    return (
      <React.Fragment>
        <nav className={classes.join(' ')}>
          <ul>
            {this.renderLinks()}
          </ul>
        </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
      </React.Fragment>
    )
  }
}

export default Drawer;