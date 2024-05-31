import React from 'react';
import BarChart from './component/BarChart';
import PieChart from './component/PieChart';
import LineChart from './component/LineChart';
import styles from './Dashboard.module.css';

const Dashboard: React.FC = () => {
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <div className={styles.chartsContainer}>
        <div className={styles.chart}>
          <BarChart />
        </div>
        <div className={styles.chart}>
          <PieChart />
        </div>
        <div className={styles.chartFullWidth}>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
