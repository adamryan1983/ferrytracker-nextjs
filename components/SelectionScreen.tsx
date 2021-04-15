import React, { useState, useRef } from "react";
import styles from "@styles/selectionScreen.module.scss";
import InputSection from "@components/InputSection";
import LineupSection from "@components/LineupSection";
import NotSigned from "@components/NotSigned";

import { useSpring, animated as a } from "react-spring";

import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const SelectionScreen = (props) => {
  const [isVisibleBoat, setIsVisibleBoat] = useState(false);
  const [isVisibleLineup, setIsVisibleLineup] = useState(false);

  const toast = useRef(null);

  //spring animations
  const [on, toggle] = useState(false);
  const animation = useSpring({
    opacity: on ? 0 : 1,
  });
  const animation2 = useSpring({
    opacity: on ? 1 : 0,
  });

  const handleClickLineup = () => {
    toggle(!on);
    props.setIsVisibleMenu(false);
    setIsVisibleLineup(true);
  };
  const handleClickBoat = () => {
    toggle(!on);
    props.setIsVisibleMenu(false);
    setIsVisibleBoat(true);
  };
  return (
    <>
      {!props.logged && <NotSigned />}
      <Toast ref={toast} />
      {props.isVisibleMenu && (
        <a.div className={styles.buttonContainer} style={animation}>
          <h2>Please choose an option:</h2>
          <Button className={styles.buttonChoice} onClick={handleClickLineup}>
            Update Current Lineup/Traffic
          </Button>
          <Button className={styles.buttonChoice} onClick={handleClickBoat}>
            Update Boat Status
          </Button>
        </a.div>
      )}
      {isVisibleBoat && (
        <a.div style={animation2}>
          <InputSection
            logged={props.logged}
            status1={props.status1}
            setStatus1={props.setStatus1}
            reason1={props.reason1}
            setReason1={props.setReason1}
            note1={props.note1}
            setNote1={props.setNote1}
            status2={props.status2}
            setStatus2={props.setStatus2}
            reason2={props.reason2}
            setReason2={props.setReason2}
            note2={props.note2}
            setNote2={props.setNote2}
            toast={toast}
            setIsVisibleMenu={props.setIsVisibleMenu}
            setIsVisibleBoat={setIsVisibleBoat}
            toggle={toggle}
            on={on}
          />
        </a.div>
      )}
      {isVisibleLineup && (
        <a.div style={animation2}>
          <LineupSection
            setIsVisibleLineup={setIsVisibleLineup}
            setIsVisibleMenu={props.setIsVisibleMenu}
            toast={toast}
            toggle={toggle}
            on={on}
          />
        </a.div>
      )}
    </>
  );
};

SelectionScreen.propTypes = {};

export default SelectionScreen;
