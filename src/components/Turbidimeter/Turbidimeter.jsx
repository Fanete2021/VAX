import React, {useEffect, useState} from 'react';
import CircleProgress from "../../ui/CircleProgress/CircleProgress.jsx";
import Thermometer from "../../ui/Thermometer/Thermometer.jsx";
import turbidimeterData from './data.json';

const maxCircleProgress = 2000;
const minCircleProgress = 0;
const maxTime = 100;

const calculatePercentage = (value) => {
    const range = maxCircleProgress - minCircleProgress;

    const percentage = ((value - minCircleProgress) / range) * 100;

    return Math.min(Math.max(percentage, 0), 100);
};

const Turbidimeter = ({isStart, isCalibration, isPauseExperement}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentData, setCurrentData] = useState(turbidimeterData);

    useEffect(() => {
        let interval;
        if (isStart && !isPauseExperement) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= maxTime) {
                        clearInterval(interval);
                        return prevTime;
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
            <div className="title">
                МУТНОМЕР
            </div>

            <CircleProgress
                percentage={isStart ? calculatePercentage(currentData.turbidity[currentTime].value) : 0}
                title={isStart ? `${currentData.turbidity[currentTime].value || 0} NTU` : isCalibration ? "-" : "0"}
                steps={[0, 500, 1000, 1500]}
            />

            <div className="thermometerWrapper">
                <div className="currentValue">
                    <div className="description">
                        Температура на мутнометре:
                    </div>

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

                <div className="unit">
                    T, C°
                </div>
            </div>
        </div>
    );
};

export default Turbidimeter;
