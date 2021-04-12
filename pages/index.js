import React, { useState } from "react";

import Head from "next/head";
import styles from "@styles/Home.module.scss";
import Div100vh from "react-div-100vh";

import StatusSection from "@components/StatusSection";
import SelectionScreen from "@components/SelectionScreen";

export default function Home() {
  const [status1, setStatus1] = useState("");
  const [reason1, setReason1] = useState("");
  const [note1, setNote1] = useState("");
  const [status2, setStatus2] = useState("");
  const [reason2, setReason2] = useState("");
  const [note2, setNote2] = useState("");
  return (
    <Div100vh>
      <div className={styles.container}>
        <Head>
          <title>Ferry Tracker App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StatusSection
          status1={status1}
          note1={note1}
          reason1={reason1}
          status2={status2}
          note2={note2}
          reason2={reason2}
        />
        <SelectionScreen
          status1={status1}
          setStatus1={setStatus1}
          reason1={reason1}
          setReason1={setReason1}
          note1={note1}
          setNote1={setNote1}
          status2={status2}
          setStatus2={setStatus2}
          reason2={reason2}
          setReason2={setReason2}
          note2={note2}
          setNote2={setNote2}
        />
      </div>
    </Div100vh>
  );
}
