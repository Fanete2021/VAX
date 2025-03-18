import React, { useState, useEffect } from "react";
import "./App.scss";
import Turbidimeter from "./components/Turbidimeter/Turbidimeter.jsx";
import Hydrometer from "./components/Hydrometer/Hydrometer.jsx";
import PHMeter from "./components/PHMeter/PHMeter.jsx";
import Electrolyte from "./components/Electrolyte/Electrolyte.jsx";
import CurrentVoltageCharacteristic from "./components/CurrentVoltageCharacteristic/CurrentVoltageCharacteristic.jsx";
import OpticalEmissionSpectrometer from "./components/OpticalEmissionSpectrometer/OpticalEmissionSpectrometer.jsx";
import ThicknessMeter from "./components/ThicknessMeter/ThicknessMeter.jsx";
import ConfirmationPopup from "./components/ConfirmationPopup/ConfirmationPopup.jsx";

function App() {
    const [isStart, setIsStart] = useState(false);
    const [isCalibration, setIsCalibration] = useState(false);
    const [isCalibrationEnd, setIsCalibrationEnd] = useState(false);
    const [isPauseExperement, setIsPauseExperement] = useState(false);
    const [calibrationProgress, setCalibrationProgress] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const startCalibration = () => {
        setIsCalibration(true);
        setCalibrationProgress(0);
    };

    const startExperement = () => {
        setIsStart(true);
    };

    const togglePause = () => {
        setIsPauseExperement((prev) => !prev);
    };

    const handleConfirm = () => {
        setIsStart(false);
        setIsCalibrationEnd(false);
        setIsPauseExperement(false);
        setShowPopup(false);
    };

    const handleCancel = () => {
        setShowPopup(false);
    };

    useEffect(() => {
        if (isCalibration) {
            const interval = setInterval(() => {
                setCalibrationProgress((prevProgress) => {
                    if (prevProgress >= 100) {
                        clearInterval(interval);
                        setIsCalibration(false);
                        setIsCalibrationEnd(true);
                        return 100;
                    }
                    return prevProgress + 1;
                });
            }, 600);

            return () => clearInterval(interval);
        }
    }, [isCalibration]);

    return (
        <>
            <div className="header">
                <div className="firstPanel">
                    <div className="experement">
                        <div className="experementHeader">
                            <div>
                                <div className="title">Система контроля/измерения ТЭХО</div>
                                <div className="date">
                                    {new Date().toLocaleDateString("ru-RU", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </div>
                            </div>
                            <div className="analytics">V.1.2</div>
                        </div>

                        {/*<div className="experementActions">*/}
                        {/*    <div className="descriptionExperement">*/}
                        {/*        Добавить/изменить описание эксперимента*/}
                        {/*    </div>*/}

                        {/*    <svg*/}
                        {/*        width="19"*/}
                        {/*        height="18"*/}
                        {/*        viewBox="0 0 19 18"*/}
                        {/*        fill="none"*/}
                        {/*        xmlns="http://www.w3.org/2000/svg"*/}
                        {/*    >*/}
                        {/*        <path d="M3.61542 4.71429H15.3847V3.85714H3.61542V4.71429Z" fill="black" />*/}
                        {/*        <path d="M3.61542 9H15.3847V8.14286H3.61542V9Z" fill="black" />*/}
                        {/*        <path d="M3.61542 13.2857H15.3847V12.4286H3.61542V13.2857Z" fill="black" />*/}
                        {/*        <path*/}
                        {/*            fillRule="evenodd"*/}
                        {/*            clipRule="evenodd"*/}
                        {/*            d="M0.846191 18V0H18.1539V18H0.846191ZM1.5385 0.857143H17.4616V17.1429H1.5385V0.857143Z"*/}
                        {/*            fill="black"*/}
                        {/*        />*/}
                        {/*    </svg>*/}
                        {/*</div>*/}
                    </div>

                    <CurrentVoltageCharacteristic isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement}/>
                </div>

                <OpticalEmissionSpectrometer isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement}/>
            </div>

            <div className="footer">
                <Hydrometer isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement} />
                <Turbidimeter isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement} />
                <PHMeter isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement} />

                <div className="lastPanel">
                    <div className="Electrolyte">
                        <Electrolyte isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement} />
                    </div>

                    <div className="ThicknessMeter">
                        <ThicknessMeter isStart={isStart} isCalibration={isCalibration} isPauseExperement={isPauseExperement} />
                    </div>

                    {!isCalibrationEnd && (
                        <button className="actionBtn" onClick={startCalibration} disabled={isCalibration || isStart}>
                            {isCalibration ? `КАЛИБРОВКА ${calibrationProgress}%` : "Запуск"}
                        </button>
                    )}

                    {isCalibrationEnd && !isStart && (
                        <button className="actionBtn" onClick={startExperement}>
                            Начать измерения
                        </button>
                    )}

                    {isStart && (
                        <button className="actionBtn" onClick={togglePause}>
                            {isPauseExperement ? "Продолжить" : "Приостановить"}
                        </button>
                    )}

                    <button className="actionBtn" onClick={() => setShowPopup(true)} disabled={!isStart}>
                        Завершить
                    </button>
                </div>
            </div>

            {showPopup && (
                <ConfirmationPopup onConfirm={handleConfirm} onCancel={handleCancel} />
            )}
        </>
    );
}

export default App;
