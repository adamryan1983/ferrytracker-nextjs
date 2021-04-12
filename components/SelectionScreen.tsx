import React, { useState, useRef } from "react";
import styles from "@styles/selectionScreen.module.scss";
import InputSection from "@components/InputSection";
import LineupSection from "@components/LineupSection";

import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

const SelectionScreen = (props) => {
  const [isVisibleMenu, setIsVisibleMenu] = useState(true);
  const [isVisibleBoat, setIsVisibleBoat] = useState(false);
  const [isVisibleLineup, setIsVisibleLineup] = useState(false);

  const toast = useRef(null);

  const handleClickLineup = () => {
    setIsVisibleMenu(false);
    setIsVisibleLineup(true);
  };
  const handleClickBoat = () => {
    setIsVisibleMenu(false);
    setIsVisibleBoat(true);
  };
  return (
    <>
      <Toast ref={toast} />
      {isVisibleMenu && (
        <div className={styles.buttonContainer}>
          <h2>Please choose an option:</h2>
          <Button className={styles.buttonChoice} onClick={handleClickLineup}>
            Update Current Lineup/Traffic
          </Button>
          <Button className={styles.buttonChoice} onClick={handleClickBoat}>
            Update Boat Status
          </Button>
        </div>
      )}

      {isVisibleBoat && (
        <InputSection
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
          setIsVisibleMenu={setIsVisibleMenu}
          setIsVisibleBoat={setIsVisibleBoat}
        />
      )}
      {isVisibleLineup && (
        <LineupSection
          setIsVisibleLineup={setIsVisibleLineup}
          setIsVisibleMenu={setIsVisibleMenu}
          toast={toast}
        />
      )}
    </>
  );
};

SelectionScreen.propTypes = {};

export default SelectionScreen;
