import React, { useState, useEffect } from "react";
import styles from "../styles/statusSection.module.scss";

// import { useHarperDB } from 'use-harperdb';
import { Card } from "primereact/card";
import db from "./Database";

function StatusSection(props) {
  const [statusFlanders, setStatusFlanders] = useState([]);
  const [statusLegionnaire, setStatusLegionnaire] = useState([]);
  const [isRunning, setisRunning] = useState("running");
  const [isRunning2, setisRunning2] = useState("running");
  const legionnaireCollection = db
    .collection("legionnaire")
    .orderBy("datetime", "desc");
  const flandersCollection = db
    .collection("flanders")
    .orderBy("datetime", "desc");

  useEffect(() => {
    legionnaireCollection.onSnapshot((snap) => {
      const info = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatusLegionnaire(info);
      setisRunning(info[0].status);
    });
  }, []);
  useEffect(() => {
    flandersCollection.onSnapshot((snap) => {
      const info = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatusFlanders(info);
      setisRunning2(info[0].status);
    });
  }, []);

  const dateConvert = (time) => {
    let d1 = new Date(time),
      hrs = d1.getHours(),
      mins = d1.getMinutes(),
      d = d1.getDate(),
      m = d1.getMonth() + 1,
      y = d1.getFullYear();

    mins < 10 ? (mins = "0" + mins) : (mins = mins);

    let dateString = `${y}/${m}/${d}, ${hrs}:${mins}`;
    return dateString;
  };

  return (
    <div className={styles.statusContainer}>
      <img className={styles.logo} src="/ferrylogo-horizontal-trans.png"></img>
      <div className={styles.boatCards}>
        <div className={styles.boatStatusCard}>
          <div className={styles.headerLight}>
            <h2>Legionnaire</h2>
            <div>
              <h3>Status:</h3>
              {isRunning === "Running" ? (
                <img src="/running.png" />
              ) : isRunning === "delayed" ? (
                <img src="/delayed.png" />
              ) : (
                <img src="/tiedup.png" />
              )}
            </div>
          </div>
          <Card className={styles.statusCard}>
            <div className={styles.flexContainerMobile}>
              <ul className={styles.statusHeader}>
                <li className={styles.statusSubHeader}>
                  <div>Time</div>
                  <div>Status</div>
                  <div>Reason</div>
                  <div>Note</div>
                </li>
                {statusLegionnaire.map((legionnaireinfo) => (
                  <li
                    key={legionnaireinfo.id}
                    className={styles.dbStatusReturn}
                  >
                    <div>
                      {dateConvert(legionnaireinfo.datetime.toMillis())}
                    </div>
                    <div>{legionnaireinfo.status}</div>
                    <div>{legionnaireinfo.reason}</div>
                    <div>{legionnaireinfo.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        <div className={styles.boatStatusCard}>
          <div className={styles.headerLight}>
            <h2>Flanders</h2>
            <div>
              <h3>Status:</h3>
              {isRunning2 === "Running" ? (
                <img src="/running.png" />
              ) : isRunning2 === "delayed" ? (
                <img src="/delayed.png" />
              ) : (
                <img src="/tiedup.png" />
              )}
            </div>
          </div>
          <Card className={styles.statusCard}>
            <div className={styles.flexContainerMobile}>
              <ul className={styles.statusHeader}>
                <li className={styles.statusSubHeader}>
                  <div>Time</div>
                  <div>Status</div>
                  <div>Reason</div>
                  <div>Note</div>
                </li>
                {statusFlanders.map((flandersinfo) => (
                  <li key={flandersinfo.id} className={styles.dbStatusReturn}>
                    <div>{dateConvert(flandersinfo.datetime.toMillis())}</div>
                    <div>{flandersinfo.status}</div>
                    <div>{flandersinfo.reason}</div>
                    <div>{flandersinfo.note}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StatusSection;
