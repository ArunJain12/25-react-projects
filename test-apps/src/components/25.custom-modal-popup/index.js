import { useState } from "react";
import Modal from "./modal";
import "./modal.css";

export default function ModalTest() {
    const [ showModalPopup, setShowModalPopup ] = useState(false);

    function toggleModalPopUp() {
        setShowModalPopup(!showModalPopup);
    }

    function onClose() {
        toggleModalPopUp();
    }

    return (
        <div className="custom-modal-container">
            <button className="btn" onClick={toggleModalPopUp}>Click Button to Open Modal</button>
            {showModalPopup && (
                <Modal 
                    id='modal-test'
                    header={<div>Test Custom Modal</div>}
                    footer={<button className="cancel-modal-button" onClick={onClose}>Cancel</button>}
                    onClose={onClose}
                />
            )}
        </div>
    );
}