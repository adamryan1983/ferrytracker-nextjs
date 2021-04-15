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
  const [errorReturn, setErrorReturn] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleForm = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        if (res.user) props.setLogged(true);
      })
      .catch((e) => {
        console.log(e.message);
        handleIncorrectLogin(e.message);
      });
  };

  const handleClickIn = async (userEmail) => {
    await setEmail(userEmail);
    await setErrorMsg("");
    await setErrorReturn(false);
    await props.setLogged(true);
    await props.setIsVisibleMenu(true);
    props.setSignupOption(false);
  };
  const handleClose = () => {
    props.setSignupOption(false);
  };

  const handleIncorrectLogin = (error) => {
    setErrorMsg(error);
    setErrorReturn(true);
  };

  const handleClickOut = () => {
    props.setIsVisibleMenu(false);
    props.setSignupOption(false);
    props.setLogged(false);
  };

  const googleProvider = new firebase.auth.GoogleAuthProvider();

  const handleGoogle = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((res) => {
        console.log(res.user.email);
        if (res.user.emailVerified) handleClickIn(res.user.email);
      })
      .catch((error) => {
        console.log(error.message);
        handleIncorrectLogin(error.message);
      });
  };

  return (
    <div className={styles.mainContainer}>
      <img className={styles.logo} src="/ferrylogo-horizontal-trans.png" />
      <h1>Sign Up Now</h1>
      <div>
        Welcome to IsSheRunnin'! This app is designed for tracking ferry and
        traffic updates.
      </div>
      <div>Users must be signed up/signed in to add updates.</div>
      <Button className="closeButton" onClick={handleClose}>
        Close
      </Button>
      {errorReturn && (
        <div style={{ color: "red" }}>There was an error on signup/sign in</div>
      )}
      {props.logged ? (
        <>
          <div>You are already logged in</div>
          <Button onClick={handleClickOut}>Log Out</Button>
        </>
      ) : (
        <form>
          <h3>Sign Up Now</h3>
          <div className={styles.signInput}>
            <label htmlFor="username">Username/email:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={email}
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <button className="login-provider-button" onClick={handleGoogle}>
            <img
              src="https://img.icons8.com/ios-filled/50/000000/google-logo.png"
              alt="google icon"
            />
            <span> Continue with Google</span>
          </button>
          <button onClick={handleForm}>Sign Up</button>
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
  signupOption: PropTypes.bool,
  setSignupOption: PropTypes.any,
};

export default Login;
