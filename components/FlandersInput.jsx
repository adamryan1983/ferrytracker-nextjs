import React, { useState } from "react";
import styles from "../styles/inputSection.module.scss";

import db from "./Database";

//prime react imports
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
import "primereact/resources/primereact.css";

function FlandersInput(props) {
  let note, reason;
  const [tempStatus, setTempStatus] = useState();

  const handleSubmit = () => {
    tempStatus ? showSuccess() : showFail();
    setTempStatus(null);
  };

  const handleStatusChange = (event) => {
    setTempStatus(event.target.value);
  };
  const handleReasonChange = (event) => {
    reason = event.target.value;
  };
  const handleNoteChange = (event) => {
    note = event.target.value;
  };

  const showSuccess = () => {
    props.toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Status Updated",
      life: 3000,
    });
    props.setReason2(reason);
    props.setStatus2(tempStatus);
    props.setNote2(note);
    db.collection("flanders").add({
      datetime: new Date(),
      status: tempStatus,
      reason: reason,
      note: note,
    });
    document.querySelector("#notesTextBox2").value = "";
    document.querySelector("#reasonTextBox2").value = "";
  };
  const showFail = () => {
    props.toast.current.show({
      severity: "error",
      summary: "Fail",
      detail: "Status Failed to Update",
      life: 3000,
    });
  };

  const returnBack = () => {
    props.setflandersisVisible(false);
    props.setlegionnaireisVisible(false);
    props.setradioisVisible(true);
  };

  return (
    <div className={styles.flandersBlock}>
      <div className={styles.dropInput}>
        Flanders Boat Status:
        <Dropdown
          value={tempStatus}
          options={props.statusSelectItems}
          onChange={handleStatusChange}
          optionLabel="label"
          placeholder="Select Boat Status"
        />
      </div>
      <div className={styles.reasonInput}>
        <label htmlFor="reasonTextBox2">Reason: </label>
        <InputText id="reasonTextBox2" onChange={handleReasonChange} required />
      </div>
      <div className={styles.notesInput}>
        <label htmlFor="notesTextBox2">Notes: </label>
        <InputTextarea
          id="notesTextBox2"
          rows={2}
          cols={30}
          onChange={handleNoteChange}
          required
        />
      </div>
      <div className={styles.submitButton}>
        <Button onClick={handleSubmit}>Submit</Button>
        <Button onClick={returnBack} style={{ backgroundColor: "red" }}>
          Back
        </Button>
      </div>
    </div>
  );
}

export default FlandersInput;
