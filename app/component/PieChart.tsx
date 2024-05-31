"use client"
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js/auto';

const PieChart: React.FC = () => {
  const data: ChartData<'pie'> = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Votes',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        data: [300, 50, 100]
      }
    ]
  };

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Distribution of Votes',
        font: {
          size: 20
        }
      },
      legend: {
        display: true,
        position: 'right'
      }
    }
  };

  return (
    <div>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart;
