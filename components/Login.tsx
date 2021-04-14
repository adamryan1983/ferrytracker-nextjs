import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Button } from "primereact/button";
import styles from "@styles/Login.module.scss";
import firebase from "firebase/app";
import firebaseConfig from "@lib/firebaseAuthConfig";

// import {signInWithGoogle} from "@lib/Auth";

const Login = (props) => {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [uid, setUid] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const handleForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        console.log(res);
        if (res.user) handleClickIn;
      })
      .catch((e) => {
        console.log(e.message);
        alert(e.message);
      });
  };

  const handleClickIn = () => {
    props.setLogged(true),
      props.setIsVisibleMenu(true),
      props.setLoginOption(false);

    props.setIsVisibleMenu(true), props.setLoginOption(false);
  };
  const handleClickOut = () => {
    props.setIsVisibleMenu(false);
    props.setLoginOption(false);
    props.setLogged(false);
  };
  const handleClose = () => {
    props.setLoginOption(false);
  };

  const handleChangeUser = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePw = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className={styles.mainContainer}>
      <Button className="closeButton" onClick={handleClose}>
        Close
      </Button>
      <img className={styles.logo} src="/ferrylogo-horizontal-trans.png" />
      {props.logged ? (
        <>
          <div>You are already logged in</div>
          <Button onClick={handleClickOut}>Log Out</Button>
        </>
      ) : (
        <form>
          <h3>Please Sign In</h3>

          <div className={styles.signInput}>
            <label htmlFor="username">Username/email:</label>
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChangeUser}
              value={email}
              placeholder="email"
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="login-provider-button" onClick={handleForm}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
              alt="google icon"
            />
            <span> Continue with Google</span>
          </button>
          <Button onClick={handleForm}>Login Now</Button>
          <Button onClick={handleClickOut}>Log Out</Button>
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
};

export default Login;
