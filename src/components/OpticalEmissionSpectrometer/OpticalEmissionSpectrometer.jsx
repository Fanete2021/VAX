import React, {useEffect, useState} from 'react'
import SpectrumChart from "../../ui/SpectrumChart/SpectrumChart.jsx";
import dataGraph from './dataGraph.json';
import dataFields from './dataFields.json';
import {timerTime} from "../../constant/timerTime.js";

const maxTime1 = 13;
const maxTime2 = 99;

const OpticalEmissionSpectrometer = ({isStart, isCalibration, isPauseExperement}) => {
    const [currentTime1, setCurrentTime1] = useState(0);
    const [currentTime2, setCurrentTime2] = useState(0);

    useEffect(() => {
        let interval;
        if (isStart && !isPauseExperement) {
            interval = setInterval(() => {
                setCurrentTime1((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= maxTime1) {
                        return 0;
                    }
                    return newTime;
                });
            }, timerTime);
        }

        let interval2;
        if (isStart && !isPauseExperement) {
            interval2 = setInterval(() => {
                setCurrentTime2((prevTime) => {
                    const newTime = prevTime + 1;
                    if (newTime >= maxTime2) {
                        clearInterval(interval2);
                        return prevTime;
                    }
                    return newTime;
                });
            }, timerTime);
        }

        return () => {
            clearInterval(interval);
            clearInterval(interval2);
        }
    }, [isStart, isPauseExperement]);

    useEffect(() => {
        if (!isStart) {
            setCurrentTime1(0);
            setCurrentTime2(0);
        }
    }, [isStart]);

    return (
        <div className="OpticalEmissionSpectrometer">
            <div className="columnCard">
                <div className="title">
                    ОПТИЧЕСКЙ ЭМИССИОННЫЙ СПЕКТРОМЕТР
                </div>

                <div className="rowWrapper">
                    <div className="values">
                        <div className="currentValue">
                            <div className="description">
                                подынтегральная интенсивность спектральных линий
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                K - 766 нм
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime2].K || 0).toFixed(3)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Al - 396 нм
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime2].Al || 0).toFixed(3)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Al - 309 нм
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime2].Al2 || 0).toFixed(3)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Na - 588 нм
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime2].Na || 0).toFixed(3)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                aH - 486 нм
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime2].aH || 0).toFixed(3)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                bH - 656 нм
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime2].bH || 0).toFixed(3)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '630px', height: '350px' }}>
                        {isCalibration
                            ? <div className="empty">-</div>
                            : <SpectrumChart
                                dataset={isStart ? dataGraph.graph[currentTime1] : []}
                            />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpticalEmissionSpectrometer;
