import React, { useState, useEffect } from 'react';
import CircleProgress from "../../ui/CircleProgress/CircleProgress.jsx";
import Thermometer from "../../ui/Thermometer/Thermometer.jsx";
import hydrometerData from './data.json';

const maxCircleProgress = 1.11;
const minCircleProgress = 0.95;
const maxTime = 100;

const calculatePercentage = (value) => {
    const range = maxCircleProgress - minCircleProgress;

    const percentage = ((value - minCircleProgress) / range) * 100;

    return Math.min(Math.max(percentage, 0), 100);
};

const Hydrometer = ({ isStart, isCalibration, isPauseExperement }) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentData, setCurrentData] = useState(hydrometerData);

    useEffect(() => {
        let interval;
        if (isStart && !isPauseExperement) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= maxTime) {
                        return 0;
                    }
                    return newTime;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isStart, isPauseExperement]);

    useEffect(() => {
        if (!isStart) {
            setCurrentTime(0);
        }
    }, [isStart]);

    return (
        <div className="columnCard">
            <div className="title">АРЕОМЕТР</div>

            <CircleProgress
                percentage={isStart ? calculatePercentage(currentData.density[currentTime].value) : 0}
                title={isStart ? `${currentData.density[currentTime].value || 0} SG` : isCalibration ? "-" : "0"}
                steps={[0.95, 0.99, 1.03, 1.07]}
            />

            <div className="thermometerWrapper">
                <div className="currentValue">
                    <div className="description">Температура на ареометре:</div>
                    <div className="textField">
                        {isStart ? `${currentData.temperature[currentTime].value || 0}°` : isCalibration ? "-" : "0"}
                    </div>
                </div>

                <Thermometer
                    steps={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                    value={isStart ? currentData.temperature[currentTime].value || 0 : 0}
                    orientation="horizontal"
                    height={278}
                />

                <div className="unit">T, C°</div>
            </div>
        </div>
    );
};

export default Hydrometer;
