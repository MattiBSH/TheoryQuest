"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ControlQuestion from "./components/controlQuestion";

export default function Home() {
  const [controlGame, setControlGame] = useState(false);
 
  return (
    <div className={styles.centerBox}>
      <h1 className={styles.title}>Kontrol spørgsmål</h1>
        {controlGame ? <ControlQuestion /> :
          <button className={styles.startButton} onClick={()=>setControlGame(true)}>
          Start prøven
          </button>          
        }
    </div>
  );
}
