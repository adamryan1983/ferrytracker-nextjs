import React, { useState, useRef } from "react";
import styles from "@styles/inputSection.module.scss";

import db from "./Database";

//prime react imports
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "primereact/resources/themes/mdc-light-deeppurple/theme.css";
import "primereact/resources/primereact.css";

function LegionnaireInput(props) {
  const formRef = useRef(null);
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

  const returnBack = () => {
    props.setflandersisVisible(false);
    props.setlegionnaireisVisible(false);
    props.setradioisVisible(true);
  };

  const showSuccess = () => {
    props.toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Status Updated",
      life: 3000,
    });
    props.setReason1(reason);
    props.setStatus1(tempStatus);
    props.setNote1(note);
    db.collection("legionnaire").add({
      datetime: new Date(),
      status: tempStatus,
      reason: reason,
      note: note,
    });
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

  return (
    <form ref={formRef}>
      <div className={styles.legionnaireBlock}>
        <div className={styles.dropInput}>
          <h4>Legionnaire Boat Status:</h4>
          <Dropdown
            value={tempStatus}
            options={props.statusSelectItems}
            onChange={handleStatusChange}
            optionLabel="label"
            placeholder="Select Boat Status"
          />
        </div>
        <div className={styles.reasonInput}>
          <label htmlFor="reasonTextBox1">Reason: </label>
          <InputText id="reasonTextBox1" onChange={handleReasonChange} required />
        </div>
        <div className={styles.notesInput}>
          <label htmlFor="notesTextBox1">Notes: </label>
          <InputTextarea
            id="notesTextBox1"
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
    </form>
  );
}

export default LegionnaireInput;
