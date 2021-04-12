import React, { useState, useRef } from "react";

import styles from "@styles/lineupSection.module.scss";
import { Toast } from "primereact/toast";

import db from "./Database";

//primereact imports
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

function LineupSection(props: any) {
  const [choice, setChoice] = useState();
  const formRef = useRef(null);
  const [location, setLocation] = useState("");
  const [carsAmt, setCarsAmt] = useState("");
  const [side, setSide] = useState("");
  const [tempStatus, setTempStatus] = useState("");

  let carAmt, geo, sideInfo;

  const handleSubmit = (e) => {
    e.preventDefault();
    tempStatus ? showSuccess() : showFail();
    setTempStatus(null);
  };

  const handleCarsChange = (event) => {
    carAmt = event.target.value;
    setCarsAmt(event.target.value);
  };
  const handleGeoChange = (event) => {
    geo = event.target.value;
    setLocation(event.target.value);
    console.log(geo);
  };
  const handleSideChange = (event) => {
    setSide(event.target.value);
    setTempStatus(event.target.value);
    setChoice(event.target.value);
  };

  const showSuccess = () => {
    props.toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Status Updated",
      life: 3000,
    });

    db.collection("lineup").add({
      datetime: new Date(),
      cars: carsAmt,
      side: side,
      geolocation: location,
    });
    setChoice(null);
    formRef.current.reset();
  };

  const showFail = () => {
    props.toast.current.show({
      severity: "error",
      summary: "Fail",
      detail: "Status Failed to Update",
      life: 3000,
    });
  };

  const handleClick = () => {
    setChoice(null);
    props.setIsVisibleMenu(true);
    props.setIsVisibleLineup(false);
  };

  return (
    <div className={styles.lineupContainer}>
      <form className={styles.formContainer} ref={formRef}>
        <div className={styles.inputContainer}>
          <div className={styles.locationSelector}>
            <div>Select Location:</div>
            <label htmlFor="lineupBellIsland" className={styles.labelRadio}>
              Bell Island
              <RadioButton
                name="lineup"
                id="lineupBellIsland"
                value="Bell Island"
                onChange={handleSideChange}
                checked={choice === "Bell Island"}
                className={styles.radioButton}
              />
            </label>
            <label htmlFor="lineupPort" className={styles.labelRadio}>
              Portugal Cove-St.Philips
              <RadioButton
                name="lineup"
                id="lineupPort"
                value="Portugal Cove-St.Philips"
                onChange={handleSideChange}
                checked={choice === "Portugal Cove-St.Philips"}
                className={styles.radioButton}
              />
            </label>
          </div>
          <div className={styles.textContainer}>
            <label htmlFor="cars" className={styles.labelText}>
              Vehicles:
              <InputText
                id="cars"
                className={styles.inputText}
                onChange={handleCarsChange}
                required
              />
            </label>
            <label htmlFor="geo" className={styles.labelText}>
              Geographic location where traffic ends:
              <InputText
                id="geo"
                className={styles.inputText}
                onChange={handleGeoChange}
                required
              />
            </label>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleClick}>Back to Main Menu</Button>
        </div>
      </form>
    </div>
  );
}

export default LineupSection;
