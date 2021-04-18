import React, { useState, useRef } from 'react';
import styles from '@styles/inputSection.module.scss';

import db from '@lib/Database';

//prime react imports
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

function FlandersInput(props: any) {
  const formRef = useRef(null);
  let note, reason;
  const [tempStatus, setTempStatus] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
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
      severity: 'success',
      summary: 'Success',
      detail: 'Status Updated',
      life: 3000,
    });
    props.setReason2(reason);
    props.setStatus2(tempStatus);
    props.setNote2(note);
    note = null;
    reason = null;
    db.collection('flanders').add({
      datetime: new Date(),
      status: tempStatus,
      reason: reason,
      note: note,
    });
    formRef.current.reset();
  };
  const showFail = () => {
    props.toast.current.show({
      severity: 'error',
      summary: 'Fail',
      detail: 'Status Failed to Update',
      life: 3000,
    });
  };

  const returnBack = () => {
    props.setflandersisVisible(false);
    props.setlegionnaireisVisible(false);
    props.setradioisVisible(true);
  };

  return (
    <form ref={formRef} className={styles.boatForm}>
      <div className={styles.flandersBlock}>
        <div className={styles.dropInput}>
          <h4>Flanders Boat Status:</h4>
          <Dropdown
            value={tempStatus}
            options={props.statusSelectItems}
            onChange={handleStatusChange}
            optionLabel='label'
            placeholder='Select Boat Status'
          />
        </div>
        <div className={styles.reasonInput}>
          <label htmlFor='reasonTextBox2'>Reason: </label>
          <InputText
            id='reasonTextBox2'
            onChange={handleReasonChange}
            required
          />
        </div>
        <div className={styles.notesInput}>
          <label htmlFor='notesTextBox2'>Notes: </label>
          <InputText
            id='notesTextBox2'
            rows={2}
            cols={30}
            onChange={handleNoteChange}
            required
          />
        </div>
        <div className={styles.submitButton}>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={returnBack}>Back</Button>
        </div>
      </div>
    </form>
  );
}

export default FlandersInput;
