import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { addUser } from "../../store/session";
import { useDispatch } from "react-redux";
import logo from './zipnodes_logo.png';

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user))
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const onLoginDemo = async (e) => {
    e.preventDefault();
    const user = await login("node_demo@aa.io", "password");
    if (!user.errors) {
      setAuthenticated(true);
      dispatch(addUser(user));
      // dispatch(getPostsForUser());
    } else {
      setErrors(user.errors);
    }
  };

  if (authenticated) {
    return <Redirect to="/" />;
    // return <Redirect to="/reviews/new" />;
  }

  return (
    <div className='page-container'>
      <div>
        <div className='container' style={{ border: 'none' }}>
          <img src={logo} alt='logo' style={{ padding: '5px 5rem' }} />
          <form onSubmit={onLogin}>
            <div className='field-inputs'>
              <input
                name="email"
                type="text"
                placeholder="Email"
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='field-inputs'>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={updatePassword}
              />
            </div>
            <div className='submit-button-container' style={{ marginTop: '18px' }}>
              <button type="submit" className='blue-submit-button'>Log In</button>
            </div>
          </form>
          <div className='container redirect-container' style={{ border: 'none' }}>
            <p>Don't have an account? <nobr><a href='/sign-up'>Sign up</a></nobr></p>
            <p>Use a demo account <nobr><a onClick={onLoginDemo} className='demo-link'>Demo</a></nobr></p>
          </div>
          <div className='errors-container'>
            {errors.map((error) => (
              <div className='errors'>{error}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
