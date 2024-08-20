"use client"
import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    ArcElement
);

const dataBar = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Sales 2024 (K)',
            data: [33, 53, 85, 41, 44, 65],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
        },
    ],
};

const dataLine = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Revenue 2024 (K)',
            data: [33, 25, 35, 51, 54, 76],
            fill: false,
            backgroundColor: 'rgba(153, 102, 255, 0.6)',
            borderColor: 'rgba(153, 102, 255, 1)',
            tension: 0.3,
        },
    ],
};

const dataPie = {
    labels: ['Electronics', 'Fashion', 'Grocery', 'Home', 'Beauty'],
    datasets: [
        {
            label: 'Product Sales Share',
            data: [300, 50, 120, 40, 150],
            backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const options: any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Chart Example',
        },
    },
};

const options2: any = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Ini Diagram Penjualan',
        },
    },
};

export default function Charts() {
    return (
        <>
            <div className="row">
                <div className="col-xl-6">
                    <div className="row">
                        <div className="card overflow-hidden">
                            <div className="card-header border-0 pb-0 flex-wrap">
                                <Bar data={dataBar} options={options} />
                            </div>
                        </div>
                        <div className="card overflow-hidden">
                            <div className="card-header border-0 pb-0 flex-wrap">
                                <Line data={dataLine} options={options} />
                            </div>
                        </div>

                    </div>
                </div>
                <div className="col-xl-6">
                    <div className="card overflow-hidden">
                        <div className="card-header border-0 pb-0 flex-wrap">
                            <Pie data={dataPie} options={options2} />
                        </div>
                    </div>
                </div>
            </div>
        </>

    );
}
