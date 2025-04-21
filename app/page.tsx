"use client";

import { useState } from "react";
import styles from "./page.module.css";
import ControlQuestion from "./components/controlQuestion";

export default function Home() {
  const [controlGame, setControlGame] = useState(false);
 
  return (
    <div className={styles.centerBox}>
      <div className={styles.header}>
      <h1 className={styles.title}>Kontrol spørgsmål</h1></div>
        {controlGame ? <ControlQuestion /> :
        <div className="centerBox">
          <button className={styles.startButton} onClick={()=>setControlGame(true)}>
          Start prøven
          </button>          
          </div>
        }
    </div>
  );
}
