import React from 'react'
import cl from './Layout.module.css'

class Layout extends React.Component {
  render() {
    return (
      <div className={cl.Layout}>
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout