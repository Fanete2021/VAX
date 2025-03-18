import React from 'react';

const CircleProgress = ({ percentage, title, steps }) => {
    const radius = 110;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div style={{ textAlign: 'center' }}>
            <svg width="340" height="310" viewBox="0 0 340 310">
                <circle
                    cx="170"
                    cy="155"
                    r={radius}
                    fill="none"
                    stroke="#000"
                    strokeWidth="30"
                />

                <circle
                    cx="170"
                    cy="155"
                    r={radius}
                    fill="none"
                    stroke="#e0e0e0"
                    strokeWidth="26"
                />

                <circle
                    cx="170"
                    cy="155"
                    r={radius}
                    fill="none"
                    stroke="#4F81BD"
                    strokeWidth="26"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 170 155)"
                />

                <line x1="170" y1="30" x2="170" y2="60" stroke="#000" strokeWidth="1" />
                <line x1="170" y1="250" x2="170" y2="280" stroke="#000" strokeWidth="1" />
                <line x1="45" y1="155" x2="75" y2="155" stroke="#000" strokeWidth="1" />
                <line x1="265" y1="155" x2="295" y2="155" stroke="#000" strokeWidth="1" />

                <text x="170" y="20" textAnchor="middle" fill="#000" fontSize="12">{steps[0]}</text>
                <text x="325" y="160" textAnchor="end" fill="#000" fontSize="12">{steps[1]}</text>
                <text x="170" y="300" textAnchor="middle" fill="#000" fontSize="12">{steps[2]}</text>
                <text x="10" y="160" textAnchor="start" fill="#000" fontSize="12">{steps[3]}</text>

                <text x="170" y="160" textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="16" fontWeight="bold">
                    {title}
                </text>
            </svg>
        </div>
    );
};

export default CircleProgress;
