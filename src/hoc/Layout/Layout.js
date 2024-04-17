import React from 'react'
import cl from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';

class Layout extends React.Component {

  state = {
    menu: false
  }
  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu
    })
  }

  render() {
    return (
      <div className={cl.Layout}>

        <Drawer
          isOpen={this.state.menu}
          onClose={this.toggleMenuHandler}
        />

        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />

        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout;