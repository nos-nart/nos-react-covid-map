import React from 'react';
import styles from './App.module.css';
import ReactTooltip from "react-tooltip";
import { MapChart } from './components';

function App() {
  const [content, setContent] = React.useState("");
  return (
    <div className={styles.app}>
      <p className={styles.title}>Covid19 statistic 🐛</p>
      <div className={styles.mapWrapper}>
        <MapChart
          setTooltipContent={setContent}
        />
        <ReactTooltip>{content}</ReactTooltip>
      </div>
    </div>
  );
}

export default App;
