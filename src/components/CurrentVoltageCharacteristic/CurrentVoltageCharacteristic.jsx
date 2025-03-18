import React from 'react';
import VAXChart from "../../ui/VAXChart/VAXChart.jsx";

const data = [

];

const CurrentVoltageCharacteristic = ({isStart, isCalibration}) => {
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
                                {isStart ? 50.52 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Напряжение, В
                            </div>

                            <div className="textField">
                                {isStart ? 8.5 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Температура, С°
                            </div>

                            <div className="textField">
                                {isStart ? 47 : isCalibration ? "-" : "0"}
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: 'center', margin: '9px 11px 2px 0' }}>
                        {isCalibration
                            ? <div className={"empty"}>-</div>
                            : <VAXChart data={data}/>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentVoltageCharacteristic;
