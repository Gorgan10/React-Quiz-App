import React from 'react';
import cl from './Loader.module.css'

const Loader = () => {
  return (
    <div className={cl.center}>
      <div className={cl.Loader}>
        <div/>
        <div/>
      </div>
    </div>
  );
};

export default Loader;