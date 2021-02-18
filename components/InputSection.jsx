import React, {useState, createRef, useRef} from 'react'
import styles from '../styles/Home.module.scss'

//prime react imports
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import 'primereact/resources/themes/mdc-light-deeppurple/theme.css';
import 'primereact/resources/primereact.css';
import PrimeReact from 'primereact/api';
import { Toast } from 'primereact/toast';

PrimeReact.ripple = true;

const statusSelectItems = [
  {label: 'Running', value: 'rn'},
  {label: 'Delayed', value: 'dly'},
  {label: 'Tied Up Weather', value: 'tuw'},
  {label: 'Tied Up Mechanical', value: 'tum'}
];


function InputSection(props) {

  const [tempStatus, setTempStatus] = useState()
  const toast = useRef(null);
  let reason, note;

  const showSuccess = () => {
    toast.current.show({severity:'success', summary: 'Success', detail:'Status Updated', life: 3000});
    props.setReason(reason);
    props.setStatus(tempStatus);
    props.setNote(note);
    document.querySelector("#notesTextBox").value = ""
    document.querySelector("#reasonTextBox").value = ""
}
  const showFail = () => {
    toast.current.show({severity:'error', summary: 'Fail', detail:'Status Failed to Update', life: 3000});
}

  const handleStatusChange = (event) => {
    setTempStatus(event.target.value)
    status = event.target.value;
    // props.setStatus(event.target.value);
  };
  const handleReasonChange = (event) => {
    reason = event.target.value
    // props.setReason(event.target.value);
  };
  const handleNoteChange = (event) => {
    note = event.target.value
    // props.setNote(event.target.value);
  };

  const handleSubmit = () => {

    tempStatus ? showSuccess() : showFail();
    setTempStatus(null)
  }
  
  return (
    <div className={styles.inputContainer}>
      <Toast ref={toast} />
      <div className={styles.dropInput}>
        Boat Status: 
        <Dropdown value={tempStatus} options={statusSelectItems} onChange={handleStatusChange} optionLabel="label" placeholder="Select Boat Status"/>
      </div>
      <div className={styles.reasonInput}>
          <label htmlFor="reasonTextBox">Reason: </label>
          <InputText id="reasonTextBox" onChange={handleReasonChange} required/>

      </div>
      <div className={styles.notesInput}>
          <label htmlFor="notesTextBox">Notes: </label>
          <InputTextarea id="notesTextBox" rows={5} cols={30} onChange={handleNoteChange} required/>

      </div>
      <div className={styles.submitButton}>

          <Button onClick={ handleSubmit }>
            Submit
          </Button>      

      </div>
    </div>
  )
}

export default InputSection
