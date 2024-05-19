import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the required components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const ChartComponent = ({ records }) => {
    const data = {
        labels: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'],
        datasets: [
            {
                label: 'Record Type Distribution',
                data: records.reduce((acc, record) => {
                    const typeIndex = acc.labels.indexOf(record.type);
                    if (typeIndex > -1) {
                        acc.data[typeIndex]++;
                    }
                    return acc;
                }, { labels: ['A', 'AAAA', 'CNAME', 'MX', 'NS', 'PTR', 'SOA', 'SRV', 'TXT', 'DNSSEC'], data: Array(10).fill(0) }).data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'DNS Records Distribution',
            },
        },
    };

    return <Bar data={data} options={options} />;
};

export default ChartComponent;
