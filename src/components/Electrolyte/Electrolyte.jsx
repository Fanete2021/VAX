import React, {useEffect, useState} from 'react';
import Thermometer from "../../ui/Thermometer/Thermometer.jsx";
import electrolyteData from './data.json';
import {timerTime} from "../../constant/timerTime.js";

const maxTime = 100;

const Electrolyte = ({isStart, isCalibration, isPauseExperement}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentData, setCurrentData] = useState(electrolyteData);

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
            }, timerTime);
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
                Электролит
            </div>

            <div className="colWrapper">
                <div className="col">
                    <div className="currentValue">
                        <div className="description">
                            Температура в верхней части ванны:
                        </div>

                        <div className="textField">
                            {isStart ? `${currentData.upperBathTemperature[currentTime].value || 0}°` : isCalibration ? "-" : "0"}
                        </div>
                    </div>

                    <div className="thermometerWrapper">
                        <Thermometer
                            steps={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                            value={isStart ? currentData.upperBathTemperature[currentTime].value || 0 : 0}
                            orientation="horizontal"
                            height={278}
                        />

                        <div className="unit">
                            T, C°
                        </div>
                    </div>
                </div>

                <div className="col">
                    <div className="currentValue">
                        <div className="description">
                            Температура в нижней части ванны:
                        </div>

                        <div className="textField">
                            {isStart ? `${currentData.lowerBathTemperature[currentTime].value || 0}°` : isCalibration ? "-" : "0"}
                        </div>
                    </div>

                    <div className="thermometerWrapper">
                        <Thermometer
                            steps={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                            value={isStart ? currentData.lowerBathTemperature[currentTime].value || 0 : 0}
                            orientation="horizontal"
                            height={278}
                        />

                        <div className="unit">
                            T, C°
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Electrolyte;
