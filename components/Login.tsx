import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'primereact/button';
import styles from '@styles/Login.module.scss';
import firebase from 'firebase/app';
import firebaseConfig from '@lib/firebaseAuthConfig';

import Facebook from '@components/Facebooklogin';

// import {signInWithGoogle} from "@lib/Auth";

const Login = (props) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const [email, setEmail] = useState('');
  const [errorReturn, setErrorReturn] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [password, setPassword] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res.user);
        if (res.user) {
          handleClickIn(res.user.email);
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          props.setUser(email);
        }
      })
      .catch((e) => {
        console.log(e.message);
        handleIncorrectLogin(e.message);
      });
  };

  const handleGoogle = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res.user.email);
        if (res.user.emailVerified) {
          handleClickIn(res.user.email);
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          props.setUser(res.user.email);
        }
      })
      .catch((error) => {
        console.log(error.message);
        handleIncorrectLogin(error.message);
      });
  };

  const handleClickIn = async (userEmail) => {
    await setEmail(userEmail);
    await setErrorMsg('');
    await setErrorReturn(false);
    await props.setLogged(true);
    await props.setIsVisibleMenu(true);
    props.setLoginOption(false);
  };
  const handleClickOut = () => {
    props.setIsVisibleMenu(false);
    props.setLoginOption(false);
    props.setLogged(false);
  };
  const handleClose = () => {
    props.setLoginOption(false);
    setErrorMsg('');
    setErrorReturn(false);
  };

  const handleIncorrectLogin = (error) => {
    setErrorMsg(error);
    setErrorReturn(true);
  };

  return (
    <div className={styles.mainContainer}>
      <img className={styles.logo} src='/ferrylogo-horizontal-trans.png' />
      {props.logged ? (
        <>
          <div>You are already logged in</div>
          <Button onClick={handleClickOut}>Log Out</Button>
        </>
      ) : (
        <form>
          <h3>Please Sign In</h3>

          <div className={styles.signInput}>
            <label htmlFor='username'>Username/email:</label>
            <input
              type='text'
              name='username'
              id='username'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='email'
            />
            <label htmlFor='password'>Password:</label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <Button onClick={handleForm}>Login Now</Button>
          <Button onClick={handleClickOut}>Log Out</Button>
          {errorReturn && <div style={{ color: 'red' }}>{errorMsg}</div>}
          <button className='login-provider-button' onClick={handleGoogle}>
            <img
              src='https://img.icons8.com/ios-filled/50/000000/google-logo.png'
              alt='google icon'
            />
            <span> Continue with Google</span>
          </button>
          {/* <button className='login-provider-button' onClick={handlefacebook}>
            <img src='./fb.png' width='10%' />
            <span> Continue with Facebook</span>
          </button> */}
          <Facebook
            logged={props.logged}
            setLogged={props.setLogged}
            setUser={props.setUser}
            setLoginOption={props.setLoginOption}
            setIsVisibleMenu={props.setIsVisibleMenu}
          />
                <Button className='closeButton' onClick={handleClose}>
        Close
      </Button>
        </form>
      )}
    </div>
  );
};

Login.propTypes = {
  loginOption: PropTypes.bool,
  setLoginOption: PropTypes.any,
  logged: PropTypes.bool,
  setLogged: PropTypes.any,
  setIsVisibleMenu: PropTypes.any,
  setIsVisibleBoat: PropTypes.any,
  setIsVisibleLineup: PropTypes.any,
  user: PropTypes.string,
  setUser: PropTypes.any,
};

export default Login;
