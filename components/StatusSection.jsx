import React, {useState, useEffect} from 'react'
import styles from '../styles/statusSection.module.scss'

// import { useHarperDB } from 'use-harperdb';
import { Card } from 'primereact/card';
import db from './Database'

const readDB = async () => {
// const doc = db.collection('ferrystatus').doc('SF');

// const observer = doc.onSnapshot(docSnapshot => {
//   console.log(`Received doc snapshot: ${docSnapshot}`);
//   // ...
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });
const snapshot = await db.collection('ferrystatus').get();
snapshot.forEach((doc) => {
  console.log(doc.id, '=>', doc.data());
});
}

function StatusSection(props) {

  const [statusFlanders, setStatusFlanders] = useState([]);
  const [statusLegionnaire, setStatusLegionnaire] = useState([]);

  useEffect(() => {
    db
      .collection('flanders')
      .onSnapshot(snap => {
        const info = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStatusFlanders(info);
      });
  }, []);
  useEffect(() => {
    db
      .collection('legionnaire')
      .onSnapshot(snap => {
        const info = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setStatusLegionnaire(info);
      });
  }, []);

  return (
    <div className={styles.statusContainer}>
      <h1>Bell Island & Portugal Cove-St.Philips Ferry Status</h1>
      <div className={styles.boatCards}>
        <Card className={styles.statusCard}>
          <h2>Legionnaire</h2>
          <div className={styles.boatStatusCard}>
          <ul className={styles.dbStatusReturn}>
            {statusLegionnaire.map(legionnaireinfo =>
              <li key={legionnaireinfo.id}>
                <div>{legionnaireinfo.status}</div>
                <div>{legionnaireinfo.reason}</div>
                <div>{legionnaireinfo.note}</div>
              </li>
            )}
            <li> {props.status1 === "running" ? <div>Run!</div> : <div>Not Running!</div>}</li>
          </ul>
          </div>
        </Card>
        <Card className={styles.statusCard}>
          <h2>Flanders</h2>
          <div>
          <ul className={styles.dbStatusReturn}>
            {statusFlanders.map(flandersinfo =>
              <li key={flandersinfo.id}>
                <div>{flandersinfo.status}</div>
                <div>{flandersinfo.reason}</div>
                <div>{flandersinfo.note}</div>
              </li>
            )}
            <li> {props.status2 === "running" ? <div>Run!</div> : <div>Not Running!</div>}</li>
          </ul>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default StatusSection
