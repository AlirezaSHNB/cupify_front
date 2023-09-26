import React from 'react';
import PropTypes from 'prop-types';
import '../../index.css';

function CreateModal({ children, onClose }) {
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <button className="modal-close" onClick={onClose}>
                    <span>&times;</span>
                </button>
                {children}
            </div>
        </div>
    );
}

CreateModal.propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default CreateModal;
