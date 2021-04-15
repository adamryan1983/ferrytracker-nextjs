import React from "react";
import PropTypes from "prop-types";
import styles from "@styles/NotSigned.module.scss";

const NotSigned = (props) => {
  return (
    <div className={styles.mainContainer}>
      Sorry you are not signed in. Sign in to input data.
    </div>
  );
};

NotSigned.propTypes = {};

export default NotSigned;
