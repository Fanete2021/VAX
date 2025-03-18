import React, {useEffect, useState} from 'react';
import VAXChart from "../../ui/VAXChart/VAXChart.jsx";
import dataGraphs from "./dataGraph.json";
import dataFields from './dataFields.json';

const maxTime = 804;

const CurrentVoltageCharacteristic = ({isStart, isCalibration, isPauseExperement}) => {
    const [currentTime, setCurrentTime] = useState(0);
    const [currentData1, setCurrentData1] = useState([]);
    const [currentData2, setCurrentData2] = useState([]);

    useEffect(() => {
        let interval;
        if (isStart && !isPauseExperement) {
            interval = setInterval(() => {
                setCurrentTime((prevTime) => {
                    if (prevTime < maxTime / 2) {
                        setCurrentData1(prev => [
                            ...prev,
                            {
                                voltage: dataGraphs.data[prevTime].x,
                                current: dataGraphs.data[prevTime].y,
                            }
                        ]);
                    } else {
                        setCurrentData2(prev => [
                            ...prev,
                            {
                                voltage: dataGraphs.data[prevTime].x,
                                current: dataGraphs.data[prevTime].y,
                            }
                        ]);
                    }

                    const newTime = prevTime + 1;
                    if (newTime >= maxTime) {
                        setCurrentData1([]);
                        setCurrentData2([]);
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
        setCurrentData1([]);
        setCurrentData2([]);
    }, [isStart]);

    return (
        <div className="CurrentVoltageCharacteristic">
            <div className="columnCard">
                <div className="title">
                    ВАХ
                </div>

                <div className="rowWrapper">
                    <div className="values">
                        <div className="currentValue">
                            <div className="description">
                                Ток, мА
                            </div>

                            <div className="textField">
                                {isStart ? `${dataFields.fields[currentTime].I || 0}` : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Напряжение, В
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime].U || 0).toFixed(2)}`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Температура, С°
                            </div>

                            <div className="textField">
                                {isStart
                                    ? `${parseFloat(dataFields.fields[currentTime].temperature || 0).toFixed(2)}°`
                                    : isCalibration
                                        ? "-"
                                        : "0.00"}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', margin: '9px 11px 2px 0' }}>
                        {isCalibration
                            ? <div className={"empty"}>-</div>
                            : <VAXChart data={currentTime < maxTime / 2 ? currentData1 : currentData2} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentVoltageCharacteristic;
