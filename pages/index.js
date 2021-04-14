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
  const [logged, setLogged] = useState(false);
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  return (
    <Div100vh>
      <div className={styles.container}>
        <Head>
          <title>Ferry Tracker App</title>
          <meta
            name="google-site-verification"
            content="KEPNvjZ_6TgvJY9KU6JfQ49fsjTsc5x2IT5BBBeydY4"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon-16x16.png"
          />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <StatusSection
          isVisibleMenu={isVisibleMenu}
          setIsVisibleMenu={setIsVisibleMenu}
          logged={logged}
          setLogged={setLogged}
          status1={status1}
          note1={note1}
          reason1={reason1}
          status2={status2}
          note2={note2}
          reason2={reason2}
        />
        <SelectionScreen
          isVisibleMenu={isVisibleMenu}
          setIsVisibleMenu={setIsVisibleMenu}
          logged={logged}
          setLogged={setLogged}
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
