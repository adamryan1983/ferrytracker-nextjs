import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "@styles/Mainbar.module.scss";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import Login from "@components/Login";
import Signup from "@components/Signup";

const MainBar = (props) => {
  const [visible, setVisible] = useState(false);
  const [loginOption, setLoginOption] = useState(false);
  const [signupOption, setSignupOption] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const handleClick = () => {
    setVisible(!visible);
  };
  const handleClickLogin = () => {
    setLoginOption(!loginOption);
    setSignupOption(false);
    setVisible(false);
  };
  const handleClickSignup = () => {
    setSignupOption(!signupOption);
    setLoginOption(false);
    setVisible(false);
  };
  return (
    <>
      <div className={!visible ? styles.disclaimer : styles.disclaimerOut}>
        {loginOption && (
          <Login
            loginOption={loginOption}
            setLoginOption={setLoginOption}
            logged={props.logged}
            setLogged={props.setLogged}
            setIsVisibleMenu={props.setIsVisibleMenu}
          />
        )}
        {signupOption && (
          <Signup
            signupOption={signupOption}
            setSignupOption={setSignupOption}
            logged={props.logged}
            setLogged={props.setLogged}
            setIsVisibleMenu={props.setIsVisibleMenu}
          />
        )}
        <Button onClick={handleClick}>Close</Button>
        <div>
          Ferry/Lineup Tracker for the Bell Island-Portugal Cove Ferry Service.
        </div>
        <div>
          Note: This page is not affiliated with the Government of
          Newfoundland/Labrador.
        </div>
        <div>
          This project is built/maintained by{" "}
          <a href="https://thisisadamryan.me" className={styles.myLink}>
            Adam Ryan.{" "}
          </a>
        </div>
      </div>
      <div className={styles.MainBarNav}>
        <div className={styles.readDisclaimerButton} onClick={handleClick}>
          Read Disclaimer
        </div>

        <img
          className={styles.logo}
          src="/ferrylogo-horizontal-trans.png"
        ></img>
        <div className={styles.rightContainer}>
          <div className={styles.buttonContainer}>
            <Button onClick={handleClickLogin}>Log In</Button>
            <Button onClick={handleClickSignup}>Sign Up</Button>
          </div>
          <div
            className={
              isLogged ? styles.welcomeContainer : styles.welcomeContainerHidden
            }
          >
            Hi, user
          </div>
        </div>
      </div>
    </>
  );
};

MainBar.propTypes = {
  logged: PropTypes.bool,
  setLogged: PropTypes.any,
  setIsVisibleMenu: PropTypes.any,
};

export default MainBar;
