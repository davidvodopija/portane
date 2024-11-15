import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./conformationModal.css"
import Button from "../button/button.jsx"
import {CloseButton} from "react-bootstrap";


function ConfirmationModal({show, onConfirm, onCancel, message}) {
    if (!show) return null; // Don't render the modal if 'show' is false

    return (
        <div className="modal-overlay">
            <CloseButton onClick={onCancel} className="close-button"></CloseButton>
            <div className="modal-content h-75">
                <div className="modal-header ps-3 pb-3">
                    <h5 className="modal-title fs-2">Confirmation</h5>
                </div>
                <div className="modal-body modal-message ps-3">
                    <p>{message}</p>
                </div>
                <div className="modal-footer gap-2 pe-2">
                    <Button size="long" color="white" radius="rounded" type="submit" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button size="long" color="red" radius="rounded" type="submit" onClick={onConfirm}>
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationModal;
