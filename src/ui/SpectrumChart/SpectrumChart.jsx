import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SpectrumChart = () => {
    // const generateData = () => {
    //     const data = [];
    //     for (let i = 0; i < 1000; i++) {
    //         const wavelength = 400 + (i * 0.4);
    //         let intensity = Math.random() * 0.1;
    //
    //         if (wavelength >= 480 && wavelength <= 490) {
    //             intensity += Math.random() * 0.5 + 0.5;
    //         }
    //         if (wavelength >= 580 && wavelength <= 590) {
    //             intensity += Math.random() * 0.3 + 0.2;
    //         }
    //         if (wavelength >= 650 && wavelength <= 660) {
    //             intensity += Math.random() * 0.7 + 0.3;
    //         }
    //         if (wavelength >= 760 && wavelength <= 770) {
    //             intensity += Math.random() * 0.4 + 0.1;
    //         }
    //
    //         data.push(intensity);
    //     }
    //     return data;
    // };

    // const labels = Array.from({ length: 1000 }, (_, i) => (400 + (i * 0.4)).toFixed(1)); // Длины волн от 400 до 800 нм

    const data = {
        labels: [],
        datasets: [
            {
                data: [],
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
                    text: 'НМ',
                },
            },
            y: {
                beginAtZero: true,
                max: 1.0,
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
