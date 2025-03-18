import React, {useEffect, useState} from 'react';
import Thermometer from "../../ui/Thermometer/Thermometer.jsx";
import PHMeterData from './data.json';

const maxTime = 100;

const PHMeter = ({isStart, isCalibration, isPauseExperement}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentData, setCurrentData] = useState(PHMeterData);

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
                pH - МЕТР
            </div>

            <div className="rowWrapper">
                <div className="row">
                    <div className="unit">
                        pH
                    </div>

                    <div className="textField">
                        {isStart ? `${currentData.pH[currentTime].value || 0}` : isCalibration ? "-" : "0"}
                    </div>

                    <div className="thermometerWrapper">
                        <Thermometer
                            steps={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]}
                            value={isStart ? currentData.pH[currentTime].value || 0 : 0}
                            orientation="vertical"
                            height={278}
                        />

                        <div className="unit">
                            pH
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className="unit">
                        T, C°
                    </div>

                    <div className="textField">
                        {isStart ? `${currentData.temperature[currentTime].value || 0}°` : isCalibration ? "-" : "0"}
                    </div>

                    <div className="thermometerWrapper">
                        <Thermometer
                            steps={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
                            value={isStart ? currentData.temperature[currentTime].value || 0 : 0}
                            orientation="vertical"
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

export default PHMeter;
