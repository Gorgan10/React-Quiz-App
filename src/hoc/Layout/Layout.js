import React, {useState} from 'react'
import cl from './Layout.module.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle';
import Drawer from '../../components/Navigation/Drawer/Drawer';
import {useSelector} from 'react-redux';

const Layout = ({children}) => {
  const {isAuthenticated} = useSelector(state => state.auth)
  const [menuState, setMenuState] = useState(false)

  const toggleMenuHandler = () => setMenuState(!menuState);
  const closeMenuHandler = () => setMenuState(false);

    return (
      <div className={cl.Layout}>

        <Drawer
          onClose={closeMenuHandler}
          isOpen={menuState}
          isAuthenticated={isAuthenticated}
        />

        <MenuToggle
          onToggle={toggleMenuHandler}
          isOpen={menuState}
        />

        <main>
          { children }
        </main>
      </div>
    )
}

export default Layout;