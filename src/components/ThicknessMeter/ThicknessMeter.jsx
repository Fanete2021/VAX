import React, {useEffect, useState} from 'react';
import thicknessMeterData from "./data.json";

const maxTime = 100;

const ThicknessMeter = ({isStart, isCalibration, isPauseExperement}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentData, setCurrentData] = useState(thicknessMeterData);

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
            }, 60000);
        }

        return () => clearInterval(interval);
    }, [isStart, isPauseExperement]);

    useEffect(() => {
        if (!isStart) {
            setCurrentTime(0);
        }
    }, [isStart]);

    return (
        <div className="ThicknessMeter columnCard">
            <div className="title">
                ТОЛЩИНОМЕР
            </div>

            <div className="currentValue">
                <div className="description">
                    Толщина покрытия (мкм):
                </div>

                <div className="textField">
                    {/*{isStart ? `${currentData.thicknessGrowth[currentTime].value || 0}` : isCalibration ? "-" : "0"}*/}
                    -
                </div>
            </div>
        </div>
    );
};

export default ThicknessMeter;
