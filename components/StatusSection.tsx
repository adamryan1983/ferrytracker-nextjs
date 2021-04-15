import React, { useState, useEffect } from "react";
import styles from "../styles/statusSection.module.scss";

import { Card } from "primereact/card";

import db from "@lib/Database";
import Mainbar from "@components/Mainbar";

import { useSpring, animated as a } from "react-spring";

const StatusSection = (props) => {
  const [statusFlanders, setStatusFlanders] = useState([]);
  const [statusLegionnaire, setStatusLegionnaire] = useState([]);
  const [statusLineup, setStatusLineup] = useState([]);
  const [isRunning, setisRunning] = useState("running");
  const [isRunning2, setisRunning2] = useState("running");
  const [boatDisplay, setBoatDisplay] = useState(true);
  const [lineupDisplay, setLineupDisplay] = useState(false);

  //spring animations
  const [on, toggle] = useState(false);
  const { transform, opacity } = useSpring({
    opacity: on ? 1 : 0,
    transform: `perspective(600px) rotateX(${on ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  });

  const legionnaireCollection = db
    .collection("legionnaire")
    .orderBy("datetime", "desc");
  const flandersCollection = db
    .collection("flanders")
    .orderBy("datetime", "desc");
  const lineupCollection = db.collection("lineup").orderBy("datetime", "desc");

  useEffect(() => {
    legionnaireCollection.onSnapshot((snap) => {
      const info: any = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatusLegionnaire(info);
      setisRunning(info[0].status);
      return () => {
        console.log("unmounted");
      };
    });
  }, []);
  useEffect(() => {
    flandersCollection.onSnapshot((snap) => {
      const info: any = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatusFlanders(info);
      setisRunning2(info[0].status);
      return () => {
        console.log("unmounted");
      };
    });
  }, []);
  useEffect(() => {
    lineupCollection.onSnapshot((snap) => {
      const info: any = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStatusLineup(info);
      return () => {
        console.log("unmounted");
      };
    });
  }, []);

  const dateConvert = (time) => {
    let d1 = new Date(time),
      hrs = d1.getHours(),
      mins = d1.getMinutes(),
      d = d1.getDate(),
      m = d1.getMonth() + 1,
      y = d1.getFullYear();

    let minsText = mins.toString();
    mins < 10 ? (minsText = "0" + mins) : null;

    let dateString = `${y}/${m}/${d}, ${hrs}:${minsText}`;
    return dateString;
  };

  const handleBoatClick = () => {
    setBoatDisplay(false);
    setLineupDisplay(true);
    toggle(!on);
  };
  const handleLineupClick = () => {
    setBoatDisplay(true);
    setLineupDisplay(false);
    toggle(!on);
  };

  return (
    <div className={styles.statusContainer}>
      <div className={styles.mainBar}>
        <Mainbar
          logged={props.logged}
          setLogged={props.setLogged}
          setIsVisibleMenu={props.setIsVisibleMenu}
        />
      </div>
      {boatDisplay && (
        <a.div
          className={styles.boatCards}
          style={{ opacity: opacity.interpolate((o) => 1 - o), transform }}
        >
          <div className={styles.boatStatusCard}>
            <div className={styles.headerLight}>
              <h2>Legionnaire</h2>
              <h3 className={styles.lineupButton} onClick={handleBoatClick}>
                Click to see Lineup info
              </h3>
              <div>
                <h3>Status:</h3>
                {isRunning === "Running" ? (
                  <img src="/running.png" className={styles.runningIcon} />
                ) : isRunning === "delayed" ? (
                  <img src="/delayed.png" className={styles.runningIcon} />
                ) : (
                  <img src="/tiedup.png" className={styles.runningIcon} />
                )}
              </div>
            </div>
            <Card className={styles.statusCard}>
              <div
                className={styles.flexContainerMobile}
                onClick={handleBoatClick}
              >
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
              <h3 className={styles.lineupButton} onClick={handleBoatClick}>
                Click to see Lineup info
              </h3>
              <div>
                <h3>Status:</h3>
                {isRunning2 === "Running" ? (
                  <img src="/running.png" className={styles.runningIcon} />
                ) : isRunning2 === "delayed" ? (
                  <img src="/delayed.png" className={styles.runningIcon} />
                ) : (
                  <img src="/tiedup.png" className={styles.runningIcon} />
                )}
              </div>
            </div>
            <Card className={styles.statusCard}>
              <div
                className={styles.flexContainerMobile}
                onClick={handleBoatClick}
              >
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
        </a.div>
      )}

      {lineupDisplay && (
        <a.div
          className={styles.boatStatusCard}
          style={{
            opacity,
            transform: transform.interpolate((t) => `${t} rotateX(180deg)`),
          }}
        >
          <div className={styles.headerLight}>
            <h2>Lineup Info</h2>
            <h3 className={styles.lineupButton} onClick={handleLineupClick}>
              Click to see Boat info
            </h3>
          </div>
          <Card className={styles.statusCard}>
            <div
              className={styles.flexContainerMobile}
              onClick={handleLineupClick}
            >
              <ul className={styles.statusHeader}>
                <li className={styles.statusSubHeader}>
                  <div>Time</div>
                  <div>Vehicles</div>
                  <div>Location</div>
                  <div>Side</div>
                </li>
                {statusLineup.map((lineupinfo) => (
                  <li key={lineupinfo.id} className={styles.dbStatusReturn}>
                    <div>{dateConvert(lineupinfo.datetime.toMillis())}</div>
                    <div>{lineupinfo.cars}</div>
                    <div>{lineupinfo.geolocation}</div>
                    <div>{lineupinfo.side}</div>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </a.div>
      )}
    </div>
  );
};

export default StatusSection;
