import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SpectrumChart = ({dataset}) => {
    const labels = Array.from({ length: 2050 }, (_, i) => (i).toFixed(0));

    const data = {
        labels: labels,
        datasets: [
            {
                data: dataset,
                borderColor: 'blue',
                backgroundColor: 'rgba(0, 0, 255, 0.1)',
                pointRadius: 1,
                pointHoverRadius: 3,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'px',
                },
            },
            y: {
                beginAtZero: true,
                max: 1,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
    };

    return (
            <Line data={data} options={options} height={350} width={630} />
    );
};

export default SpectrumChart;
