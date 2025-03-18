import React from 'react'
import SpectrumChart from "../../ui/SpectrumChart/SpectrumChart.jsx";

const OpticalEmissionSpectrometer = ({isStart, isCalibration}) => {
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
                                Интенсивность спектральных линий, у.е.
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                K - 766 нм
                            </div>

                            <div className="textField">
                                {isStart ? 0 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Al - 396 нм
                            </div>

                            <div className="textField">
                                {isStart ? 0 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Al - 309 нм
                            </div>

                            <div className="textField">
                                {isStart ? 0 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                Na - 588 нм
                            </div>

                            <div className="textField">
                                {isStart ? 0 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                aH - 486 нм
                            </div>

                            <div className="textField">
                                {isStart ? 0.5 : isCalibration ? "-" : "0"}
                            </div>
                        </div>

                        <div className="currentValue">
                            <div className="description">
                                bH - 656 нм
                            </div>

                            <div className="textField">
                                {isStart ? 1 : isCalibration ? "-" : "0"}
                            </div>
                        </div>
                    </div>

                    <div style={{ width: '630px', height: '350px' }}>
                        {isCalibration
                            ? <div className="empty">-</div>
                            : <SpectrumChart />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpticalEmissionSpectrometer;
