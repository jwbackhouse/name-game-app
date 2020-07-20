import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';


export const Header = ({ startLogout, history }) => {
  const onClick = () => {
    history.push('/admin');
  };
  
  return (
    <div className='header'>
      <div className='content-container'>
        <div className='header__content'>
          <h1 className='header__title'>The Name Game</h1>
          <button onClick={ startLogout }>Sign out</button>
          <button onClick = { onClick }>Settings</button>
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);