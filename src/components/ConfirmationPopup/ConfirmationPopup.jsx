import React from "react";
import "./ConfirmationPopup.scss";

const ConfirmationPopup = ({ onConfirm, onCancel }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <p>Вы хотите завершить работу?</p>
                <button onClick={onConfirm}>Да</button>
                <button onClick={onCancel}>Нет</button>
            </div>
        </div>
    );
};

export default ConfirmationPopup;
