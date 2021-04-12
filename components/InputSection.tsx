import React, { useState } from "react";
import styles from "@styles/inputSection.module.scss";

//prime react imports
import PrimeReact from "primereact/api";
import LegionnaireInput from "./LegionnaireInput";
import FlandersInput from "./FlandersInput";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";

PrimeReact.ripple = true;

const statusSelectItems = [
  { label: "Running", value: "Running" },
  { label: "Delayed", value: "delayed" },
  { label: "Tied Up Weather", value: "Tied Up(Weather)" },
  { label: "Tied Up Mechanical", value: "Tied Up(Mechanical)" },
];

function InputSection(props) {
  const [boatSelect, setboatSelect] = useState("");
  const [legionnaireisVisible, setlegionnaireisVisible] = useState(false);
  const [flandersisVisible, setflandersisVisible] = useState(false);
  const [radioisVisible, setradioisVisible] = useState(true);

  const handleBoatClick1 = () => {
    setboatSelect("Legionnaire");
    setradioisVisible(false);
    setflandersisVisible(false);
    setlegionnaireisVisible(true);
  };
  const handleBoatClick2 = (event) => {
    setboatSelect("Flanders");
    setradioisVisible(false);
    setlegionnaireisVisible(false);
    setflandersisVisible(true);
  };
  const handleClick = () => {
    props.setIsVisibleMenu(true);
    props.setIsVisibleBoat(false);
  };

  return (
    <div className={styles.inputContainer}>
      {radioisVisible && (
        <div className={styles.controlContainer}>
          <div className={styles.radioBoat}>
            Select a boat:
            <div className={styles.ferryRadio}>
              <RadioButton
                inputId="boat1"
                name="boat"
                value="Legionnaire"
                onChange={handleBoatClick1}
                // checked={boatSelect === "Legionnaire"}
                disabled
              />
              <label htmlFor="boat1">Legionnaire (currently in Fogo)</label>
            </div>
            <div className={styles.ferryRadio}>
              <RadioButton
                inputId="boat2"
                name="boat"
                value="Flanders"
                onChange={handleBoatClick2}
                checked={boatSelect === "Flanders"}
              />
              <label htmlFor="boat2">Flanders</label>
            </div>
          </div>
          <div>
            <Button className={styles.buttonBack} onClick={handleClick}>
              Back
            </Button>
          </div>
        </div>
      )}
      <div className={styles.boatBlock}>
        {legionnaireisVisible && (
          <LegionnaireInput
            toast={props.toast}
            statusSelectItems={statusSelectItems}
            setStatus1={props.setStatus1}
            setReason1={props.setReason1}
            setNote1={props.setNote1}
            setlegionnaireisVisible={setlegionnaireisVisible}
            setflandersisVisible={setflandersisVisible}
            setradioisVisible={setradioisVisible}
          />
        )}
        {flandersisVisible && (
          <FlandersInput
            toast={props.toast}
            statusSelectItems={statusSelectItems}
            setStatus2={props.setStatus2}
            setReason2={props.setReason2}
            setNote2={props.setNote2}
            setlegionnaireisVisible={setlegionnaireisVisible}
            setflandersisVisible={setflandersisVisible}
            setradioisVisible={setradioisVisible}
          />
        )}
      </div>
    </div>
  );
}

export default InputSection;
