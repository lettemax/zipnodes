import React from "react";
import { logout } from "../../services/auth";
import { NavLink, useHistory } from 'react-router-dom';

const LogoutButton = ({setAuthenticated}) => {
  const history = useHistory();
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
    history.push('/');
    //dispatch(logoutUser())
  };

  return <NavLink to='/' className='logout-button' onClick={onLogout}>logout</NavLink>;
};

export default LogoutButton;
