import React, {useState} from 'react'

import Head from 'next/head'
import styles from '../styles/Home.module.scss'

import InputSection from '../components/InputSection'
import StatusSection from '../components/StatusSection'

export default function Home() {
  const [status1, setStatus1] = useState('')
  const [reason1, setReason1] = useState('')
  const [note1, setNote1] = useState('')
  const [status2, setStatus2] = useState('')
  const [reason2, setReason2] = useState('')
  const [note2, setNote2] = useState('')
  return (
    <div className={styles.container}>
      <Head>
        <title>Ferry Tracker App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StatusSection 
        status={status1}
        note={note1}
        reason={reason1}
        status={status2}
        note={note2}
        reason={reason2}
      />
      <InputSection 
        status={status1} setStatus={setStatus1} 
        reason={reason1} setReason={setReason1} 
        note={note1} setNote={setNote1}
        status={status2} setStatus={setStatus2} 
        reason={reason2} setReason={setReason2} 
        note={note2} setNote={setNote2}
      />
    </div>
  )
}
