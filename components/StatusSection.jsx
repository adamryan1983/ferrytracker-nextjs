import React from 'react'
import styles from '../styles/Home.module.scss'

import { Card } from 'primereact/card';

function StatusSection(props) {
  return (
    <div className={styles.statusContainer}>
      <h1>Bell Island & Portugal Cove-St.Philips Ferry Status</h1>
      <div className={styles.boatCards}>
        <Card className={styles.statusCard}>
          <h2>Legionnaire</h2>
          <ul>
            <li>{props.status1}</li>
            <li>{props.reason1}</li>
            <li>{props.note1}</li>
            <li> {props.status1 === "running" ? <div>Run!</div> : <div>Not running!</div>}</li>
          </ul>
        </Card>
        <Card className={styles.statusCard}>
          <h2>Flanders</h2>
          <ul>
            <li>{props.status2}</li>
            <li>{props.reason2}</li>
            <li>{props.note2}</li>
            <li> {props.status2 === "running" ? <div>Run!</div> : <div>Not Running!</div>}</li>
          </ul>
        </Card>
      </div>
      
    </div>
  )
}

export default StatusSection
